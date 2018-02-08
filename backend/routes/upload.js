var express = require('express');
var router = express.Router();
const datactrl=require('../controllers/upload.controller')
/* GET users listing. */
router.post('/filedata', datactrl.filedata);

module.exports = router;

