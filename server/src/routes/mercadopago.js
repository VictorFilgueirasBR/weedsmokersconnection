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

// Criar assinatura
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
    back_url: process.env.FRONTEND_URL || 'https://seusite.com/success',
    auto_recurring: {
      frequency: plan === 'anual' ? 12 : 6,
      frequency_type: "months",
      transaction_amount: plan === 'anual' ? 200 : 120, // ajuste conforme seu plano
      currency_id: "BRL"
    }
  };

  try {
    const preapprovalService = new PreApproval(client);
    const result = await preapprovalService.create({ body: preapprovalData });
    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    res.status(500).json({ msg: 'Erro ao gerar assinatura' });
  }
});

// Webhook
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
        console.log(`Webhook: Usuário ${userId} atualizado -> isPaid=${user.isPaid}`);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
