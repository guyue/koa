module.exports = {
    index: function *() {
        this.body = 'Hello World!(' + this.csrf + ')';
    },
};
