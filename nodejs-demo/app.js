var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//环境变量
app.set('port', process.env.PORT || 3000);


app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


app.use(favicon(__dirname + '/public/images/favicon.png'));

app.use(logger('dev'));

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

/**
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});
*/
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
app.get('/home', routes.home);



module.exports = app;
