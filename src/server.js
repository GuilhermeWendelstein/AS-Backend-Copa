require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const jogosRoutes = require('./routes/jogosRoutes');
const palpitesRoutes = require('./routes/palpitesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    mensagem: 'API do Bolão da Copa 2026 rodando com sucesso!'
  });
});

app.use('/api', authRoutes);
app.use('/api', jogosRoutes);
app.use('/api', palpitesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});