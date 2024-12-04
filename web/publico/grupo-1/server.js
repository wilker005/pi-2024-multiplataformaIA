// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/eventos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir o modelo de Evento
const Evento = mongoose.model('Evento', new mongoose.Schema({
    nome: String,
    data: String,
    local: String,
    descricao: String
}));

// Rota para buscar todos os eventos
app.get('/api/eventos', async(req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).send('Erro ao buscar eventos');
    }
});

// Rota para buscar um evento por ID
app.get('/api/eventos/:id', async(req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        res.json(evento);
    } catch (error) {
        res.status(500).send('Erro ao buscar o evento');
    }
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});