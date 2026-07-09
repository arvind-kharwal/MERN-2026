const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;
app.use(cors());
app.use(express.json());

// testing whether server is running or not
app.get("/",(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.send('<h2 style=color:red>Welcome to Express Server</h2>')
})

// app.get("/", (req, res) => {
//     res.type('html');
//     res.send('<h2 style="color:red">huyuyuyu</h2>');
// });


app.post("/register",(req,res)=>{
    res.setHeader('Content-Type','application/json');
    const {name,email,password} = req.body;
    console.log(name+email+password);
    res.send({"msg":name});
})



app.listen(port,()=>{
    console.log("Server is running on port: "+port);
})