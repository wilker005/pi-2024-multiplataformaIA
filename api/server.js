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

const Categorias = new mongoose.Schema({ nome: String });

const EventoBase = mongoose.model('EventoBase', mongoose.Schema({
    nome: String,
    descricao: String,
    organizador: String
}));

const EventosCadastrados = mongoose.model('EventosCadastrados', mongoose.Schema({
    nomeEvento: String,
    dataInicio: String,
    preco: String,
    descricao: String,
    urlLogo: String,
    urlSite: String,
    cep: String,
    endereco: String,
    numero: String,
    cidade: String,
    estado: String,
    categorias: String,
    data_cadastro: String,
}));

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

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

app.get("/evento", async (req, res) => {
    try {
        const eventos = await Evento.find(); // Busca no modelo Evento
        res.json(eventos);
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar eventos" });
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
app.post("/cadastro", async(req, res) => {
    console.log("Requisição recebida para /cadastro");
    try {
        const {
            nomeEvento,
            dataInicio,
            preco,
            descricao,
            urlLogo,
            urlSite,
            cep,
            endereco,
            numero,
            cidade,
            estado,
            categorias,
            data_cadastro
        } = req.body;

        // Validação de campos obrigatórios
        if (!nomeEvento || !dataInicio || !preco || !descricao || !endereco || !cidade || !estado || !categorias) {
            return res.status(400).send("Preencha todos os campos obrigatórios.");
        }

        // Criação de novo evento usando o modelo correto
        const novoEvento = new EventosCadastrados({
            nomeEvento: nomeEvento,
            dataInicio: dataInicio,
            preco: preco,
            descricao: descricao,
            urlLogo: urlLogo,
            urlSite: urlSite,
            cep: cep,
            endereco: endereco,
            numero: numero,
            cidade: cidade,
            estado: estado,
            categorias: categorias,
            data_cadastro: data_cadastro
        });

        // Salvando evento no MongoDB
        await novoEvento.save();

        // Buscando todos os eventos e retornando
        const eventos = await EventosCadastrados.find();
        res.json(eventos);
    } catch (error) {
        console.error("Erro ao salvar o evento no MongoDB:", error);
        res.status(500).send("Erro ao salvar ou buscar eventos.");
    }
});

app.post("/cadastro1", async(req, res) => {
    const nomeEvento = req.body.nomeEvento
    const dataInicio = req.body.dataInicio
    const preco = req.body.preco
    const descricao = req.body.descricao
    const urlLogo = req.body.urlLogo
    const urlSite = req.body.urlSite
    const endereco = req.body.endereco
    const cidade = req.body.cidade
    const estado = req.body.estado
    const categoria = req.body.categoria
    const eventoBase = new EventoBase({
        nomeEvento: nomeEvento,
        dataInicio: dataInicio,
        preco: preco,
        descricao: descricao,
        urlLogo: urlLogo,
        urlSite: urlSite,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
        categoria: categoria
    })
    await eventos.save()
    const eventos = await Eventos.find()
    res.json(eventos)
})

// app.post('/cadastro', async(req, res) => {
//     try {
//         const nomeEvento = req.body.nomeEvento
//         const dataInicio = req.body.dataInicio
//         const preco = req.body.preco
//         const descricao = req.body.descricao
//         const urlLogo = req.body.urlLogo
//         const urlSite = req.body.urlSite
//         const endereco = req.body.endereco
//         const cidade = req.body.cidade
//         const estado = req.body.estado
//         const categoria = req.body.categoria

//         const cryptografada = await bcrypt.hash(password, 10)
//         const evento = new evento({
//             nomeEvento: nomeEvento,
//             dataInicio: dataInicio,
//             preco: preco,
//             descricao: descricao,
//             urlLogo: urlLogo,
//             urlSite: urlSite,
//             endereco: endereco,
//             cidade: cidade,
//             estado: estado,
//             categorias: categoria
//         })
//         const respostaMongo = await evento.save()
//         console.log(respostaMongo)
//         res.end()
//     } catch (error) {
//         console.log(error)
//         res.status(409).send("Erro")
//     }
// })



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
