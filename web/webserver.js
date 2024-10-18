const express = require('express')
const router = express.Router();
const port = 8080;

const app = express()
const path = __dirname + '/publico/';

app.use(express.static('publico'));

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});


app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})