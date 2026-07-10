import express from "express";
import { m1 } from "./middleware/agemiddleware.js";
const app = express();
const port = 3005;
app.use(m1);
app.get("/msg",(req,res)=>{
    res.send("Welcome User");
})

app.listen(port,()=>{
    console.log(`Server is running on,${port}`);
})