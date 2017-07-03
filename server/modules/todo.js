var mongoose=require('mongoose');

var todo=mongoose.model('Todo',{
    text:{
      type:String , 
        required:true,
        trim:true,
        minlength:1
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creator:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    }
});
module.exports.todo=todo;