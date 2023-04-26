const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Expenses = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING
})

module.exports = Expenses;