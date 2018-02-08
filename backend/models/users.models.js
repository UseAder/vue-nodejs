var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ /* schema definition */ 
    date:{type:Date,default:Date.now},
    name:String,
    password:String,
    mail:String,
    commentCount:Number
    
});
schema.plugin(mongoosePaginate);

module.exports=mongoose.model('Users',  schema); // Model.paginate()