const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const router = express.Router();

const path = __dirname + '/publico/';

const app = express()

router.use(function (req,res,next){
  console.log('/' + req.method);
  next();
})

router.get('/', function (req,res){
  res.sendFile(path + 'grupo-2/index.html');
})
app.use(express.static('publico'));

app.use('/',router);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});