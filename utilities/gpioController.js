var gpio;
var GPIOs = {};
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var dev = process.env.NODE_ENV === 'development';

try {
    gpio = require('gpio');
    if (dev) throw 'Dev';
}
catch (e) {
    gpio = require('./fakeGpio');
    console.log('hereherehere');
}

for (var i = 0; i< PORT_NUMBERS.length; i++) {
    var p = PORT_NUMBERS[i];
    GPIOs[p.toString()] = gpio.export(p, {
        ready: function() {
            this.set(1);
        }
    });
}

process.on('exit', function() {
    for (var p in GPIOs) {
        GPIOs[p].unexport();
    }
});

function set (port, val, cb) {
    GPIOs[port.toString()].set(val, cb);
}
function get(port) {
    return GPIOs[port.toString()].value;
}
function toggle(port, cb) {
    console.log(port);
    set(port, 1 - get(port), cb);
}
function toggleBoth(pair, cb) {
    var ret = _.after(2, cb);
    toggle(PORT_PAIRS[pair][0], ret);
    toggle(PORT_PAIRS[pair][1], ret);
}
function setBoth(pair, val, cb) {
    var ret = _.after(2, cb);
    set(PORT_PAIRS[pair][0], val, ret);
    set(PORT_PAIRS[pair][1], val, ret);
}
function getBoth(pair) {
    return get(PORT_PAIRS[pair][0]);
}
module.exports = {
    toggleBoth: toggleBoth,
    // set: setBoth,
    // get: getBoth
    set: set,
    get: get,
    toggle: toggle
};