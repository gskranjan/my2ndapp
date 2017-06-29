var m=require('./mongoose.js');
var mongoose=m.mongoose;
var express=require('express');
var bodyParser=require('body-parser');

 var app=express();


var pop=mongoose.model('Papa',{
    text:{
    type:String,
    minlength:1
}
});


app.use(bodyParser.json());

app.post('/yay',(req,res)=>{
    var n=new pop({
        text:req.body.paa
    })
    
    
    n.save().then((rest)=>{
        res.send(rest);
    });
    
});

app.get('/yay',(req,res)=>{
    pop.find().then((resu)=>{
        res.send(resu);
    });
});
         
         app.listen(3000);