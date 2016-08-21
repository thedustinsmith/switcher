var _ = require('lodash');
// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var inits = [];
var Gpio;
try {
    Gpio = require('onoff').Gpio;
}
catch(e) {
    Gpio = function(port, dir) {
        this.value = 0;
    };
    Gpio.prototype.readSync = function() {
        return this.value;
    };
    Gpio.prototype.writeSync = function(val) {
        this.value = val;
    };
}

var GPIOs = [];
for(var i = 0; i < PORT_NUMBERS.length; i++) {
    GPIOs.push(new Gpio(PORT_NUMBERS[i], 'output'));
}

function toggle (port) {
    set(port, get(port) - 1);
}
function get (port) {
    GPIOs[port].readSync();
}
function set (port, val) {
    GPIOs[port].writeSync(val);
}

module.exports = {
    toggle: toggle,
    set: set,
    get: get
};