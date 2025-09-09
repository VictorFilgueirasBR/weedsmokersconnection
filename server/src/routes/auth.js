const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Aumentei o tempo para ser mais prático em produção
    });
};

// @route   POST /api/auth/register
// @desc    Registra um novo usuário, mas não o marca como pago
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            // Se o usuário já existe, mas não pagou, avisa para ele finalizar o pagamento
            if (!user.isPaid) {
                return res.status(400).json({ msg: 'Este email já está cadastrado, mas o pagamento ainda não foi confirmado. Prossiga para o pagamento.' });
            }
            // Se o usuário já existe e já pagou, avisa para ele fazer login
            return res.status(400).json({ msg: 'Usuário já existe. Por favor, faça login.' });
        }

        user = new User({
            name,
            email,
            password,
            isPaid: false
        });

        await user.save();

        res.status(201).json({
            msg: 'Usuário pré-registrado com sucesso. Prossiga para o pagamento.',
            userId: user._id,
            userEmail: user.email
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// @route   POST /api/auth/login
// @desc    Autentica o usuário e retorna o token se isPaid for true
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }
        
        if (user.googleId) {
            return res.status(401).json({ msg: 'Este email foi cadastrado com o Google. Use o botão do Google para entrar.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Credenciais inválidas' });
        }
        
        if (!user.isPaid) {
            return res.status(403).json({ msg: 'Você ainda não é assinante, assine agora e desbloqueie seu acesso!' });
        }

        const token = generateToken(user._id);
        res.json({
            msg: 'Login bem-sucedido',
            token,
            user: { id: user._id, name: user.name, email: user.email, isPaid: user.isPaid },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// @route   POST /api/auth/google-login
// @desc    Lida com o login/cadastro via Google
router.post('/google-login', async (req, res) => {
    const { id_token } = req.body;
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub, email, name } = payload;
        
        let user = await User.findOne({ $or: [{ email }, { googleId: sub }] });
        
        if (!user) {
            // Se o usuário não existe, cria um novo, mas não o marca como pago
            user = new User({
                name,
                email,
                googleId: sub,
                isPaid: false
            });
            await user.save();
            return res.status(201).json({
                msg: 'Usuário pré-registrado com sucesso. Prossiga para o pagamento.',
                userId: user._id,
                userEmail: user.email
            });
        }
        
        // Se o usuário existe, mas ainda não pagou
        if (!user.isPaid) {
            return res.status(403).json({ msg: 'Acesso negado. Por favor, conclua o pagamento do seu plano.' });
        }

        const token = generateToken(user._id);
        res.json({
            msg: 'Login com Google bem-sucedido',
            token,
            user: { id: user._id, name: user.name, email: user.email, isPaid: user.isPaid },
        });
        
    } catch (err) {
        console.error('Erro na verificação do token do Google:', err.message);
        res.status(400).json({ msg: 'Token do Google inválido' });
    }
});

// Rota para solicitar a redefinição de senha
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
        
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`; // Alterado para usar a variável de ambiente CLIENT_URL
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Redefinição de Senha para Weedsmokers Connection',
            html: `
                <p>Olá ${user.name},</p>
                <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para redefini-la:</p>
                <a href="${resetUrl}">Redefinir Senha</a>
                <p>Este link expira em 1 hora.</p>
                <p>Se você não solicitou isso, por favor, ignore este e-mail.</p>
            `,
        };
        
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Link de redefinição de senha enviado para o seu e-mail.' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição:', error);
        res.status(500).json({ message: 'Erro ao processar sua solicitação.' });
    }
});

// Rota para redefinir a senha com o token
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
        
        res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        res.status(400).json({ message: 'Token inválido ou expirado.' });
    }
});

// @route   GET /api/auth/me
// @desc    Obtém os dados do usuário autenticado
// @access  Private (requer token JWT)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// @route   PUT /api/auth/profile-banner
// @desc    Atualiza a imagem de banner do usuário
// @access  Private
router.put('/profile-banner', authMiddleware, async (req, res) => {
    try {
        const { profileBanner } = req.body;
        if (!profileBanner) {
            return res.status(400).json({ msg: 'O campo profileBanner é obrigatório' });
        }
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileBanner },
            { new: true }
        ).select('-password');
        
        res.json({ msg: 'Banner atualizado com sucesso', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// @route   PUT /api/auth/profile-image
// @desc    Atualiza a imagem de perfil do usuário
// @access  Private
router.put('/profile-image', authMiddleware, async (req, res) => {
    try {
        const { profileImage } = req.body;
        if (!profileImage) {
            return res.status(400).json({ msg: 'O campo profileImage é obrigatório' });
        }
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage },
            { new: true }
        ).select('-password');
        
        res.json({ msg: 'Imagem de perfil atualizada com sucesso', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

module.exports = router;