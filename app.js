'use strict';
require('babel-polyfill');

const path = require('path');
const  spdy = require('spdy');
const fs = require('fs');

const koa = require('koa');
const config = require('./config/config');


const app = koa();
app.keys = ['study koa'];


const compress = require('koa-compress');
app.use(compress());


const onerror = require('koa-onerror');
onerror(app);


const less = require('koa-less');
app.use(less(path.join(config.staticDir, 'src')));


const staticCache = require('koa-static-cache');
app.use(staticCache(path.join(config.staticDir, 'dist')));
app.use(staticCache(path.join(config.staticDir, 'src'), {
    dynamic: true,
}));


const session = require('koa-generic-session');
app.use(session(app));


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


const react = require('koa-react-view');
react(app, {
    views: config.viewDir,
});


const register = require('babel-register');
register({
    only: [
        config.viewDir,
        config.controllerDir,
        config.commonDir,
        config.staticDir,
    ],
    presets: [
        'es2015',
        'react',
    ],
    extensions: [
        '.jsx',
        '.js',
    ],
});


const csrf = require('koa-csrf');
csrf(app);
app.use(csrf.middleware);


const router = require('koa-router')();

const h2Router = require('./router/h2');
router.use('/h2', h2Router.routes());
const indexRouter = require('./router/index');
router.use('/*', indexRouter.routes());

app.use(router.routes());

const options = {
    key: fs.readFileSync(__dirname + '/keys/server-key.pem'),
    cert: fs.readFileSync(__dirname + '/keys/server-cert.pem'),
    ca: fs.readFileSync(__dirname + '/keys/ca-cert.pem'),
};

const server = spdy.createServer(options, app.callback());

server.listen(config.port);
