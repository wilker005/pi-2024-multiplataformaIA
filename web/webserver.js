const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Olá mundo!')
});

app.use(express.static('publico'));

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});