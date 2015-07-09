//Global Variables
var express = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var GitHubApi = require("github");
var app = express();

//Config
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());   // simulate DELETE and PUT


///Init GitHubApi
var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    //pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    }
});

//Routes
//Algunas de prueba
app.get('/user/:user', function(req, res){
  res.send('hola mundo');
  var _user = req.params.user;
  //Llamada al Api desde el wrapper
  github.user.getFollowingFromUser({
      user: _user
  }, function(err, res) {
      console.log(JSON.stringify(res));
  });
});

app.get('/org/:org', function(req, res){
  res.send('hola mundo Org');
  var _org = req.params.org;
  //Llamada al Api desde el wrapper
  github.orgs.get({
      org: _org
  }, function(err, res) {
      console.log(JSON.stringify(res));
  });
});


app.get('/about', function(req, res){
  res.send('Hola estoy en about');
});


//Go live
app.listen(4333);
console.log('Servidor escuchando en el puerto 4333');
