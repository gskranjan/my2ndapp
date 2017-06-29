const MongoClient=require('mongodb').MongoClient;
const objectid=require('mongodb').ObjectId;



MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
    
    
    if(err){
        return console.log('unable to connect ');
    }
    console.log('connected to mongo db');

//    db.collection('users').deleteMany({name:'ranjan'}).then((result)=>{
  //      console.log(result);
//    })
  
   // db.collection('users').findOneAndDelete({_id:new objectid("59537138cf555d23c85e8c1d")}).then((result)=>{
     //   console.log(result);
//    })
    
db.collection('todos').findOneAndUpdate({_id:new objectid('59535b07777b0010748f42af')},{
    $set:{
        text:'dhinchak',
        age:12
    }
},{returnOriginal:false}).then((result)=>{
    console.log(result)
});
 db.collection('todos').findOneAndUpdate({_id:new objectid('59535b07777b0010748f42af')},{
    $inc:{
        
        age:+12
    }
},{returnOriginal:false}).then((result)=>{
    console.log(result)
});
 
});