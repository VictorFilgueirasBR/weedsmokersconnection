// src/routes/mercadopago.js
const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, PreApproval, Payment } = require('mercadopago');
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
    }
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
// PROCESSAR PAGAMENTO PIX
// (BACKWARD COMPATIBLE)
// ==============================
router.post('/process-pix-payment', async (req, res) => {
  try {
    /**
     * Aceita:
     * - FORMATO ANTIGO (frontend atual)
     *   amount, email, firstName, lastName
     *
     * - FORMATO NOVO (se existir)
     *   transactionAmount, payerEmail, payerFirstName, payerLastName
     */
    const {
      amount,
      email,
      firstName,
      lastName,
      transactionAmount,
      payerEmail,
      payerFirstName,
      payerLastName
    } = req.body;

    const finalAmount = Number(transactionAmount || amount);
    const finalEmail = payerEmail || email;
    const finalFirstName = payerFirstName || firstName || 'Cliente';
    const finalLastName = payerLastName || lastName || 'WSC';

    if (!finalAmount || !finalEmail) {
      return res.status(400).json({
        message: 'Amount e email são obrigatórios'
      });
    }

    const payment = new Payment(client);

    const paymentData = {
      transaction_amount: finalAmount,
      description: 'Pagamento WeedsmokersPass via Pix',
      payment_method_id: 'pix',
      payer: {
        email: finalEmail,
        first_name: finalFirstName,
        last_name: finalLastName
      }
    };

    const result = await payment.create({ body: paymentData });

    return res.status(200).json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      point_of_interaction: result.point_of_interaction
    });

  } catch (error) {
    console.error(
      'Erro ao processar pagamento Pix:',
      JSON.stringify(error, null, 2)
    );

    return res.status(500).json({
      message: 'Erro ao processar pagamento Pix'
    });
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
          `Webhook: Usuário ${userId} atualizado -> isPaid=${user.isPaid}`
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
