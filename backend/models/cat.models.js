var mongoose = require('mongoose'); 
materializedPlugin = require('mongoose-materialized');
Schema = mongoose.Schema;
var CatSchema = new Schema({
    type:{type:Number},//比如0表示新闻分类 产品分类 上传分类
title: {type: String}
});
CatSchema.plugin(materializedPlugin);
module.exports= mongoose.model('Cat', CatSchema); // Category
