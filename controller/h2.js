const ua = require('../util/ua');

module.exports = {
    index: function *() {
        const req = this.req;
        this.render('h2', {
            title: 'HTTP2 TEST',
            isSpdy: req.isSpdy,
            spdyVersion: req.spdyVersion,
            ua: ua(this.header['user-agent']).toString(),
            csrf: this.csrf,
        });
    },
};
