/**
 * Created by liujianqiang on 16/5/16.
 */
module.exports = function (app) {
    app.get('/add', function (req, res) {
        res.send('add info');
    });

    app.get('/', function (req, res) {
        res.send('index');
    });

    app.get('/login', function (req, res) {
        res.send('Hello world-Login');
    });
};


