const express = require('express');
const Database = require('./database.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var Athlete = require('./model/athlete.js');

const connection = new Database();
const app = express();
const port = 8080;

var cors = require('cors');

// CORS-middlewaren käyttöönotto
app.use(cors());
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  
  if(req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
   return res.status(200).json({});
  }
  next();
});
// Sallitaan pääsy selaimen tarvitsemiin tiedostoihin
app.use(express.static(__dirname+'/client')); 

app.get('/api/v1/athletes', (req, res) => {
  Athlete.find(function(err, athletes) {
    if(err) {
      throw ("failed" + err);
    }
    res.send(athletes);
  })
});

// REST rajapinta ja mongoose kirjaston käyttö samassa funktiossa
app.post('/api/v1/athlete', (req, res) => {
  console.log("POST /api/v1/athlete");

  Athlete(req.body).save(function(err, athlete) {
    if (err){
      throw ("failed" + err);
    }
    res.json(athlete);
  })
});

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`));