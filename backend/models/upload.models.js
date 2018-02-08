var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ /* schema definition */ 
   fieldname:String,
   originalname:String,
   data:{type:Date,default:Date.now},
   cateId:mongoose.Schema.ObjectId
    
});
schema.plugin(mongoosePaginate);

module.exports=mongoose.model('Upload',  schema); // Model.paginate()