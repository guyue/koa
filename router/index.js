const router = require('koa-router')();
const controller = require('../controller/index.jsx');


router.get('/', controller.index);
router.get('user', controller.index);


module.exports = router;
