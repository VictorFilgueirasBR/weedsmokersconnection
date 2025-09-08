// src/routes/post.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware para upload de arquivos
router.use(fileUpload({ useTempFiles: true }));

// @route   POST /api/posts/create
// @desc    Cria uma nova postagem
// @access  Privado
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, isPublic } = req.body;
    
    if (!req.files || !req.files.media) {
      return res.status(400).json({ message: 'Nenhuma mídia foi enviada.' });
    }

    const { tempFilePath } = req.files.media;
    const folder = 'posts';

    const result = await cloudinary.uploader.upload(tempFilePath, { folder });

    const newPost = new Post({
      title,
      isPublic,
      mediaUrl: result.secure_url,
      mediaId: result.public_id,
      author: req.user.id,
    });

    await newPost.save();

    const createdPost = await Post.findById(newPost._id).populate('author', 'name profilePicture');

    res.status(201).json({ 
      message: 'Postagem criada com sucesso!', 
      post: createdPost 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a postagem. Tente novamente.' });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Exclui uma postagem
// @access  Privado
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Procura e deleta o post do banco de dados verificando o autor
    const post = await Post.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user.id 
    });

    if (!post) {
      // Se não encontrou o post ou o autor não corresponde, retorna 404
      return res.status(404).json({ message: 'Postagem não encontrada ou não autorizada.' });
    }

    // Exclui a mídia do Cloudinary
    await cloudinary.uploader.destroy(post.mediaId);

    res.json({ message: 'Postagem excluída com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir a postagem. Tente novamente.' });
  }
});


// @route   GET /api/posts/me
// @desc    Busca todas as postagens do usuário logado
// @access  Privado
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id }).populate('author', 'name profilePicture').sort({ createdAt: -1 });
        res.json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro do Servidor');
    }
});

module.exports = router;