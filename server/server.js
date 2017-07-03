var _=require('lodash');
var express=require('express');
var bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');

var m=require('./mongoose.js');
var mongoose=m.mongoose;
var t=require('./modules/todo.js');
var todo=t.todo;
var u=require('./modules/user.js');
var User=u.User;
var objectid=require('mongodb').ObjectId;

var app=express();



app.use(bodyParser.json());

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

   
    
  User.findByToken(token).then((user) => {
      
        if (!user) {
    
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};


app.post('/todos',authenticate,(req,res)=>{
    
    
    var r=new todo({
        text:req.body.text,
       _creator:req.user._id
        
    });
    r.save().then((rep)=>{
    res.send(rep);
},(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',authenticate,(req,res)=>{
    todo.find({_creator:req.user._id}).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    if(!objectid.isValid(id)){
       return res.status(404).send({});
    }
    
    todo.findOne({_id:id,_creator:req.user._id}).then((todo)=>{
        if(!todo){
           return res.status(404).send({});
        }
        res.send({todo});
        
    },(e)=>{
        return res.status(400).send({});
    })
});

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    if(!objectid.isValid(id)){
        return res.status(404).send({});
    }
    
    todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((result)=>{
        if(!result){
            return res.status(404);
        }
    res.send({todo:result});
        
        
    },(e)=>{
        res.status(400).send(e);
    });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','completed']);
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

    todo.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
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



app.post('/users/login',(req,res)=>{
   
    var body=_.pick(req.body,['email','password']);
    
    
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);  
            
        })
    }).catch((e)=>{
        res.status(400).send();
    });  
    
    

     
    
    
});


app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {  
     
   res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


app.delete('/users/me/token',authenticate,(req,res)=>{
    
    
    req.user.removeToken(req.token).then(()=>{
        
        res.status(200).send();
    }).catch((e)=>{
        res.staus(400).send();
    });
    
    
})
app.listen(3000,()=>{
    console.log('server is on');
});


module.exports.app=app;




