/**
 * Created by liujianqiang on 16/5/16.
 */
var express = require('express');
var app = express();


app.set('port', process.env.PORT || 3000);

app.set('view engine', 'jade');

//app.use(express.favicon());
var favicon = require('serve-favicon');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.png'));

var logger = require('morgan');
app.use(logger('dev'));

var bodyParser = require('body-parser');
//app.use(bodyParser());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
//var methodOverride = require('method-override');
//app.use(methodOverride('X-HTTP-Method-Override'));

//app.use(app.router);

//app.use(express.static(__dirname + '/public'));
//var routes = require('./baseroutes')(app);
/*
app.get('/', function(req, res){
    var body = 'Hello World,北京';
    //res.setHeader('Content-Type', 'text/plain');
    //res.setHeader('Content-Length', body.length);
    res.end(body);
});
*/

//var api = require('./baseroutes')(app);
//app.get('/api', api.index);

var routes = require('./baseroutes')(app);

app.listen(8080);
