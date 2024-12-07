const express = require('express');
const bcrypt = require('bcrypt'); // Certifique-se de que esta linha está presente
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

        // Adicionar hash à senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({
            nome,
            email,
            telefone,
            cpf,
            senha: hashedPassword,
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
            stack: error.stack 
        });
    }
});

// Rota de login (POST)
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;  // Recebe os campos de email e senha

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }

    try {
        // Verificar se o usuário existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensagem: "email não encontrado" });
        }

        // Verificar se a senha está correta
        const senhaValida = await usuario.compararSenha(senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha inválida" });
        }

        // Gerar o token JWT
        const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET || 'chave-secreta', { expiresIn: '1h' });

        // Retornar o token
        res.status(200).json({ mensagem: "Login bem-sucedido", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao realizar o login" });
    }
});


module.exports = router; // Onde router é uma instância do express.Router()
