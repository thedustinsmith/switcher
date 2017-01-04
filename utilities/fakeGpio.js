function G() {
    this.value = 1;
}

G.prototype.set = function(v, cb) {
    this.value = v;
    cb(v);
};

G.prototype.unexport = function(){

};
module.exports = {
    export: function(p, opts) {
        // opts.ready();
        return new G();
    }
};