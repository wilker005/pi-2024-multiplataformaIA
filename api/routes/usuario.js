const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { Usuario } = require('../models');

// Cadastro de usuário
router.post(
    '/signup',
    [
        check('nome').notEmpty().withMessage('O nome é obrigatório.'),
        check('email').isEmail().withMessage('Forneça um email válido.'),
        check('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nome, email, senha } = req.body;

            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                return res.status(409).json({ message: 'Usuário já existe com este email.' });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);
            const usuario = new Usuario({
                nome,
                email,
                senha: hashedPassword,
            });

            const novoUsuario = await usuario.save();
            res.status(201).json({
                message: 'Usuário cadastrado com sucesso!',
                data: novoUsuario,
            });
        } catch (error) {
            console.error("Erro interno ao cadastrar usuário:", error);
            res.status(500).json({
                message: "Erro interno do servidor.",
                error: error.message,
            });
        }
    }
);

// Login do usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ message: 'Email não encontrado.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET || 'chave-secreta',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar o login.' });
    }
});

if (!usuario || !(await usuario.validarSenha(senha))) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
}

module.exports = router;
