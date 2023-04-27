const path = require('path');
const userList = require('../model/user');
const fs = require('fs');
let indexHtmlFile = path.join(__dirname,'../../ExpenseTrackerFrontEnd/view/index.html');

exports.getIndex=(req,res,next)=>{
    res.sendFile(indexHtmlFile);
}

exports.addUser=(req,res,next)=>{
    userList.create({
        name:req.body.userName,
        email:req.body.userEmail,
        password:req.body.userPassword
    }).then(user=>{
        res.sendFile(indexHtmlFile);
    })
    .catch(errors=>{
        fs.readFile(indexHtmlFile,'utf-8',(err ,data)=>{
            if (err) {
                // handle the error
                res.status(500).send('Error reading index.html');
              } else {

                const modifiedData = `${data}\n<p class="error">${errors}</p>`;
                res.send(modifiedData);
              }
        })
    })
}

exports.loggedIn = (req,res,next)=>{
    console.log("entered");
    userList.findOne({where: {email:req.body.email}})
    .then(result=>{
        if(result.password===req.body.password){
            fs.readFile(indexHtmlFile,'utf-8',(err,data)=>{
                if(err){
                    res.status(500).send("Error reading index.html");
                }else{
                    const modifiedData =`<script> alert('User Logged In Successfully')</script> ${data}`;
                    res.send(modifiedData);
                }
            })  
        }else{
            fs.readFile(indexHtmlFile,'utf-8',(err,data)=>{
                if(err){
                    res.status(500).send("Error reading index.html");
                }else{
            const modifiedData = `${data}\n<p>"Error : User not authorized"</p>`;
                res.status(401);
                res.send(modifiedData);
            }
        })
        }
    }).catch(errors=>{
        fs.readFile(indexHtmlFile,'utf-8',(err,data)=>{
            if(err){
                res.status(500).send("Error reading index.html");
            }else{
                const modifiedData = `${data}\n<p class="error">${errors}</p>`;
                res.send(modifiedData);
            }
        })
    })
}
