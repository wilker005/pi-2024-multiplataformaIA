const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express()

app.use(express.json())
app.use(cors())
const port = 3000;
dotenv.config();

const pointSchema = new mongoose.Schema({
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

const categorias = new mongoose.Schema({ nome: String });

const evento = moongoose.model('Evento', mongoose.Schema({
    nome: String,
    data_inicio: Date,
    preco: Number,
    descricao: String,
    url_logo: String,
    url_site: String,
    organizador: String,
    local: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    endereco: String,
    cidade: String,
    estado: String,
    data_cadastro: Date,
    categorias : [categorias]
}));

