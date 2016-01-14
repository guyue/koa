const router = require('koa-router')();
const controller = require('../controller/user');


router.get('/', controller.index);


module.exports = router;
