// src/routes/mercadopago.js

const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, PreApproval } = require('mercadopago'); // Importa PreApproval
const User = require('../models/User');

// Configura o cliente do Mercado Pago com o token de acesso
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

// Define os IDs de planos de produção
const planIds = {
    semestral: '37a30fd45a6240e285c300b4c29b318d', // ID do Plano Semestral
    anual: '7660f07184104a0fa4e1a1c33fb274a6' // SUBSTITUA PELO ID DO PLANO ANUAL DE PRODUÇÃO
};

// @route   POST /api/mercadopago/create-subscription
// @desc    Cria uma pré-aprovação de assinatura no Mercado Pago
router.post('/create-subscription', async (req, res) => {
    const { plan, userEmail, userId, userName, userCpf } = req.body;

    const selectedPlanId = planIds[plan];
    if (!selectedPlanId) {
        return res.status(400).json({ msg: 'Plano inválido' });
    }

    let preapproval = {
        preapproval_plan_id: selectedPlanId,
        reason: `Assinatura ${plan}`,
        external_reference: userId,
        payer_email: userEmail,
        payer: {
            name: userName,
            identification: {
                type: 'CPF',
                number: userCpf
            }
        }
    };

    try {
        const preapprovalService = new PreApproval(client);
        const result = await preapprovalService.create({ body: preapproval });
        res.json({ id: result.id, init_point: result.init_point });
    } catch (error) {
        console.error('Erro ao criar a assinatura:', error);
        res.status(500).json({ msg: 'Erro ao gerar o checkout de assinatura' });
    }
});

// @route   POST /api/mercadopago/webhook
// @desc    Recebe notificações de pagamento do Mercado Pago
router.post('/webhook', async (req, res) => {
    const { topic, id } = req.query;

    if (topic === 'preapproval') {
        try {
            const preapprovalService = new PreApproval(client);
            const preapproval = await preapprovalService.get({ preapprovalId: id });
            const { status, external_reference } = preapproval.body;
            const userId = external_reference;
            const user = await User.findById(userId);

            if (user && status === 'authorized') {
                user.isPaid = true;
                await user.save();
                console.log(`Assinatura autorizada. Usuário ${userId} atualizado para isPaid=true.`);
            }
        } catch (error) {
            console.error('Erro no webhook de pré-aprovação:', error);
        }
    }

    res.status(200).send('OK');
});

module.exports = router;