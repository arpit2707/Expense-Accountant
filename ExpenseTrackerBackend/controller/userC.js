const path = require('path');
const userList = require('../model/user');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
let indexHtmlFile = path.join(__dirname,'../../ExpenseTrackerFrontEnd/view/index.html');
let expenseForm = path.join(__dirname,'../../ExpenseTrackerFrontEnd/view/expenses/expenseForm.html');

function isstringinvalid(string){

    if(string == undefined || string.length === 0){
        return true;
    }else{
        return false;
    }
}

function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id , userName:name, premium:ispremiumuser},'secretKey');
}

exports.getIndex=(req,res,next)=>{
    res.sendFile(indexHtmlFile);
}

exports.addUser=async (req,res,next)=>{
    try{
        const {name, email , password} = req.body;

        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({err:"Bad Paramters . Something is missing"})
        }
        const saltrounds =10;

        bcrypt.hash(password,saltrounds,async(err,hash)=>{

        console.log(err);
        await userList.create({name, email, password:hash});
        res.status(201).json({message:"successfully created new user"});

    })
    }catch(errors){
        res.status(500).json(errors);
    }
}

exports.loggedIn = async (req,res,next)=>{
    try{
        const {email , password} = req.body;

        if(isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({err:"Bad Paramters . Something is missing"});
        } 
    const user =await userList.findAll({where: {email}});
    if(user.length>0){
                bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    console.log("entred password is same no error");
                    //console.log(generateAccessToken(user[0].id,user[0].name));
                        res.status(200).json({success:true,message:"User logged in successfully",token:generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)});
                }else {
                        console.log("password is worng");
                    return res.status(400).json({success:false,message:"Password is incorrect"});
                    }
                    })
            }else{
                    return res.status(404).json({success:false, message:"User doesn't exist"});
            }
    }catch(err){
       return res.status(500).json({message:err,success:false});
    }
}
