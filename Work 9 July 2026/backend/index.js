import express from "express";
import { connectDB } from './database/db.js';
import cors from "cors";
import user from './model/user.js'
const app = express();
const port = 3003;
app.use(cors());
app.use(express.json());
connectDB();
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
    try{
        res.setHeader('Content-Type','application/json');
        const {name,email,password} = req.body;
        console.log(name+email+password);
        //res.send({"msg":name});
        const newuser=new user({name,email,password});
        newuser.save();
        res.send(msg,'successfulle registered!')
    }
    catch(e){
        res.send({msg:e});
    }
    
})



app.listen(port,()=>{
    console.log("Server is running on port: "+port);
})