const express = require('express');
const UserC = require('../controller/userC');
const route = express.Router();

route.get('/',UserC.getIndex);
route.post('/index-signup',UserC.addUser);

//route.post('/login',UserC.postUser);

module.exports = route;