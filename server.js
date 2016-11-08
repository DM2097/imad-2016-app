var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
    user: 'dm2097',
    database: 'dm2097',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    };
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});
function hash(input, salt){
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
    
}
app.get('/hash/:input',function (req, res){
    var hashedString = hash(req.params.input, 'hear-me-roar');
    res.send(hashedString);
    
});
var pool=new Pool(config);
app.post('/create-user', function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('Insert INTO "user" (username, password) VALUES ($1,$2)', [username, dbString], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            res.send('User Successfully created: ' + username);
        }
    });
});
app.post('/login', function(req,res){
    var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});
/*app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});*/
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
