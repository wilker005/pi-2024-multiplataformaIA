const express = require('express');
const router = express.Router();

router.use('/eventos', require('./eventos'));
router.use('/usuarios', require('./usuarios'));

module.exports = router;
