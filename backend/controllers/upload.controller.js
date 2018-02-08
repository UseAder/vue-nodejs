var mongoose = require('mongoose');
var multer=require('multer')
var Upload=require('../models/upload.models')
var path=require('path')
exports.filedata=function(req,res,next){

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()+
            path.extname(file.originalname)//extname 扩展名
        )
        }
      })

    var upload = multer({ storage:storage}).single('avatar')
    upload(req,res,function(err){
        console.log(req.file);
        // var upload=new Upload(req.file);
        // upload.save
    })
}