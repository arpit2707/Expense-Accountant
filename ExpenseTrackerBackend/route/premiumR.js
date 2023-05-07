const express = require('express');
const route = express.Router();
const premiumC  = require('../controller/premiumC');
const authenticatemiddleware = require('../middleware/auth');

route.get('/showLeaderboard',authenticatemiddleware.authenticate,premiumC.showLeaderboard);

module.exports = route;