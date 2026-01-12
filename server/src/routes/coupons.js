const express = require('express')
const router = express.Router()
const Coupon = require('../models/Coupon')

router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Código do cupom é obrigatório' })
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true })

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom inválido ou expirado' })
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Cupom expirado' })
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({ error: 'Cupom esgotado' })
    }

    return res.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno' })
  }
})

module.exports = router
