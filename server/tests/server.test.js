const expect=require('expect');
const request=require('supertest');
const a=require('./../server.js');
const app=a.app;
var t=require('./../modules/todo.js');
var todo=t.todo;



describe('POST/todos',()=>{
   
    it('shoudlnot create',(done)=>{
        request(app).post('/todos').send({text:' '}).expect(400).expect((res)=>{
            res.body
        })
    })
    
});