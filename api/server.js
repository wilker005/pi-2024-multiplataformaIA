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

const Evento = mongoose.model('Evento', mongoose.Schema({
    nome: String,
    data_inicio: Date,
    preco: Number,
    descricao: String,
    url_logo: String,
    url_site: String,
    organizador: String,
    local: {
        type: PointSchema,
        required: true,
        index: '2dsphere'
    },
    endereco: String,
    cidade: String,
    estado: String,
    data_cadastro: Date,
    categorias : [Categorias]
}));

const usuarioSchema = mongoose.Schema({
    login: {type:String, required: true, unique:true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

app.get("/eventos", async (req, res) => {
    const eventos = await EventoBase.find()
    res.json(eventos)
})

app.post("/eventos", async (req, res) => {
    const nome = req.body.nome
    const descricao = req.body.descricao
    const organizador = req.body.organizador
    const eventoBase = new EventoBase({
        nome: nome,
        descricao: descricao,
        organizador: organizador 
    })
    await eventoBase.save()
    const eventos = await EventoBase.find()
    res.json(eventos)
})

app.post('/signup', async(req,res)=> {
    try{
        const login = req.body.login
        const password = req.body.password
        const cryptografada = await bcrypt.hash(password,10)
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


app.post('/login', async(req,res)=> {
    try{
        const login = req.body.login
        const password = req.body.password
        const u = await Usuario.findOne({login:req.body.login})
        if (!u) {
            return res.status(401).json({mensagem:"Login inválido"})
        } 
        const senhaValida = await bcrypt.compare(password, u.password)
        if (!senhaValida){
            return res.status(401).json({mensagem:"Senha inválida"})
        }
        const token = jwt.sign(
            {login: login},
            "chave-secreta",
            {expiresIn: "1h"}
        )
        res.status(200).json({token:token})
    } catch (error) {
        
    }
})


async function conectarAoMongo() {
    await mongoose.connect(uri, {
    });
}

app.listen(port, () => {
    try {
        conectarAoMongo()
        console.log(`Servidor rodando na port ${port}`)
    } catch(error) {
        console.log("Erro", e)
    }
})