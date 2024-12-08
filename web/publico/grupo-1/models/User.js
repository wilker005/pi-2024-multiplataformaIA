const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Esquema do usuário
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true },
    senha: { type: String, required: true },
});

// Plugin para validação de unicidade
userSchema.plugin(uniqueValidator);

// Método para verificar a senha
userSchema.methods.validarSenha = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
};

// Método para gerar token JWT
userSchema.methods.gerarToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET || 'chave-secreta', // Use variável de ambiente em produção
        { expiresIn: '1h' }
    );
};

module.exports = mongoose.model('User', userSchema);
