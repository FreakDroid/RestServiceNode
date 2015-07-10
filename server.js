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


//Autenticacion necesaria para enlazar el API
github.authenticate({
    type: "oauth",
    token: '6d42366f326b5917c604c723935dbad4f88a36cb' //Tu token de desarrollo acá
});

//Routes
//Devuele la informacion de un usuario en especifico
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


//Devuelve la info de una org cualquiera (No se necesitan permisos)
app.get('/org/:org', function(req, res){
  //res.send('hola mundo Org');
  var _org = req.params.org;
  //Llamada al Api desde el wrapper
  github.orgs.get({
      org: _org
  }, function(err, resp) {
     res.send(JSON.stringify(resp));
  });
});


//Devuelve todos los team de la organizacion (Requiere autenticacion)
app.get('/team/:org', function(req, res){
  //res.send('hola mundo Org');
  var _org = req.params.org;
  //Llamada al Api desde el wrapper
  github.orgs.getTeams({
      org: _org
  }, function(err, resp) {
     res.send(JSON.stringify(resp));
  });
});


//Ruta de prueba
app.get('/about', function(req, res){
  res.send('Hola estoy en about');
});


//Go live
app.listen(4333);
console.log('Servidor escuchando en el puerto 4333');
