const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Usuario } = require('../models');

// Cadastro de usuário
router.post('/signup', async (req, res) => {
    try {
        const { nome, email, telefone, cpf, senha } = req.body;

        if (!nome || !email || !telefone || !cpf || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Verifique se o usuário já existe no banco
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ 
                message: 'Usuário já existe com este email.', 
                usuario: usuarioExistente 
            });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({
            nome,
            email,
            telefone,
            cpf,
            password: hashedPassword,
        });

        const novoUsuario = await usuario.save();
        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso!',
            data: novoUsuario 
        });
    } catch (error) {
        console.error("Erro interno ao cadastrar usuário:", error);
        res.status(500).json({
            message: "Erro interno do servidor.",
            error: error.message,
            stack: error.stack // Incluindo a pilha de chamadas para depuração
        });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const usuario = await Usuario.findOne({ login });
        if (!usuario) return res.status(401).send('Login inválido');
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) return res.status(401).send('Senha inválida');

        const token = jwt.sign({ login }, 'chave-secreta', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Erro ao realizar login');
    }
});

module.exports = router;
