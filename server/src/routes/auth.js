const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const nodemailer = require('nodemailer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// =======================================================
// HELPERS
// =======================================================
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// =======================================================
// REGISTER
// =======================================================
router.post('/register', async (req, res) => {
    const { name, email, password, couponCode } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            if (!user.isPaid) {
                return res.status(400).json({
                    msg: 'Este email já está cadastrado, mas o pagamento ainda não foi confirmado.',
                    userId: user._id
                });
            }
            return res.status(400).json({ msg: 'Usuário já existe.' });
        }

        let appliedCoupon = null;
        let discountPercent = 0;
        let affiliateId = null;

        // ===================================================
        // CUPOM — VALIDAÇÃO ROBUSTA
        // ===================================================
        if (couponCode) {
            const normalizedCode = couponCode.trim().toUpperCase();

            const coupon = await Coupon.findOne({
                code: normalizedCode,
                isActive: true
            });

            if (!coupon) {
                return res.status(400).json({ msg: 'Cupom inválido ou inativo.' });
            }

            if (coupon.expiresAt && coupon.expiresAt < new Date()) {
                return res.status(400).json({ msg: 'Cupom expirado.' });
            }

            if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
                return res.status(400).json({ msg: 'Cupom esgotado.' });
            }

            appliedCoupon = {
                code: coupon.code,
                discountPercent: coupon.discountPercent || 0,
                commissionPercent: coupon.commissionPercent || 0,
                affiliateId: coupon.affiliateId || null
            };

            discountPercent = appliedCoupon.discountPercent;
            affiliateId = appliedCoupon.affiliateId;
        }

        user = new User({
            name,
            email,
            password,
            isPaid: false,
            coupon: appliedCoupon,
            discountPercent,
            affiliateId
        });

        await user.save();

        return res.status(201).json({
            msg: 'Usuário pré-registrado com sucesso.',
            userId: user._id,
            userEmail: user.email
        });

    } catch (err) {
        console.error('REGISTER ERROR:', err);
        return res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// =======================================================
// LOGIN
// =======================================================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ msg: 'Credenciais inválidas' });

        if (user.googleId) {
            return res.status(401).json({ msg: 'Use login com Google.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ msg: 'Credenciais inválidas' });

        if (!user.isPaid) {
            return res.status(403).json({ msg: 'Assinatura pendente.' });
        }

        const token = generateToken(user._id);

        return res.json({
            msg: 'Login bem-sucedido',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isPaid: user.isPaid,
                coupon: user.coupon || null,
                discountPercent: user.discountPercent || 0
            }
        });

    } catch (err) {
        console.error('LOGIN ERROR:', err);
        return res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// =======================================================
// GOOGLE LOGIN
// =======================================================
router.post('/google-login', async (req, res) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub, email, name } = ticket.getPayload();

        let user = await User.findOne({ $or: [{ email }, { googleId: sub }] });

        if (!user) {
            user = new User({
                name,
                email,
                googleId: sub,
                isPaid: false
            });

            await user.save();

            return res.status(201).json({
                msg: 'Usuário pré-registrado.',
                userId: user._id,
                userEmail: user.email
            });
        }

        if (!user.isPaid) {
            return res.status(403).json({ msg: 'Pagamento pendente.' });
        }

        const token = generateToken(user._id);

        return res.json({
            msg: 'Login com Google bem-sucedido',
            token,
            user
        });

    } catch (err) {
        console.error('GOOGLE LOGIN ERROR:', err);
        return res.status(400).json({ msg: 'Token Google inválido' });
    }
});

// =======================================================
// PASSWORD RESET
// =======================================================
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado com esse e-mail.' });
        }

        const resetToken = jwt.sign(
            { id: user._id },
            process.env.PASSWORD_RESET_SECRET,
            { expiresIn: '1h' }
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Redefinição de Senha - Weedsmokers Connection',
            html: `
                <p>Olá ${user.name},</p>
                <p>Clique no link abaixo para redefinir sua senha:</p>
                <a href="${resetUrl}">Redefinir senha</a>
                <p>Este link expira em 1 hora.</p>
            `
        });

        res.status(200).json({ message: 'Link enviado para o e-mail.' });

    } catch (error) {
        console.error('FORGOT PASSWORD ERROR:', error);
        res.status(500).json({ message: 'Erro ao processar solicitação.' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Token inválido ou expirado.' });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Senha redefinida com sucesso.' });

    } catch (error) {
        console.error('RESET PASSWORD ERROR:', error);
        res.status(400).json({ message: 'Token inválido ou expirado.' });
    }
});

// =======================================================
// ME / PROFILE
// =======================================================
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

router.put('/profile-banner', authMiddleware, async (req, res) => {
    const { profileBanner } = req.body;
    if (!profileBanner) {
        return res.status(400).json({ msg: 'profileBanner é obrigatório' });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { profileBanner },
        { new: true }
    ).select('-password');

    res.json({ msg: 'Banner atualizado', user });
});

router.put('/profile-image', authMiddleware, async (req, res) => {
    const { profileImage } = req.body;
    if (!profileImage) {
        return res.status(400).json({ msg: 'profileImage é obrigatório' });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { profileImage },
        { new: true }
    ).select('-password');

    res.json({ msg: 'Imagem atualizada', user });
});

module.exports = router;
