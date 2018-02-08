var mongoose = require('mongoose');
var Cat=require('../models/cat.models')
exports.create=function(req,res,next){
    const cat = new Cat(req.body);
    cat.save(function(err,data){
        if (err) {
            console.log(err); 
        }else{
            res.json(data)
        }
        
       
    })
//   users.save().then(() => console.log('meow'));
}

//更新
exports.update=function(req,res,next){
    const id =req.params.id
    //从Users这个数据模型中找ID的对象对它进行更新操作
        //第二个参数表示表单是什么内容 就改为什么内容
        //第三个参数表示找不到就新增
    Cat.findByIdAndUpdate(id,{$set:req.body},{new:false})
    .then(data=>{res.json(data)})   
}
 
//删除
exports.remove=function(req,res,next){
    //因为有分支，我们的删除不能喝users一样直接删除
    var id=req.params.id;
    var ids=[];
    Cat.findOne({_id:id},function(err,doc){
        if (doc) { 
            ids=[doc._id]   //因为当前找到的对象也需要删除       
            doc.getChildren(function(err, docs){//找到所有子节点
                for(let i=0;i<docs.length;i++){
                    ids.push(docs[i]._id)//
                }
                console.log(doc);
                Cat.remove({_id:{$in:ids}})//集合的删除方法
                .then(deed=>{
                    res.json({'message':'deleted ok'})
                })
            });
        }
    })
}
function reverseTree(data,pid){
    var result=[],
    temp;
    //原来传递进来的data是数据模型的对象,我们需要将它
        //先转成字符串，在转成Object对象 让它变成js的对象
        //因为原来的对象不能再其内添加属性，而在js对象可以
    var data=JSON.parse(JSON.stringify(data));
    for (const i in data) {
        if (data[i].parentId===pid) {
            result.push(data[i]);
            temp=reverseTree(data,data[i]._id);
            if(temp.length>0){
                data[i].children=temp
            }
        }
    }
    return result;
}

exports.list=function(req,res,next){
    //列表我们不能向usersy一样，我们需要知道children
Cat.find({},function(err,data){
    var rpTree=reverseTree(data,null);
    res.json(rpTree)
    // console.log(data);  
})
}


exports.listtype=function(req,res,next){//
    var type=req.params.type ||0;
    //列表我们不能向usersy一样，我们需要知道children
Cat.find({type:type},function(err,data){
    var rpTree=reverseTree(data,null);
    res.json(rpTree)
    // console.log(data);  
})
}