const express = require("express");

const {PostModel} = require("../models/post.model");

const postRouter = express.Router();

postRouter.post("/create",async(req,res)=>{
    try {
        const newPost = new PostModel(req.body);
        await newPost.save();
        res.status(200).send({msg:"New post has been created"}).json();
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

postRouter.get("/",async(req,res)=>{
    const {device} = req.query;

    const q = {};

    q.userID = req.body.userID;

    device?q.device = device:"";

    try {
        const posts = await PostModel.find(q);
        res.status(200).send(posts).json();
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const postID = req.params.postID;
    try {
        // console.log(postID)
        const post = await PostModel.findOne({_id:postID});
        // console.log(post)
        if(post.userID!==req.body.userID){
            res.status(400).send({msg:"You are not authorized to update this post"}).json();
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body);
            res.status(200).send({msg:`Post with id ${postID} has been updated`}).json();
        }
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const postID = req.params.postID;
    try {
        const post = await PostModel.findOne({_id:postID});
        if(post.userID!==req.body.userID){
            res.status(400).send({msg:"You are not authorized to delete this post"}).json();
        }else{
            await PostModel.findByIdAndDelete({_id:postID});
            res.status(200).send({msg:`Post with id ${postID} has been deleted`}).json();
        }
    } catch (error) {
        res.status(400).send({err:error}).json();
    }
})


module.exports = {postRouter};