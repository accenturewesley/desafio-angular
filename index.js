var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 2001))
app.use(express.static(__dirname)); 

var server = app.listen(app.get('port'),function(){
    console.log("Servidor Iniciado na Porta: "+app.get('port'));
});

var router = express.Router();

app.get('*', function(req, res) {
    res.sendfile('index.html'); 
});