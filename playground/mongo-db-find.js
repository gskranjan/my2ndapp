const MongoClient=require('mongodb').MongoClient;
const objectid=require('mongodb').ObjectId;



MongoClient.connect('mongodb://localhost:27017/todoapp',(err,db)=>{
    
    
    if(err){
        return console.log('unable to connect ');
    }
    console.log('connected to mongo db');
    

  /*  db.collection('todos').find().count().then((count)=>{
        
        console.log(count);
    },(err)=>{
        console.log('failed');
    });*/
    
    //db.close();
   
   /* if(err){
        return console.log(err);
    }
    console.log('ón');
    db.collection('users').find({name:'ranjan'}).count().then((count)=>{
        console.log(count);
    },(err)=>{
        console.log(err);
    });
    */
    db.collection('todos').insertOne({
        text:'pop',
        completed:false
    },(err,result)=>{
if(err){
    return console.log(failed);
}
        console.log(result.ops);
        
    })
    
});