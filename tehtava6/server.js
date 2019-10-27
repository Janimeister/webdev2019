// Kirjastot
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(morgan('combined'));
server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/', function (req, res) {
    return res.send({ error: true, message: 'Ping received' })
});

// Asetetaan portti
server.listen(3001, function () {
    console.log('Node server is running on port 3001');
});


server.get('/random', function (req, res) {
    var taulukko = [[1,2,3],[2,3,4],[3,4,5],[1,6,11],[2,7,12],[3,8,13],[4,9,14],[5,10,15],[6,11,16],[7,12,17],[8,13,18],[9,14,19],[10,15,20],[11,16,21],[12,17,22],[13,18,23],[14,19,24],[15,20,25],[6,7,8],[7,8,9],[8,9,10],[11,12,13],[12,13,14],[13,14,15],[16,17,18],[17,18,19],[18,19,20],[21,22,23],[22,23,24],[23,24,25]];
    var index = Math.floor(Math.random()*taulukko.length) +1;
    res.send(taulukko[index]);
});
