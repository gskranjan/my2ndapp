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
  
    db.collection('users').findOneAndDelete({_id:new objectid("59537138cf555d23c85e8c1d")}).then((result)=>{
        console.log(result);
    })
    

 
});