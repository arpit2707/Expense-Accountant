const Sequelize = require('sequelize');

const sequelize = new Sequelize('allexpenses','root','Arpit@723',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;