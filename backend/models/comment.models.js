var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ /* schema definition */ 
   title:String,
   content:String,
   data:{type:Date,default:Date.now},
   userId:mongoose.Schema.ObjectId
    
});
schema.plugin(mongoosePaginate);

module.exports=mongoose.model('Comment',  schema); // Model.paginate()