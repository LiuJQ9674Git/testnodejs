var connect = require('connect');

var express = require('express'); var path = require('path');var favicon = require('serve-favicon');var logger = require('morgan');var cookieParser = require('cookie-parser');var bodyParser = require('body-parser');
var app = connect()    .use(function (req, res) {        res.end('hello world\n');    })
	//.use(connect.logger())    .listen(3000);