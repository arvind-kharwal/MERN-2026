import express from "express";
import { m1 } from "./middleware/agemiddleware.js";
const app = express();
const port = 3005;
// app.use(m1);
app.use(m1);
app.get("/msg",(req,res)=>{
    res.send("Welcome User");
})

app.get("/msg1",(req,res)=>{
    res.send("Hi User");
})

app.get("/msg2",m1,(req,res)=>{
    res.send("Hello User");
})

app.listen(port,()=>{
    console.log(`Server is running on,${port}`);
})