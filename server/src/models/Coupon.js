const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  // Código do cupom (ex: TESTEWS10)
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },

  // Identificador do afiliado (usado no dashboard)
  affiliateId: {
    type: String,
    required: true,
    index: true
  },

  // Percentual de comissão (ex: 10 = 10%)
  commissionPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },

  // Ativo ou inativo
  isActive: {
    type: Boolean,
    default: true
  },

  // Data de expiração opcional
  expiresAt: {
    type: Date,
    default: null
  },

  // Controle interno
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Atualiza updatedAt automaticamente
couponSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Método helper para validar expiração
couponSchema.methods.isValid = function () {
  if (!this.isActive) return false;
  if (this.expiresAt && this.expiresAt < new Date()) return false;
  return true;
};

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
