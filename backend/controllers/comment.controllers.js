var mongoose = require('mongoose');
var Comment=require('../models/comment.models')
exports.create=function(req,res,next){
    const comment = new Comment(req.body);
    comment.save(function(err,data){
        if (err) {
            console.log(err); 
        }else{
            res.json(data)
        }
        
       
    })
//   users.save().then(() => console.log('meow'));
}

//新增
exports.update=function(req,res,next){
    const id =req.params.id
    //从Users这个数据模型中找ID的对象对它进行更新操作
        //第二个参数表示表单是什么内容 就改为什么内容
        //第三个参数表示找不到就新增
        Comment.findByIdAndUpdate(id,{$set:req.body},{new:false})
    .then(data=>{res.json(data)})   
//   users.save().then(() => console.log('meow'));
}
 
//删除
exports.remove=function(req,res,next){
    const id =req.params.id
   
    Comment.findByIdAndRemove(id,function(err,data){
        res.json({'message':"delete ok"})
    })
}

//批量删除
    exports.removes=function(req,res,next){
// console.log(111);

    var ids =req.body.ids;
    if (ids.length>0) {
        console.log(1);
        
        Comment.remove({_id: {$in: ids }})
    .then(data=>{
    res.json({'message':"选中删除ok"})
    })
    }
   }
    

exports.list=function(req,res,next){
    var page=(req.body.page)?req.body.page:1;//页
    var limit=(req.body.limit)?req.body.limit:3;//页
   
    var queryCondition={}
    if(req.params.id&&req.params.id.trim().length>0){//因为参数是前端url传过来的所以使用req.params
        queryCondition={
            "userId":req.params.id//正则匹配
        }
    }
    Comment.paginate(queryCondition,{page:page,limit:limit},function(err,data){
        res.json(data)
    })
}