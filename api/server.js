const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

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

async function conectarAoMongo() {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

// Urls inicialmente previstas
app.get('/', (req, res) => res.send('Olá mundo!'))

app.post('/login', (req, res) => res.send('Login'))

app.get('/logout', (req, res) => res.send('Logout'))

app.get('/eventos', (req, res) => res.send('Lista de eventos'))

app.get('/eventos/:id', (req, res) => res.send('Evento específico'))

app.post('/eventos', (req, res) => res.send('Cria evento'))

app.put('/eventos/:id', (req, res) => res.send('Atualiza evento'))

app.delete('/eventos/:id', (req, res) => res.send('Deleta evento'))



app.listen(port, () => {
    try {
        conectarAoMongo()
        console.log(`Servidor rodando na porta ${port}`)
    } catch (error) {
        console.log(`Erro ao rodar o servidor: ${error}`)
    }
})