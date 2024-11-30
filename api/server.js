const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

const app = express()

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
    data_inicio: Date,
    categoria: String,
    descricao: String,
    url_logo: String,
    preco: Number,
    organizador: String,
    estado: String,
    cidade: String,
    endereco: String,
    data_cadastro: Date
}));

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

app.get("/eventos", async(req, res) => {
    const eventos = await Evento.find()
    res.json(eventos)
})

app.post("/eventos", async (req, res) => {
    try {
        const nome = req.body.nome
        const data_inicio = new Date(req.body.data_inicio) // Garantir que a data seja do tipo Date
        const categoria = req.body.categoria
        const descricao = req.body.descricao
        const url_logo = req.body.url_logo
        const preco = req.body.preco
        const organizador = req.body.organizador
        const estado = req.body.estado
        const cidade = req.body.cidade
        const endereco = req.body.endereco
        const data_cadastro = new Date() // A data de cadastro deve ser a data atual

        // Verificar se a data de início foi passada corretamente
        if (isNaN(data_inicio)) {
            return res.status(400).json({ mensagem: "Data de início inválida" })
        }

        // Criar o evento com os dados fornecidos
        const evento = new Evento({
            nome: nome,
            data_inicio: data_inicio,
            categoria: categoria,
            descricao: descricao,
            url_logo: url_logo,
            preco: preco,
            organizador: organizador,
            estado: estado,
            cidade: cidade,
            endereco: endereco,
            data_cadastro: data_cadastro
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

app.post('/signup', async(req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const cryptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({
            login: login,
            password: cryptografada
        })
        const respostaMongo = await usuario.save()
        console.log(respostaMongo)
        res.end()
    } catch (error) {
        console.log(error)
        res.status(409).send("Erro")
    }
})


app.post('/login', async(req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const u = await Usuario.findOne({ login: req.body.login })
        if (!u) {
            return res.status(401).json({ mensagem: "Login inválido" })
        }
        const senhaValida = await bcrypt.compare(password, u.password)
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha inválida" })
        }
        const token = jwt.sign({ login: login },
            "chave-secreta", { expiresIn: "1h" }
        )
        res.status(200).json({ token: token })
    } catch (error) {

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