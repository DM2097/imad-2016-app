var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    user: 'dm2097',
    database: 'dm2097',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    };
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input, salt){
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
    
}
app.get('/hash/:input',function (req, res){
    var hashedString = hash(req.params.input, 'hear-me-roar');
    res.send(hashedString);
    
});

app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/Portfolio.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Portfolio.html'));
});
app.get('/game.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'game.html'));
});
app.get('/blog.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});


app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/bh1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bh1.jpg'));
});
app.get('/ui/b2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'b2.jpg'));
});
app.get('/ui/11.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '11.jpg'));
});
app.get('/ui/2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '2.jpg'));
});
app.get('/ui/3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '3.jpg'));
});
app.get('/ui/fb1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb1.png'));
});
app.get('/ui/form.php', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'form.php'));
});
app.get('/ui/git1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'git1.png'));
});
app.get('/ui/gp.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gp.png'));
});
app.get('/ui/in1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'in1.png'));
});
app.get('/ui/lin1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lin1.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port ${port}!');
});
