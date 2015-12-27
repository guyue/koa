const router = require('koa-router')();
const controller = require('../controller/session');


router.get('/', controller.get);
router.get('/get', controller.get);
router.get('/remove', controller.remove);
router.get('/regenerate', controller.regenerate);

module.exports = router;
