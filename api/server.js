const express = require('express')

const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

app.use(express.json())
app.use(cors())
const port = 3000;
dotenv.config();
const uri = process.env.MONGODB_URL

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const Evento = mongoose.model('Evento', mongoose.Schema({
    nome: String,
    telefone: String,
    numero: Number,
    cep: String,
    url_logo: String,
    preco: Number,
    complemento: String,
    ingresso: Number,
    descricao: String,
    endereco: String,
    categoria: String
}));
const Usuario = mongoose.model('Usuario', mongoose.Schema({
    nome: String,
    email: String,
    confirmeEmail: String,
    senha: String,
    confirmeSenha: String,
    telefone: String,
    cnpj: String,
    cep: String,
    complemento: String,
    endereco: String,
    numero: String
}));

app.get("/evento", async (req, res) => {
    try {
        const eventos = await Evento.find(); // Busca no modelo Evento
        res.json(eventos);
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar eventos" });
    }
});

app.get("/evento/:id", async (req, res) => {
    try {
        const eventoId = req.params.id; // Captura o ID passado na URL
        const evento = await Evento.findById(eventoId); // Busca o evento pelo ID

        if (!evento) {
            // Caso o evento não seja encontrado
            return res.status(404).json({ mensagem: "Evento não encontrado" });
        }

        res.json(evento); // Retorna o evento encontrado
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro ao buscar evento" });
    }
});

app.post("/eventos", async (req, res) => {
    try {
        const { nome, telefone, numero, cep, url_logo, preco, complemento, ingresso, descricao, endereco, categoria } = req.body;

        // Criar o evento com os dados fornecidos
        const evento = new Evento({
            nome: nome,
            telefone: telefone,
            numero: numero,
            cep: cep,
            url_logo: url_logo,
            preco: preco,
            complemento: complemento,
            ingresso: ingresso,
            descricao: descricao,
            endereco: endereco,
            categoria: categoria
        })

        // Salvar o evento no banco
        await evento.save()

        // Buscar todos os eventos após a inserção
        const eventos = await Evento.find()

        // Retornar todos os eventos cadastrados
        res.json(eventos)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: "Erro ao salvar evento" })
    }
})
app.post("/usuario", async (req, res) => {
    try {
        const { nome, email, confirmeEmail, senha, confirmeSenha, telefone, cnpj, cep, complemento, endereco, numero, } = req.body;

        // Criar o evento com os dados fornecidos
        const usuario = new Usuario({
            nome: nome,
            email: email,
            confirmeEmail: confirmeEmail,
            senha: senha,
            confirmeSenha: confirmeSenha,
            telefone: telefone,
            cnpj: cnpj,
            cep: cep,
            complemento: complemento,
            endereco: endereco,
            numero: numero,
        })

        // Salvar o evento no banco
        await usuario.save()

        // Buscar todos os eventos após a inserção
        const usuarios = await Usuario.find()

        // Retornar todos os eventos cadastrados
        res.json(usuarios)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: "Erro ao salvar usuario" })
    }
})

async function conectarAoMongo() {
    await mongoose.connect(uri, {});
}

app.listen(port, () => {
    try {
        conectarAoMongo()
        console.log(`Servidor rodando na port ${port}`)
    } catch (error) {
        console.log("Erro", e)
    }
})
