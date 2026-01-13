const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },

  // ==========================
  // PAGAMENTO
  // ==========================
  isPaid: {
    type: Boolean,
    default: false,
  },

  // ==========================
  // CUPOM / AFILIADO (FIX REAL)
  // ==========================
  coupon: {
    type: {
      code: { type: String },
      affiliateId: { type: String, default: null },
      commissionPercent: { type: Number, default: 0 },
    },
    default: null,
  },

  affiliateId: {
    type: String,
    default: null,
  },

  // 🔹 Campo usado pelo frontend
  discountPercent: {
    type: Number,
    default: 0,
  },

  // ==========================
  // PERFIL
  // ==========================
  profileImage: {
    type: String,
    default: '/images/profile-image.jpg',
  },

  profileImageId: {
    type: String,
    default: null,
  },

  profileBanner: {
    type: String,
    default: '/images/bg-try-plans-wsc.jpeg',
  },

  profileBannerId: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// =======================================
// 🔄 SINCRONIZA DESCONTO AUTOMATICAMENTE
// =======================================
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();

  if (this.coupon?.commissionPercent) {
    this.discountPercent = this.coupon.commissionPercent;
  }

  next();
});

// =======================================
// 🔐 HASH DE SENHA
// =======================================
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// =======================================
// 🔑 COMPARAÇÃO DE SENHA
// =======================================
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
