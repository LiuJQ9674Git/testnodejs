var express = require('express')
    , routes = require('./routes')
    , http = require('http');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var app = module.exports = express();

//环境变量
app.set('port', process.env.PORT || 3000);

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('my secret here'));

// parse request bodies (req.body)
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'keyboard cat',
    cookie: { maxAge: 900000 }
}));


app.use(function(req, res, next){
    res.locals.user = req.session.user;
    //session modified
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    next();
});

function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error='请先登陆';
        return res.redirect('/login');
    }
    next();
}
function notAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error='已登陆';
        return res.redirect('/');
    }
    next();
}

//路由功能
//get为get请求，post为post请求，all为所有针对这个路径的请求
app.all('/login', notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.logout);
app.get('/home', authentication);
app.get('/', routes.index);

module.exports = app;

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000);

