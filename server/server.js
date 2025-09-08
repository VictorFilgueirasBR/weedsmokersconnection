// server.js

// Importações principais do Express e outros módulos
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

// Importação das rotas e do middleware
const authRoutes = require('./src/routes/auth');
const mercadopagoRoutes = require('./src/routes/mercadopago');
const profileRoutes = require('./src/routes/profile');
const postRoutes = require('./src/routes/post');
const authMiddleware = require('./src/middleware/auth');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Configurar dotenv para carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Configuração do CORS para permitir requisições do frontend com credenciais
app.use(cors({
  origin: 'https://weedsmokersconnection.netlify.app',
  credentials: true
}));

// Conexão com o MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado com sucesso!');
    } catch (err) {
        console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
        process.exit(1);
    }
};

// Conectar ao banco de dados
connectDB();

// Registro das rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

// Rota de exemplo protegida por autenticação
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Conteúdo restrito: só para membros', user: req.user });
});

// Rota do Mercado Pago 
app.use('/api/mercadopago', mercadopagoRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));