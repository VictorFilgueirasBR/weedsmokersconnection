// src/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaId: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de Usuário
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);