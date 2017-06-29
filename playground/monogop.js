var MongoClient=require('mongodb').MongoClient;
var obj=require('mongodb').ObjectId;

MongoClient.connect('',(err,db)=>{
    if(err){
        return console.log(err);
    }
    
    db.collection('sadjj').insertOne({},(err,result)=>{
        if(err){
        return    console.log(err);
        }
        
        
    })
})