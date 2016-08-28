var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var gpioHelper = require('./utilities/gpio3');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'html');
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
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

function getSwitchStatus(){
    return {
        switch0: !gpioHelper.get(0),
        switch1: !gpioHelper.get(1),
        switch2: !gpioHelper.get(2),
        switch3: !gpioHelper.get(3),
    };
}

app.get('/', function (req, res) {
    res.render('index', getSwitchStatus());
});

app.post('/toggle', function (req, res) {
    var pair = parseInt(req.body.pair, 10);
    var v = parseInt(req.body.value, 10);
    gpioHelper.toggleBoth(pair, function() {
        io.emit('toggle', { 
            pair: pair, 
            val: gpioHelper.get(pair)
        });
        res.json(getSwitchStatus());
    });
});

server.listen(3000);