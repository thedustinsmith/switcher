var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var zoneController = require('./utilities/zoneController');
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

app.get('/', function (req, res) {
    res.render('index', {
        zones: zoneController.getAll()
    });
});

app.post('/toggle', function (req, res) {
    var zoneId = parseInt(req.body.pair, 10);
    var zone = zoneController.get(zoneId);
    zoneController.toggle(zoneId, function (z) {
        io.emit('toggle', { 
            zoneId: zoneId, 
            val: z.isOn
        });
        res.json({status: z.isOn});
    });
});

server.listen(3000);