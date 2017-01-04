var _ = require('lodash');
var gpioController = require('./gpioController');

// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];

var ZONES = [
    {
        id: 1,
        name: 'Garage',
        ports: [4, 22],
        isOn: false
    },
    {
        id: 2,
        name: 'Downstairs',
        ports: [17,23],
        isOn: false
    },
    {
        id: 3,
        name: 'Upstairs',
        ports: [18,24],
        isOn: false
    },
    {
        id: 4,
        name: 'Deck',
        ports: [27,25],
        isOn: false
    },
];

function get(id) {
    return _.find(ZONES, function (z) {
        return z.id === id;
    });
}
function set(id, details) {
    var z = get(id);
    z.name = details.name || z.name;
    z.ports = details.ports || z.ports;
}
function toggleZone(id, cb) {
    var z = get(id);
    var ret = _.after(2, function() {
        cb(z);
    });
    z.isOn = !z.isOn;
    gpioController.toggle(z.ports[0], ret);
    gpioController.toggle(z.ports[1], ret);
}

module.exports = {
    getAll: function() {
        return ZONES;
    },
    get: get,
    set: set,
    toggle: toggleZone
};