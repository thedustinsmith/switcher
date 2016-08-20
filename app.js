var express = require('express');
var nunjucks = require('nunjucks');
//var gpioHelper = require('./utilities/gpio-helper');

var app = express();
app.set('view engine', 'html');

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
    var s = req.body.switchIx;
    gpioHelper.toggle(0, function() {
        res.redirect('/');
    });
});

app.listen(3000);