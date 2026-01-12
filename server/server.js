// server.js

// Importações principais
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

// Rotas
const authRoutes = require('./src/routes/auth');
const mercadopagoRoutes = require('./src/routes/mercadopago');
const profileRoutes = require('./src/routes/profile');
const postRoutes = require('./src/routes/post');
const couponRoutes = require('./src/routes/coupons'); // ✅ CUPONS
const authMiddleware = require('./src/middleware/auth');

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// =========================
// MIDDLEWARES GLOBAIS
// =========================

// Parser JSON
app.use(express.json());

// CORS
const allowedOrigins = [
  'https://weedsmokersconnection.netlify.app',
  'https://weedsmokersconnection.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(
        new Error('The CORS policy for this site does not allow access from the specified Origin.'),
        false
      );
    }
    return callback(null, true);
  },
  credentials: true
}));

// =========================
// CONEXÃO COM O MONGODB
// =========================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (err) {
    console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

// =========================
// ROTAS DA API
// =========================
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/coupons', couponRoutes); // ✅ CUPONS
app.use('/api/mercadopago', mercadopagoRoutes);

// =========================
// ROTA PROTEGIDA (TESTE)
// =========================
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Conteúdo restrito: só para membros',
    user: req.user
  });
});

// =========================
// INICIALIZAÇÃO DO SERVIDOR
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
