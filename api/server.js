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

const EventosGrupo3 = mongoose.model('EventosGrupo3', mongoose.Schema({
    nome: String, 
    dataInicio: String, 
    preco: String, 
    descricao: String,
    urlLogo: String,
    urlSite: String, 
    cep: String,
    endereco: String,
    cidade: String,
    estado: String,
    numero : String,
    categorias: String, 
    dataCadastro: String
}));


// Banco de dados cadastroUsuario
const cadastroUsuario = mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    confirmarSenha: { type: String, required: true }
})

cadastroUsuario.plugin(uniqueValidator)
const cadastro = mongoose.model("Usuario", cadastroUsuario)
//

// Criação da API para cadastro de eventos do grupo-3
app.get("/cadastrar", async(req, res) => {
    const eventos = await EventosGrupo3.find()
    res.json(eventos)
})

app.post("/cadastrar", async (req, res) => {
    const nome = req.body.nome
    const dataInicio = new Date(req.body.dataInicio);
    const preco = req.body.preco 
    const descricao = req.body.descricao 
    const urlLogo = req.body.urlLogo
    const urlSite = req.body.urlSite
    const cep = req.body.cep
    const endereco = req.body.endereco
    const cidade = req.body.cidade
    const estado = req.body.estado
    const numero = req.body.numero
    const categorias = req.body.categorias
    const dataCadastro = new Date()

    if (isNaN(dataInicio.getTime())) {
        return res.status(400).json({ mensagem: "Data de início inválida" });
    }

    const eventoGrupo3 = new EventosGrupo3 ({
        nome : nome,
        dataInicio: dataInicio.toISOString(),
        preco : preco, 
        descricao : descricao,
        urlLogo : urlLogo,
        urlSite : urlSite, 
        cep : cep,
        endereco : endereco,
        cidade : cidade, 
        estado : estado, 
        numero : numero,
        categorias : categorias,
        dataCadastro : dataCadastro
    })
    await eventoGrupo3.save()
    const eventos = await EventosGrupo3.find()
    res.json(eventos)
})
//

// APIs para Cadastro e Login
app.post('/cadastroUsuario', async(req, res) => {
    try {
        const nome = req.body.nome
        const email = req.body.email
        const senha = req.body.senha
        const confirmarSenha = req.body.confirmarSenha
        const cryptografada = await bcrypt.hash(senha, 10)
        const cryptografadaConfirmar = await bcrypt.hash (confirmarSenha, 10)
        const usuario = new cadastroUsuario({
            nome: nome,
            email: email,
            senha: cryptografada,
            confirmarSenha: cryptografadaConfirmar
        })
        const respostaMongo = await usuario.save()
        console.log(respostaMongo)
        res.end()
    } catch (error) {
        console.log(error)
        res.status(409).send("Erro")
    }
})

app.post('/loginUsuario', async(req, res) => {
    try {
        const email = req.body.email
        const senha = req.body.senha
        const u = await cadastro.findOne({ email: req.body.email })
        if (!u) {
            return res.status(401).json({ mensagem: "email inválido" })
        }
        const senhaValida = await bcrypt.compare(senha, u.senha)
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha inválida" })
        }
        const token = jwt.sign({ email: email },
            "chave-secreta", { expiresIn: "1h" }
        )
        res.status(200).json({ token: token })
    } catch (error) {

    }
})

app.get('/eventosOrdenados', async (req, res) => {
    try {
        const eventos = await EventosGrupo3.find().sort({ nome: 1 }); // Ordena por 'nome' em ordem crescente
        console.log("Eventos ordenados:", eventos); // Adicione este log
        res.json(eventos);
    } catch (error) {
        console.error("Erro ao buscar eventos ordenados:", error);
        res.status(500).json({ mensagem: "Erro ao buscar eventos ordenados", erro: error.message });
    }
});




// Função para conectar com o mongoDB
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
//


