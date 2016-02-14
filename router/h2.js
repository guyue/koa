const router = require('koa-router')();
const controller = require('../controller/h2');


router.get('/', controller.index);


module.exports = router;
