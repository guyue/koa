'use strict';

const koa = require('koa');
const config = require('./config/config');

const app = koa();

const onerror = require('koa-onerror');
onerror(app);

app.use(function *() {
    this.body = JSON.stringify(config);
});


app.listen(config.port);
