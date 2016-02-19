const router = require('koa-router')();
const controller = require('../controller/index.jsx');


router.get('/', controller.index);


module.exports = router;
