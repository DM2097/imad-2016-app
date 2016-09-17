var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleOne={
	title:'Article One',
	heading:'Article One',
	date:'Sep 5,2016',
	content:"<p>hhahhahah hahahhah ahhahhaha</p>"
}
var htmlTemplate=`<html><head><title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link href="/ui/style.css" rel="stylesheet" />

</head>
<body>
<div class="container">
<div>
<div>
<a href="/">Home</a>
</div>
<hr/>
<div>
${date}
</div>
<div>
<p>
${content}
</p>
</div>
</div>
</body>
</html>"`
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
  res.send(path.join('Article two requested here'));
});
app.get('/article-three', function (req, res) {
  res.send(path.join('Article three requested here'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port ${port}!')
});
