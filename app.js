'use strict';

const koa = require('koa');
const config = require('./config/config');


const app = koa();
app.keys = ['study koa'];


const onerror = require('koa-onerror');
onerror(app);


const session = require('koa-generic-session');
app.use(session(app));


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


const staticCache = require('koa-static-cache');
app.use(staticCache(config.staticDir));


app.use(function *() {
    switch(this.path) {
        case '/get':
            get.call(this);
            break;
        case '/remove':
            remove.call(this);
            break;
        case '/regenerate':
            yield regenerate.call(this);
            break;
        default:
            get.call(this);
    }
});


function get() {
    const session = this.session;
    session.count = session.count || 0;
    session.count += 1;
    this.body = session.count;
}


function remove() {
    this.session = null;
    this.body = 0;
}


function *regenerate() {
    yield this.regenerateSession();
    get.call(this);
}


app.listen(config.port);
