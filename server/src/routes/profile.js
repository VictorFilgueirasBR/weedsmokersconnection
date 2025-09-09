// src/routes/profile.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require('cors'); // Importa o módulo CORS

dotenv.config();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware para upload de arquivos
router.use(fileUpload({ useTempFiles: true }));

// Definir as origens permitidas
const allowedOrigins = [
  'https://weedsmokersconnection.netlify.app',
  'https://weedsmokersconnection.com'
];

// Configuração do CORS para as rotas do router
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
};

// Aplicar o middleware CORS a todas as rotas deste roteador
router.use(cors(corsOptions));

// Rota para atualizar o nome de usuário
router.put('/username', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    user.name = name;
    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.password;
    res.json({ message: 'Nome de usuário atualizado com sucesso.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o nome de usuário.' });
  }
});

// Rota para atualizar a imagem de perfil ou banner
router.put('/image', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }

    const { tempFilePath } = req.files.image;
    const { type } = req.query; // 'avatar' ou 'banner'

    let folder = 'avatars';
    if (type === 'banner') {
      folder = 'banners';
    }

    // Se já existir uma imagem anterior, removê-la do Cloudinary
    if (type === 'avatar' && user.profileImageId) {
      await cloudinary.uploader.destroy(user.profileImageId);
    } else if (type === 'banner' && user.profileBannerId) {
      await cloudinary.uploader.destroy(user.profileBannerId);
    }

    // Fazer upload da nova imagem
    const result = await cloudinary.uploader.upload(tempFilePath, { folder });

    // Atualizar a URL e o public_id no banco de dados
    if (type === 'avatar') {
      user.profileImage = result.secure_url;
      user.profileImageId = result.public_id;
    } else if (type === 'banner') {
      user.profileBanner = result.secure_url;
      user.profileBannerId = result.public_id;
    } else {
      return res.status(400).json({ message: 'Tipo de imagem inválido.' });
    }

    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.json({
      message: 'Imagem atualizada com sucesso.',
      url: result.secure_url,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer upload da imagem.' });
  }
});

module.exports = router;