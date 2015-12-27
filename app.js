'use strict';

const koa = require('koa');
const config = require('./config/config');


const app = koa();
app.keys = ['study koa'];


const compress = require('koa-compress');
app.use(compress());


const onerror = require('koa-onerror');
onerror(app);


const session = require('koa-generic-session');
app.use(session(app));


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


const staticCache = require('koa-static-cache');
app.use(staticCache(config.staticDir));


const react = require('koa-react-view');
react(app, {
    views: config.viewDir,
});


const register = require('babel-register');
register({
    only: [
        config.viewDir,
        config.staticDir,
    ],
    presets: ['react'],
    extensions: ['.jsx',],
});


const csrf = require('koa-csrf');
csrf(app);
app.use(csrf.middleware);


const router = require('koa-router')();

const indexRouter = require('./router/index');
const sessionRouter = require('./router/session');

router.use('/', indexRouter.routes());
router.use('/session', sessionRouter.routes());

app.use(router.routes());


app.listen(config.port);
