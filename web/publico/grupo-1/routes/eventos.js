const express = require('express');
const router = express.Router();

const Evento = require('../models/evento'); // Modelo de evento

router.post('/cadastro', (req, res) => {
  const { nomeEvento, dataInicio, preco, descricao, urlLogo, urlSite, endereco, cidade, estado, categoria, numero, cep } = req.body;

  const novoEvento = new Evento({
    nomeEvento,
    dataInicio,
    preco,
    descricao,
    urlLogo,
    urlSite,
    endereco,
    cidade,
    estado,
    categoria,
    numero,
    cep
  });

  novoEvento.save()
    .then(() => {
      res.status(201).json({ message: "Evento cadastrado com sucesso!" });
    })
    .catch((err) => {
      console.error('Erro ao salvar evento:', err);
      res.status(500).json({ message: "Erro ao cadastrar evento", error: err });
    });
});

module.exports = router; // Onde router é uma instância do express.Router()

