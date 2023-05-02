const express = require("express");

const {UserModel} = require("../models/user.model");

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.post("/register",(req,res)=>{
    const {password} = req.body;
   
    bcrypt.hash(password, 5, async(err, hash)=>{
        try {
            const newUser = new UserModel({...req.body,password:hash});
            await newUser.save();
            res.status(200).send({msg:"New user has been registered"}).json();
        } catch (error) {
            res.status(400).send({err:error}).json();
        }      
    })  
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email:email});
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({userID:user._id,userName:user.name}, "masai");
                res.status(200).send({msg:"Login Successfull",token:token}).json();
            }else{
                res.status(400).send({err:"Wrong Credentials"}).json();
            }
        });
    } catch (error) {
        res.status(400).send({err:"Wrong Credentials"}).json();
    }
})

module.exports = {userRouter};