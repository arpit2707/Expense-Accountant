const jwt = require('jsonwebtoken');
const User =  require('../model/user');

const authenticate = async(req,res,next) => {
    console.log("add hone ke liye authorization");
    console.log(req.header('authorization'));
    console.log("Auth ::::::::"+req.header('Authorization'));
    try{
        const token = req.header('Authorization');
       
        const userP = jwt.verify(token, 'secretKey');
        console.log("USER ID >>>>>"+userP.userId);
        const user = await User.findByPk(userP.userId);
        console.log(JSON.stringify(user));
        req.user=user;
        console.log(req.user.id)
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false,message:"User is not Authorized"})
    }
}

module.exports = {authenticate};