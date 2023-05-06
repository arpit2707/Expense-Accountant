const express = require('express');
const sequelize = require('./ExpenseTrackerBackend/util/db');
const User = require('./ExpenseTrackerBackend/model/user');
const Expense = require('./ExpenseTrackerBackend/model/expenseT');
const Order = require('./ExpenseTrackerBackend/model/order');
const bodyParser = require('body-parser');
const indexes =  require('./ExpenseTrackerBackend/route/user');
const expenses = require('./ExpenseTrackerBackend/route/expenseR');
const purchase = require('./ExpenseTrackerBackend/route/purchase');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname,'ExpenseTrackerFrontEnd','public'))); 
app.use(cors());
Expense.belongsTo(User,{foreignKey:'userId'});
User.hasMany(Expense,{foreignKey:'userId'});

Order.belongsTo(User);
User.hasMany(Order);
app.use(bodyParser.json());
app.use('/',indexes);
app.use('/expense',expenses);
app.use('/purchase',purchase);

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
