var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var fs = require('fs');

//讀取html檔
function render(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  return data;
}

app.get('/', function (req, res) {
  res.send(render('./public/main.html'));
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = '';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); //連線失敗
db.once('open', (db) => console.log('Connected to MongoDB')); //連線成功

///引入Router 一個Router基本上處理一個資料表
const recordRouter = require("./routes/record");
app.use("/record",recordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
