const express = require('express')

const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

const port = 3000;
dotenv.config();
const uri = process.env.MONGODB_URL

app.use(express.json())
app.use(cors())

/*Schemas*/
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

const Categoria = new mongoose.Schema({ 
    nome: String,
    descricao: String
})

const Evento = new mongoose.model('Evento', mongoose.Schema({
    nome: String,
    descricao: String,
    organizador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    url_banner: String,
    dataInicio: String,
    dataFim: String,
    horarioInicio: String,
    horarioFim: String,
    ingresso: {
        valor: Number,
        urlIngresso: String
    },
    endereco: {
        rua: String,
        numero: Number,
        bairro: String,
        estado: String,
        cep: String,
        complemento: String
    },
    local: {
        type: PointSchema,
        // required: true,
        index: '2dsphere'
    },
    categorias: [Categoria],
    dataCriacao: Date
}))

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true
    },
    nomeUsuario: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    senha: {
        type: String, 
        required: true
    },
    telefone: {
        type: String, 
        required: true
    }
})

const organizadorSchema = new mongoose.Schema({
    usuario: usuarioSchema,
    logo_url: String
})

const participanteSchema = new mongoose.Schema({
    usuario: usuarioSchema,
    local: {
        type: PointSchema,
        required: true,
        index: '2dsphere'
    }
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = new mongoose.model('Usuario', new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['organizador','participante'],
        required: true
    },
    dados: { type: mongoose.Schema.Types.Mixed, required: true}
}))

/*Requisições*/
app.get('/eventos', async(req, res) => {
    const eventos = await Evento.find().sort({ data: -1 }).limit(3)
    res.status(201).json(eventos)
})

app.post('/evento', async(req, res) => {
    const nome = req.body.nome
    const descricao = req.body.descricao
    // const organizador = req.body.organizador
    // const banner = req.body.banner
    const dataInicio = req.body.dataInicio
    const dataFim = req.body.dataFim
    const horarioInicio = req.body.horarioInicio
    const horarioFim = req.body.horarioFim
    const ingresso = req.body.ingresso
    const endereco = req.body.endereco
    // const categorias = req.body.categorias

    const evento = new Evento({
        nome: nome,
        descricao: descricao,
        // organizador: organizador,
        // banner: banner,
        dataInicio: dataInicio,
        dataFim: dataFim,
        horarioInicio: horarioInicio,
        horarioFim: horarioFim,
        ingresso: ingresso,
        endereco: endereco,
        // categorias: categorias
    })

    const eventoSalvo = await evento.save()
    res.status(201).json(eventoSalvo)
})

app.post('/cadastro', async(req, res) => {
    try {
        const nome = req.body.nome
        const nomeUsuario = req.body.nome_usuario
        const email = req.body.email
        const senha = req.body.senha
        const telefone = req.body.telefone
        
        const cryptografada = await bcrypt.hash(senha, 10)
        const usuario = new Usuario({
            nome: nome,
            nomeUsuario: nomeUsuario,
            email: email,
            senha: cryptografada,
            telefone: telefone
        })

        const respostaBanco = await usuario.save
        res.end()
        console.log(respostaBanco)
    }catch(error){
        console.log(error)
        res.status(409).send("Erro ao cadastrar usuário")
    }

})

app.post('/login', async(req, res) => {
    try{
        const email = req.body.email
        const senha = req.body.senha

        const usuario = await Usuario.findOne({
            email: email
        })

        if(!usuario){
            return res.status(401).json({ mensagem: "Login inválido" })
        }

        const verificacaoSenha = await bcrypt.compare(senha, usuario.senha)
        if(!verificacaoSenha){
            return res.status(201).json({ mensagem: "Senha válida" })        
        }

        const token = jwt.sign({ email: email },
            'chave-secreta', { expiresIn: '1h'}
        )

        req.status(200).json({ token: token })
    }catch(error){
        console.log(error)
        res.status(409).send("Erro ao fazer login")
    }
})

async function conectarAoMongo() {
    await mongoose.connect(uri, {})
}

app.listen(port, () => {
    try {
        conectarAoMongo()
        console.log(`Servidor rodando na port ${port}`)
    } catch (error) {
        console.log("Erro", error)
    }
})