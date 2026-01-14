// src/routes/mercadopago.js
const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, PreApproval } = require('mercadopago');
const User = require('../models/User');

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

const planIds = {
  semestral: '37a30fd45a6240e285c300b4c29b318d',
  anual: '7660f07184104a0fa4e1a1c33fb274a6'
};

// ==============================
// CRIAR ASSINATURA
// ==============================
router.post('/create-subscription', async (req, res) => {
  const { plan, userEmail, userId } = req.body;

  const selectedPlanId = planIds[plan];
  if (!selectedPlanId) {
    return res.status(400).json({ msg: 'Plano inválido' });
  }

  const preapprovalData = {
    preapproval_plan_id: selectedPlanId,
    reason: `Assinatura ${plan}`,
    external_reference: userId,
    payer_email: userEmail,

    redirect_urls: {
      success: `${process.env.FRONTEND_URL}/signup?status=approved`,
      pending: `${process.env.FRONTEND_URL}/signup?status=pending`,
      failure: `${process.env.FRONTEND_URL}/signup?status=rejected`
    },

    // ✅ ESSENCIAL PARA PRODUÇÃO
    notification_url: `${process.env.API_URL}/api/mercadopago/webhook`
  };

  try {
    const preapprovalService = new PreApproval(client);
    const result = await preapprovalService.create({ body: preapprovalData });

    res.json({
      id: result.id,
      init_point: result.init_point
    });
  } catch (error) {
    console.error('Erro ao criar assinatura:', JSON.stringify(error, null, 2));
    res.status(500).json({ msg: 'Erro ao gerar assinatura' });
  }
});

// ==============================
// WEBHOOK
// ==============================
router.post('/webhook', async (req, res) => {
  try {
    const { type, id, topic } = req.query;

    if (topic === 'preapproval' || type === 'preapproval') {
      const preapprovalService = new PreApproval(client);
      const preapproval = await preapprovalService.get({ preapprovalId: id });

      if (!preapproval.body) {
        return res.status(404).send('Preapproval não encontrado');
      }

      const { status, external_reference } = preapproval.body;
      const userId = external_reference;

      const user = await User.findById(userId);
      if (user) {
        user.isPaid = status === 'authorized';
        await user.save();

        console.log(
          `Webhook MercadoPago: usuário ${userId} atualizado -> isPaid=${user.isPaid}`
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook Mercado Pago:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
