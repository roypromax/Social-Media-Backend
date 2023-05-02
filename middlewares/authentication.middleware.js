const jwt = require('jsonwebtoken');


const authentication = (req,res,next)=>{

    const token = req.headers?.authorization?.split(" ")[1];

    jwt.verify(token, 'masai', (err, decoded)=>{
        if(decoded){
            req.body.userName = decoded.userName;
            req.body.userID = decoded.userID;
            next()
        }else{
            res.status(400).send({err:"Please login first"}).json();
        }
      });
}


module.exports = {authentication};