const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    // 🔹 Compatível com frontend atual
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage'
    },

    // 🔹 Usado pelo frontend (garantido via hook)
    discountValue: {
      type: Number
    },

    // 🔹 FONTE REAL DO DESCONTO
    commissionPercent: {
      type: Number,
      required: true
    },

    expiresAt: {
      type: Date
    },

    maxUses: {
      type: Number,
      default: null
    },

    usedCount: {
      type: Number,
      default: 0
    },

    // 🔹 Campo real do DB
    isActive: {
      type: Boolean,
      default: true
    },

    // 🔹 Mantido para compatibilidade com código legado
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// 🔥 GARANTE COERÊNCIA ENTRE commissionPercent e discountValue
CouponSchema.pre('save', function (next) {
  if (
    this.discountType === 'percentage' &&
    (this.discountValue === undefined || this.discountValue === null)
  ) {
    this.discountValue = this.commissionPercent
  }

  next()
})

module.exports = mongoose.model('Coupon', CouponSchema)
