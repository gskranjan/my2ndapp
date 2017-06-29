
var objectid=require('mongodb').ObjectId;
var m=require('./../server/mongoose.js');
var mongoose=m.mongoose;
var t=require('./../server/modules/todo.js');
var todo=t.todo;
var u=require('./../server/modules/user.js');
var user=u.user;

var id='5953e8e20986a72eb89e6dc3';

//todo.find({_id:id}).then((res)=>{
  //  console.log(res);
//})

//if(!objectid.isValid(id)){
  //  return console.log('not valid');
//}

/*todo.findById(id).then((res)=>{
  
    if(!res){
        return console.log('sorry');
    }
    console.log(res);
    
}).catch((e)=>{
    return console.log(e);
})*/

user.findById(id).then((res)=>{
    if(!res){
        console.log('usernot found');
    }
    
    console.log(res);
    
}).catch((e)=>{
    console.log(e);
})