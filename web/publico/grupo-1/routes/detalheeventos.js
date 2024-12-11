const express = require('express');
const router = express.Router();
const DetalheEvento = require('../models/detalheEvento');

// Rota para renderizar a página de detalhes do evento
router.get('/:eventoId', async (req, res) => {
    try {
        const { eventoId } = req.params;
        const detalheEvento = await DetalheEvento.findOne({ eventoId }).populate('eventoId');
        if (!detalheEvento) {
            return res.status(404).send('Detalhes do evento não encontrados.');
        }

        // Renderizar a página com os detalhes do evento
        res.render('detalheEvento', { detalheEvento });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar detalhes do evento.');
    }
});

module.exports = router;
