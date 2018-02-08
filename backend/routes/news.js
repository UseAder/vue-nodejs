var express = require('express');
var router = express.Router();
const datactrl=require('../controllers/news.controllers')
/* GET users listing. */
router.post('/data', datactrl.create);
router.post('/data/:id', datactrl.update);
router.delete('/data/:id', datactrl.remove);
router.post('/list', datactrl.list);
module.exports = router;

