const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


var password='123abc';


bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    });
});
/*
var data={
    id:4
};

var token=jwt.sign(data,'adeda');
console.log(token);

var decoded=jwt.verify(token,'adeda');
console.log(decoded);

var message='yaya';
var hash =SHA256(message).toString();

var data={
    id:4
};

var token={
    data:data,
    hash:SHA256(JSON.stringify(data)+'adeda').toString()
}

var verify=SHA256(JSON.stringify(token.data)+'adeda').toString();


if(verify==token.hash){
    console.log('yo!');
}
else{
    console.log('fuck off');
}*/

