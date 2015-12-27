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


const router = require('koa-router')();

const indexRouter = require('./router/index');
const sessionRouter = require('./router/session');

router.use('/', indexRouter.routes());
router.use('/session', sessionRouter.routes());

app.use(router.routes());


app.listen(config.port);
