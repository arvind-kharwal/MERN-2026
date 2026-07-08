import express from "express";
import User from "../models/User.js";

export const createUser= async(req,res)=>{
    try{
        const {name,email} = req.body;
        console.log("name:",name);
        const newUser={
            id:Date.now(),
            name,email
        }
        const user = new User(newUser);
        await user.save();
        res.status(201).json({message:"user created",user})
    }
    catch(err){
        console.log("Error:",err);
    }
}