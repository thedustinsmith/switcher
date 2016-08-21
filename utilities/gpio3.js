var _ = require('lodash');
// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var inits = [];
var gpio;
try {
    gpio = require('gpio');
}
catch(e) {
    gpio = {
        export: function(p, opts) {
            opts.onReady();
        },
        set: function (v) {
            this.value = v;
        }
    };
}

function set (port, val, cb) {
    var g = gpio.export(PORT_NUMBERS[port], {
        onReady: function() { 
            g.set(val);
            cb();
        }
    });
}
function get( port) {

}
function toggle(port) {

}

module.exports = {
    toggle: toggle,
    set: set,
    get: get
};