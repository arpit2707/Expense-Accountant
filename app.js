const express = require('express');
const sequelize = require('./ExpenseTrackerBackend/util/db');
const User = require('./ExpenseTrackerBackend/model/user');
const bodyParser = require('body-parser');
const indexes =  require('./ExpenseTrackerBackend/route/user');
const expenses = require('./ExpenseTrackerBackend/route/expenseR');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'ExpenseTrackerFrontEnd','public'))); 

app.use(bodyParser.json());
app.use('/',indexes);
app.use('/expense',expenses);

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
