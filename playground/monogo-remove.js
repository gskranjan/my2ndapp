
var objectid=require('mongodb').ObjectId;
var m=require('./../server/mongoose.js');
var mongoose=m.mongoose;
var t=require('./../server/modules/todo.js');
var todo=t.todo;
var u=require('./../server/modules/user.js');
var user=u.user;

todo.remove({}).then((result)=>{
    console.log(result);
})
