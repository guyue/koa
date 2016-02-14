module.exports = {
    index: function *() {
        const req = this.req;
        this.render('h2', {
            title: 'HTTP2 TEST',
            isSpdy: req.isSpdy,
            spdyVersion: req.spdyVersion,
            csrf: this.csrf,
        });
    },
};
