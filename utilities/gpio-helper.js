var _ = require('lodash');
// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var inits = [];
var gpio;
try {
    gpio = require('pi-gpio');
}
catch(e) {
    gpio = {
        open: function (pin, dir, cb) {
            setTimeout(function() {
                console.log(`Opened ${pin} for ${dir}`);
                (cb || function(){})();
            }, 1000);
        },
        write: function (pin, value, cb) {
            setTimeout(function() {
                gpio.values[pin.toString()] = value;
                console.log(`Writing ${value} to ${pin}`);
                (cb || function(){})();
            }, 1000);
        },
        read: function (pin, cb) {
            setTimeout(function() {
                console.log(`Reading value of ${pin}`);
                (cb || function(){})(null, gpio.values[pin.toString()]);
            }, 1000);
        },
        close: function (pin, cb) {
            setTimeout(function() {
                console.log(`Closing ${pin}`);
                (cb || function(){})(null);
            }, 1000);
        }
    };
    gpio.values = {};
}

function enablePin(pin, cb) {
    pin = PIN_NUMBERS[pin];
    setPin(pin, 1, cb);
}
function disablePin(pin, cb) {
    pin = PIN_NUMBERS[pin];
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

function clearPins(){
    for(var i = 0; i< PIN_NUMBERS.length; i++) {
        gpio.close(PIN_NUMBERS[i]);
    }
}

process.on('exit', clearPins);
clearPins();
module.exports = {
    enable: enablePin,
    disable: disablePin
};