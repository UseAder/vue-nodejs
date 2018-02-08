var express = require('express');
var router = express.Router();
const datactrl=require('../controllers/cat.controllers')
/* GET users listing. */
router.post('/data', datactrl.create);
router.post('/data/:id', datactrl.update);
router.delete('/data/:id', datactrl.remove);
router.post('/list', datactrl.list);
router.post('/list/:type', datactrl.listtype);//根据什么 寻找到有匹配的所有
module.exports = router;

