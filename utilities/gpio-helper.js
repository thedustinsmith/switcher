var gpio = require('pi-gpio');
var _ = require('lodash');
// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var inits = [];

for (var i = 0; i < PIN_NUMBERS.length; i++) {
    inits.push(new Promise(function (resolve, reject) {
        gpio.open(PIN_NUMBERS[i], 'output', function (err) {
            if (err) reject();
            resolve();
        });
    }));
}

function togglePin(pin, cb) {
    Promises.all(inits).then(function () {
        get(pin, function (err, v) {
            set(pin, 1-v, cb);
        });
    });
}
function setPin(pin, val, cb) {
    gpio.write(pin, val, cb);
}
function getPin(pin, cb) {
    gpio.read(pin, cb);
}

function toggle(ix, cb) {
    var ret = _.after(2, cb);
    togglePin(PIN_NUMBERS[0], ret);
    togglePin(PIN_NUMBERS[1], ret);
}
module.exports = {
    toggle: toggle,
    set: set,
    get: get
};