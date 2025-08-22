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
        let isDone = false;
        let task = {id,name,description,isDone};
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

app.get("/get/:id",(req,res)=>{
    let id = req.params.id;
    if(tasks[id] == null || id >= tasks.length){
        return res.json({message:"id is not valid"});
    }
    res.json(tasks[id]);
});

app.patch("/update",(req,res)=>{
    let id = req.body.id;
    if(tasks[id] == null || id >= tasks.length){
        return res.json({message:"id is not valid"});
    }
    //פה אני בעצם מקבל מהצד לקוח משתנה בוליאני ועל פיו אני משנה והוא 
    // יכול להיות לא מוגדר רק אם הוא לא שלח לי כלום ולכן אני לא יעשה כלום
    let isDone = req.body.isDone;
    if(isDone != undefined){
        tasks[id].isDone = isDone;
    }
    let name = req.body.name;
    if(name){
        tasks[id].name = name;
    }
    let description = req.body.description;
    if(description){
        tasks[id].description = description;
    }
    res.json({message:`item ${id} updated`});
});





app.listen(port,()=>{console.log(`http://localhost:${port}`);})