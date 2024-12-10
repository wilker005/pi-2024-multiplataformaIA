const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
const uri = process.env.MONGODB_URL;

// ================== SCHEMAS ================== //
// Esquema para Eventos
const EventosGrupo3 = mongoose.model(
    'EventosGrupo3',
    mongoose.Schema({
        nome: { type: String, required: true },
        dataInicio: { type: String, required: true },
        preco: { type: String, required: true },
        descricao: { type: String, required: true },
        urlLogo: { type: String },
        urlSite: { type: String },
        cep: { type: String },
        endereco: { type: String },
        cidade: { type: String },
        estado: { type: String },
        numero: { type: String },
        categorias: { type: String },
        tipo: { type: String, required: true }, // Adicionado
        dataCadastro: { type: String, default: new Date().toISOString() },
    })
);

// Esquema para Usuários
const cadastroUsuarioSchema = mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
});
cadastroUsuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model('Usuario', cadastroUsuarioSchema);

// ================== ROTAS ================== //
// Rota POST - Cadastrar Evento
app.post('/cadastrar', async (req, res) => {
    try {
        const { nome, dataInicio, preco, descricao, urlLogo, urlSite, cep, endereco, cidade, estado, numero, categorias } = req.body;

        // Define o tipo do evento automaticamente
        let tipo = '';
        if (nome.toLowerCase().includes('numanice')) tipo = 'numanice';
        else if (nome.toLowerCase().includes('glow')) tipo = 'glow';
        else tipo = 'especifico03';

        const evento = new EventosGrupo3({
            nome,
            dataInicio,
            preco,
            descricao,
            urlLogo,
            urlSite,
            cep,
            endereco,
            cidade,
            estado,
            numero,
            categorias,
            tipo,
        });

        await evento.save();
        res.status(201).json({ mensagem: 'Evento cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
        res.status(500).json({ mensagem: 'Erro ao cadastrar evento.', erro: error.message });
    }
});

// Rota GET - Listar Eventos Ordenados
app.get('/eventosOrdenados', async (req, res) => {
    try {
        const eventos = await EventosGrupo3.find().sort({ nome: 1 });
        res.json(eventos);
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar eventos.', erro: error.message });
    }
});

// Rota POST - Cadastro de Usuário
app.post('/cadastroUsuario', async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha } = req.body;
        if (senha !== confirmarSenha) return res.status(400).send('As senhas não coincidem.');

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({ nome, email, senha: senhaCriptografada });
        await usuario.save();

        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        if (error.code === 11000) return res.status(409).send('E-mail já cadastrado.');
        res.status(500).send('Erro ao cadastrar usuário.');
    }
});

// Rota POST - Login de Usuário
app.post('/loginUsuario', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(401).json({ mensagem: 'E-mail inválido.' });

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ mensagem: 'Senha inválida.' });

        const token = jwt.sign({ email: usuario.email }, 'chave-secreta', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ mensagem: 'Erro ao realizar login.' });
    }
});

// ================== CONEXÃO COM O BANCO ================== //
async function conectarAoMongo() {
    try {
        await mongoose.connect(uri, {});
        console.log('Conexão ao MongoDB bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

app.listen(port, () => {
    conectarAoMongo();
    console.log(`Servidor rodando na porta ${port}`);
});
