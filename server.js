const express = require('express');
const app = express();
const port = 4365 ;


const tasks = [{id:1,name:"task 1"}];

app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get("/arr",(req,res)=>{
res.json(tasks);
});




app.listen(port,()=>{console.log(`http://localhost:${port}`);})