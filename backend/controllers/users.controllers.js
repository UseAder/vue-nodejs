
var mongoose = require('mongoose');
var Users=require('../models/users.models')
var Comment=require('../models/comment.models')
var async=require('async')


exports.create=function(req,res,next){
    const users = new Users(req.body);
    users.save(function(err,data){
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
    Users.findByIdAndUpdate(id,{$set:req.body},{new:false})
    .then(data=>{res.json(data)})   
//   users.save().then(() => console.log('meow'));
}
 
//删除
exports.remove=function(req,res,next){
    const id =req.params.id
   
    Users.findByIdAndRemove(id,function(err,data){
        res.json({'message':"delete ok"})
    })
}

//批量删除
    exports.removes=function(req,res,next){
// console.log(111);

    var ids =req.body.ids;
    if (ids.length>0) {
        console.log(1);
        
    Users.remove({_id: {$in: ids }})
    .then(data=>{
    res.json({'message':"选中删除ok"})
    })
    }
   }
    

exports.list=function(req,res,next){
    var page=(req.body.page)?req.body.page:1;//页
    var limit=(req.body.limit)?req.body.limit:3;//页
   
    var queryCondition={}
    if(req.body.name&&req.body.name.trim().length>0){
        name=req.body.name;
        queryCondition={
            "name":new RegExp(name,"i")//正则匹配
        }
    }
    Users.paginate(queryCondition,{page:page,limit:limit},function(err,results){
        // res.json(data)
        // for(let i=0;i<res.docs.length;i++){
        //     Comment.count({userId:res.docs[i]._id}).then(data=>{
        //         // console.log(data);
        //         res.docs[i].commentCount=data
        //         // console.log( res.docs[i]);
        //     })
        // }

            async.map(results.docs, function(user, callback) {
                Comment.count({userId:user._id}).then(data=>{
                    user.commentCount=data;
                    callback(null,user)
            });

        },function(err){
            res.json(results)  
    })
    })

    }
// exports.login=function(req,res,next){
//     var name=req.body.name;
//     var password=red.body.password;
//     Users.findOne({name:name,password:password}).then(res=>{
//         if (res) {
//            res.json(res) 
//         } else {
//             res.json({'message':'用户名和密码错误'})
//         }
//     })
// }