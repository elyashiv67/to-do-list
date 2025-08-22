const express = require('express');
const app = express();
const port = 4365 ;



let nextId = 1;
const tasks = [{id:0,name:"task 1"}];

app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get("/arr",(req,res)=>{
res.json(tasks);
});

app.post("/add",(req,res)=>{
let id = nextId;
let name = req.body.name;
let obj = {id,name};
tasks.push(obj);
console.log(obj);
nextId++;
res.json({message:"ok"});

});




app.listen(port,()=>{console.log(`http://localhost:${port}`);})