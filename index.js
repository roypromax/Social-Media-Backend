const express = require("express");

const app = express();

app.use(express.json());

const {connection} = require("./configs/db");

require("dotenv").config();

const {userRouter} = require("./routes/user.route");

const {postRouter} = require("./routes/post.route");

const {authentication} = require("./middlewares/authentication.middleware");


app.get("/",(req,res)=>{
    res.status(200).send("Social Media App");
})

app.use("/users",userRouter);

app.use(authentication);

app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error in connecting to Database");
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.port}` );
})
