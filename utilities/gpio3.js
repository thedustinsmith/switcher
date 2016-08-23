var _ = require('lodash');
// some libraries use pins, some use ports
var PIN_NUMBERS = [7, 11, 12, 13, 15, 16, 18, 22];
var PORT_NUMBERS = [4, 17, 18, 27, 22, 23, 24, 25];
var PORT_PAIRS = [[4, 17], [18, 27], [22, 23], [24, 25]];
var gpios = {}
var gpio;
try {
    gpio = require('gpio');
}
catch(e) {
    gpio = {
        export: function(p, opts) {
            opts.ready();
        },
        set: function (v) {
            this.value = v;
        }
    };
}

for (var i = 0; i< PORT_NUMBERS.length; i++) {
    var p = PORT_NUMBERS[i];
    gpios[p.toString()] = gpio.export(p, {
        ready: function() {
            this.set(1);
        }
    });
}

process.on('exit', function() {
    for (var p in gpios) {
        gpios[p].unexport();
    }
});

function set (port, val, cb) {
    gpios[port.toString()].set(val, cb);
}
function get(port) {
    return gpios[port].value;
}
function toggle(port, cb) {
    set(port, 1 - get(port), cb);
}
function toggleBoth(pair, cb) {
    var ret = _.after(2, cb);
    toggle(PORT_PAIRS[pair][0], ret);
    toggle(PORT_PAIRS[pair][1], ret);
}
module.exports = {
    toggle: toggle,
    toggleBoth: toggleBoth,
    set: set,
    get: get
};