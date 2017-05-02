var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('error-handler');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = process.env.Port || 3000;

var server = app.listen(port, function() {
  console.log("port %d in %s mode", port, process.env.NODE_ENV || 'production');
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(err,req,res,next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
})
if (process.env.NODE_ENV == 'development') {
  app.set(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error',{
      message: err.message,
      error: err
    });
  });
} else if (process.env.NODE_ENV == 'production') {
  app.set(function(err, req, res, next) {
    res.status(res.status || 500);
    res.render('error',{
      message: err.message,
      error: {}
    });
  });
}

var router = require('./routes')(app);
