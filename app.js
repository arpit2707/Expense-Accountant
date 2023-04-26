const express = require('express');
const sequelize = require('./ExpenseTrackerBackend/util/db');
const User = require('./ExpenseTrackerBackend/model/user');
const bodyParser = require('body-parser');
const indexes =  require('./ExpenseTrackerBackend/route/user');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/',indexes);

sequelize.sync().then(result=>{
    return User.findByPk(1);
}).then(user=>{

    if(!user){
        return User.create({name:'Max', email:'test@gmail.com' , password:'arpit123'});
    }
    return user;
})
.catch(err=>{

    console.log(err);

});

app.listen(3000);

// signInFormButton.addEventListener('click',async (event)=>{
//     try
//     {      
//         event.preventDefault(); 
//         const email = document.getElementById("emailInput").value;
//         const password = document.getElementById("passwordInput").value;

//         const userDetails = {
//             email:email,
//             password:password
//         }
//         const response = await axios.post('https://crudcrud.com/api/ace696f2fa4049578962d2a565346c46/myUser',userDetails);
//         console.log(response);
//         if(response.status === 201){
//             container.classList.remove("right-panel-active");
//         }else{
//             throw new Error('Failed To Login')
//         }
//     }catch(error){
//         document.body.innerHTML += `<div style="color:red;">${error} </div>`
//     }
// })
