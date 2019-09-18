// Kirjastot
const morgan = require('morgan');
const mysql = require('mysql');
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

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db'
});

dbConnection.connect();

// Routataan
server.get('/', function (req, res) {
    return res.send({ error: true, message: 'Ping received' })
});

// Asetetaan portti
server.listen(3333, function () {
    console.log('Node server is running on port 3333');
});

// Lisätään uusi henkilö
server.post('/add', function (req, res) {
    // Otetaan muuttujat
    let id_value = req.body.id;
    let first_value = req.body.first;
    let last_value = req.body.last;
    let age_value = req.body.age;

    if (!id_value || !first_value || !last_value || !age_value) {
        return res.status(400).send({ error: true, message: 'Insert some value on every field!!' });
    }

    let query = "INSERT INTO registration SET " + "id = " + id_value +  ", " + "first = " + '"' +  first_value + '"' +  ", " + "last = " + '"' +  last_value + '"' +  ", " + "age = " + age_value + ";";
    console.log(query);

   dbConnection.query(query, function (error, results) {
  if (error) throw ('There was error on the query!\n ' + error);
    return res.send({ error: false, data: results, message: 'New person have been added successfully' });
    });
});

// Haetaan yhden henkilön tiedot
server.get('/getone/:id', function (req, res) {
    let id_value = req.params.id;

    if (!id_value) {
     return res.status(400).send({ error: true, message: 'Give id of a person!!' });
    }

    let query = "SELECT * FROM registration WHERE id=" + id_value + ";";
    console.log(query);

    dbConnection.query(query, function (error, results) {
    if (error) throw ('There was error on the query!\n ' + error);
      return res.send({ error: false, data: results[0], message: 'Information of one person' });
    });
});

// Päivitetään yhden henkilön tiedot
server.put('/update', function(req, res){
    // Otetaan muuttujat
    let id_value = req.body.id;
    let first_value = req.body.first;
    let last_value = req.body.last;
    let age_value = req.body.age;
    
    if (!id_value || !first_value || !last_value || !age_value) {
        return res.status(400).send({ error: true, message: 'Insert some value on every field!!' });
    }

    let query = "UPDATE registration SET " + "first = " + '"' +  first_value + '"' +  ", " + "last = " + '"' +  last_value + '"' +  ", " + "age = " + age_value + " WHERE id = " + id_value + ";"
    console.log(query);

    dbConnection.query(query, function (error, results) {
        if (error) throw ('There was error on the query!\n ' + error);
        return res.send({ error: false, data: results, message: 'Information of a person have been updated successfully' });
       });
});

// Poistetaan yhden henkilön tiedot
server.delete('/delete/:id', function (req, res) {
    let id_value = req.params.id;
    if (!id_value) {
        return res.status(400).send({ error: true, message: 'Insert some value on the id!!' });
    }

    let query = "DELETE FROM registration WHERE id = " + id_value + ";";
    console.log(query);

    dbConnection.query(query, [id_value], function (error, results) {
        if (error) throw ('There was error on the query!\n ' + error);
        return res.send({ error: false, data: results, message: 'Person has been deleted successfully.' });
    });
});

// Exportataan moduuli muiden tiedostojen käytettäväksi
module.exports = server;



// Esimerkkikutsuja Postmaniin

// Lisäys:
// localhost:3333/add?{
// 	"id" : 2,
// 	"first" : "jani",
// 	"last" : "Janinen",
// 	"age" : 23
// }

// Haku:
// localhost:3333/getone/4

// Muokkaus:
// localhost:3333/update?{
//     "id" : 2,
//     "first" : "jania",
//     "last" : "Janinena",
//     "age" : 23
// }

// Poisto:
// localhost:3333/delete/2