const router = require('koa-router')();
const controller = require('../controller/admin');


router.get('/', controller.index);
router.get('/user', controller.user);


module.exports = router;
