const express = require('express');
const app = express();
const port = 4365 ;

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});




app.listen(port,()=>{console.log(`http://localhost:${port}`);})