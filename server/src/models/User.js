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
    sparse: true, // Permite null/undefined sem quebrar o unique
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  // Foto de perfil
  profileImage: {
    type: String,
    default: '/images/profile-image.jpg', // Fallback local (mesmo usado no frontend)
  },
  profileImageId: {
    type: String, // public_id da imagem no Cloudinary
    default: null,
  },
  // Banner do perfil
  profileBanner: {
    type: String,
    default: '/images/bg-try-plans-wsc.jpeg', // Fallback local (mesmo usado no frontend)
  },
  profileBannerId: {
    type: String, // public_id do banner no Cloudinary
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

// Atualiza `updatedAt` automaticamente
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Pré-save hook para criptografar a senha
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método para comparar a senha
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false; // Trata usuários sem senha
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
