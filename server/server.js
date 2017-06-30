var _=require('lodash');
var express=require('express');
var bodyParser=require('body-parser');


var m=require('./mongoose.js');
var mongoose=m.mongoose;
var t=require('./modules/todo.js');
var todo=t.todo;
var u=require('./modules/user.js');
var User=u.User;
var objectid=require('mongodb').ObjectId;

var app=express();



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
    todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!objectid.isValid(id)){
       return res.status(404).send({});
    }
    
    todo.findById(id).then((todo)=>{
        if(!todo){
           return res.status(404).send({});
        }
        res.send({todo});
        
    },(e)=>{
        return res.status(400).send({});
    })
})

app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!objectid.isValid(id)){
        return res.status(404).send({});
    }
    
    todo.findByIdAndRemove(id).then((result)=>{
        if(!result){
            return res.status(404);
        }
    res.send({todo:result});
        
        
    },(e)=>{
        res.status(400).send(e);
    });
})

app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['test','completed']);
    if(!objectid.isValid(id)){
       
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt=new Date().getTime();
    }
    else{
        body.completed=false;
        body.completedAt=null;
    }

    todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
          
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
    
});

/*
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.methods.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});
*/


app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
    
    user.save().then((user)=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
    
});


app.listen(3000,()=>{
    console.log('server is on');
});


module.exports.app=app;