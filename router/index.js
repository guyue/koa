const router = require('koa-router')();
const controller = require('../controller/index');


router.get('/', controller.index);
router.get('user', controller.user);


module.exports = router;
