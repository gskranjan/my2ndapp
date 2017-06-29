const MongoClient=require('mongodb').MongoClient;
const objectid=require('mongodb').ObjectId;



MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
    
    
    if(err){
        return console.log('unable to connect ');
    }
    console.log('connected to mongo db');
    
    
   // db.collection('todos').insertOne({
     //   text:'something to do',
       // completed:false
//    },(err,result)=>{
  //      if(err){
    //        return console.log('failed');
      //  }
//        console.log(JSON.stringify(result.ops,undefined,2));
  //  });
    
  /*  db.collection('users').insertOne({
        name:'ranjan',
        age:18
    },(err,result)=>{
        if(err){
            return console.log('fail');
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    
    
    db.collection('users').insertOne({
        _id:123,
        name:'ranjan',
        age:18
    },(err,res)=>{
        if(err){
            return console.log(err);
        }
        
        console.log(res.ops[0]._id);
        
    })*/
    
    db.close();
   
    
});