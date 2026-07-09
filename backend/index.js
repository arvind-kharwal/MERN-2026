const express = require('express')
const app = express();
const port = 3003;

app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.send('<h2 style=color:red> Welcome to Express Server</h2>')
})


app.listen(port,()=>{
    console.log("Server is running on port: "+port);
})