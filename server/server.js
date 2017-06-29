
var express=require('express');
var bodyParser=require('body-parser');


var m=require('./mongoose.js');
var mongoose=m.mongoose;
var t=require('./modules/todo.js');
var todo=t.todo;
var u=require('./modules/user.js');
var user=u.user;
var objectid=require('mongodb').ObjectId;

var app=express();

const port=process.env.port||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var r=new todo({
        text:req.body.yay
    });
    r.save().then((rep)=>{
    res.send(rep);
},(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',(req,res)=>{
    todo.find().then((results)=>{
        res.send({results});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!objectid.isValid(id)){
       return res.status(404).send({});
    }
    
    todo.findById(id).then((todos)=>{
        if(!todos){
           return res.status(404).send({});
        }
        res.send({"todos":todos});
        
    },(e)=>{
        return res.status(400).send({});
    })
})


app.listen(port,()=>{
    console.log('server is on');
})


module.exports.app=app;