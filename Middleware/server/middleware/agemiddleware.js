import express from "express";
export const m1 = (req,res,next)=>{  // named export
    const age = req.query.age;
    console.log('Age',age);
    if(age>18){
        next();
    }
    return res.status(401).json({message:"Not authorized"})
}