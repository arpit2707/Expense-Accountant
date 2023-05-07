const express = require('express');
const route = express.Router();

const authenticatemiddleware = require('../middleware/auth');

const purchaseC = require('../controller/purchaseC');


route.get('/premiummembership',authenticatemiddleware.authenticate,purchaseC.purchasePremium);
route.post('/updatetransactionstatus',authenticatemiddleware.authenticate,purchaseC.updateTransactionStatus);
route.post('/failedtransactionstatus',authenticatemiddleware.authenticate,purchaseC.failedTransactionStatus);
route.get('/showLeaderboard',authenticatemiddleware.authenticate,purchaseC.showLeaderboard);


module.exports=route;