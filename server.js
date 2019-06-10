var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 8390;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', function(req, res, next){
  res.status(200).sendFile(__dirname + '/public/login.html');
});

app.get('/:personId', function (req, res, next){
  var personId = req.params.personId.toLowerCase();
  var collection = db.collection('people');
  collection.find({personId: personId}).toArray(function(err, people){
    if(err){
      res.status(500).send({
        error: "Error fetching personId from DB"
      });
    }else if(people.length < 1){
      next();
    }else{
      console.log("== people:", people);
      res.status(200).render('mainPage', people[0]);
    }
  });
});

app.get('*', function (req, res, next){
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// MongoClient.connect(mongoUrl, function(err, client){
//   if(err){
//     throw err;
//   }
//   db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server is listening on port", port);
  });
// });
