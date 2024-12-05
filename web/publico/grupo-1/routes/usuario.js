const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Usuario } = require('../models');

// Cadastro de usuário
router.post('/signup', async (req, res) => {
    try {
        const { login, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ login, password: hashedPassword });
        const novoUsuario = await usuario.save();
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(409).send('Erro ao cadastrar usuário');
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
