var mongoose = require('mongoose');
var News=require('../models/news.models')
exports.create=function(req,res,next){
    const news = new News(req.body);
    news.save(function(err,data){
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
        News.findByIdAndUpdate(id,{$set:req.body},{new:false})
    .then(data=>{res.json(data)})   
//   users.save().then(() => console.log('meow'));
}
 
//删除
exports.remove=function(req,res,next){
    const id =req.params.id
   
    News.findByIdAndRemove(id,function(err,data){
        res.json({'message':"delete ok"})
    })
}


exports.list=function(req,res,next){
    var page=(req.body.page)?req.body.page:1;//页
    var limit=(req.body.limit)?req.body.limit:3;//页
   
    var queryCondition={}
    //根据cateId进行新闻的获取
    if(req.body.cateId&&req.body.cateId.trim().length>0){
        cateId=req.body.cateId;
        queryCondition={
            cateId:cateId
        }
    }
    //根据名称进行模糊搜索
    if(req.body.name&&req.body.name.trim().length>0){
        name=req.body.name;
        //Objec.assign是对象合并
        //通过Object.assign进行了一次对象合并 我将之前的queryCondition合并到后面的正则表达式里
        queryCondition=Object.assign(queryCondition,{
                "title":new RegExp(name,"i")//正则匹配
            })
        // queryCondition={
        //     "name":new RegExp(name,"i")//正则匹配
        // }
    }
    News.paginate(queryCondition,{page:page,limit:limit},function(err,data){
        res.json(data)
    })
}