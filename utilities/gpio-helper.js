var gpio = require('pi-gpio');
var _ = require('lodash');
// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var inits = [];

function enablePin(pin, cb) {
    setPin(pin, 1, cb);
}
function disablePin(pin, cb) {
    setPin(pin, 0, cb);
}
function setPin(pin, val, cb) {
    gpio.open(pin, 'output', function (err) {
        gpio.write(pin, val, function (err) {
            if(err) throw err;
            gpio.close(pin);
            cb(err, val);
        });
    });
}
function getPin(pin, cb) {
    gpio.open(pin, 'output', function (err) {
        gpio.read(pin, function (err, v) {
            if(err) throw err;
            gpio.close(pin);
            cb(err, v);
        });
    });
}

module.exports = {
    enable: enable,
    disable: disable
};