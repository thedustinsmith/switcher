var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var gpioHelper = require('./utilities/gpio3');

var app = express();
app.set('view engine', 'html');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    tags: {
        blockStart: '{%',
        blockEnd: '%}',
        variableStart: '{$',
        variableEnd: '$}',
        commentStart: '{#',
        commentEnd: '#}'
    }
});

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/toggle', function (req, res) {
    var s = parseInt(req.body.switchIx, 10);
    var val = parseInt(req.body.val || 0, 10);
    gpioHelper.set(s, val, function () {
        res.redirect('/');
    });

    // gpioHelper.enable(0, function (err) {
    //     if (err) throw err;
    //     res.redirect('/');
    // });
    // gpioHelper.toggle(0);
    // res.redirect('/');
    // gpioHelper.set(0, 1, function () {
    //     res.redirect('/');
    // });
});

app.listen(3000);