const express = require('express');
const router = express.Router();

router.use('/eventos', require('./eventos'));
router.use('/usuarios', require('./usuario'));
router.get('/detalheEvento', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/detalheEvento.html')); // Caminho para o HTML
});
console.log('Exportando router de eventos');

module.exports = router;

