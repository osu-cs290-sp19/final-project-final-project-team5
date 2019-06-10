var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var data = require('./mongo-db-init');

var app = express();
var port = process.env.PORT || 8930;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;
/*
var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = 27017;
var mongoUser = "cs290_martiisa";
var mongoPassword = "SickoMode123";
var mongoDBName = "cs290_martiisa";
*/
console.log("Host: " + mongoHost);
console.log("Port: " + mongoPort);
console.log("User: " + mongoUser);
console.log("Password: " + mongoPassword);
console.log("DBName: " + mongoDBName);


var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', function(req, res, next){
  res.status(200).sendFile(__dirname + '/public/login.html');
});

 app.get('/:userName', function (req, res, next){
   var userName = req.params.userName.toLowerCase();
   var collection = db.collection('people');
   collection.find({userName: userName}).toArray(function(err, people){
     if(err){
       res.status(500).send({
         error: "Error fetching userName from DB"
       });
     }else if(people.length < 1){
       next();
     }else{
       console.log("== people:", people);
       res.status(200).render('mainPage', people[0]);
     }
   });
 });


app.post('/:person/addPhoto', function (req, res, next) {
    var person = req.params.person.toLowerCase();
    if (req.body) {
        var collection = db.collection('people');
        var photo = {
            url: req.body.url
        };
        collection.updateOne(
          { userName: person },
          { $push: { photos: photo } },
          function (err, result) {
              if (err) {
                  res.status(500).send({
                      error: "Error inserting photo into DB"
                  });
              } else {
                  console.log("== update result:", result);
                  if (result.matchedCount > 0) {
                      res.status(200).send("Success");
                  } else {
                      next();
                  }
              }
          }
        );
    } else {
        res.status(400).send("Request needs a body with a URL and caption");
    }
});

app.get('*', function (req, res, next){
  res.status(404).sendFile(__dirname + '/public/404.html');
});

 MongoClient.connect(mongoUrl, function(err, client){
   if(err){
     throw err;
   }
   db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server is listening on port", port);
  });
 });
