'use strict';

const koa = require('koa');
const config = require('./config/config');

const app = koa();

app.use(function *() {
    this.body = JSON.stringify(config);
});

app.listen(config.port);
