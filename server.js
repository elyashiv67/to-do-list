const express = require('express');
const app = express();
const port = 4365 ;



let nextId = 1;
const tasks = [];

app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get("/arr",(req,res)=>{
res.json(tasks);
});

app.post("/add",(req,res)=>{
    let name = req.body.name;
    if(!name){
       return res.json({message:"please enter a valid text"});
    }
        
        let id = nextId++;
        let description = req.body.description;
        let task = {id,name,description};
        tasks[id] = task;
        //במערך הזה INDEX תמיד יהיה  ID פה אני בעצם מוודא שה 
        //וככה בעתיד יהיה לי יותר קל למצוא משימה מאשר כל פעם לרוץ על כל המערך
        //זו הדרך המקצועית
        console.log(task);
        res.json({message:"ok the task has added"});
    

});

app.delete("/delete",(req,res)=>{
    let currentId = req.body.id;
    if(tasks[currentId] == null || currentId >= tasks.length){
        return res.json({message:"id is not valid"});
    }
tasks[currentId] = null;
res.json({message:"this item deleted"});
});




app.listen(port,()=>{console.log(`http://localhost:${port}`);})