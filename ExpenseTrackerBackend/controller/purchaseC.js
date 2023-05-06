const Razorpay = require('razorpay');
const Order = require('../model/order');

console.log("Yahi Key Id Hai");
console.log(process.env.RAZORPAY_KEY_ID);
exports.purchasePremium = async (req,res) =>{
    try {
        console.log(`Yahan tk aaya`);
        const key_id='rzp_test_3DbxZpPctPYG8d';
        const key_secret='t2MbMB8EE2e34UxMABEH9tdt';
        var rzp = new Razorpay({key_id,key_secret})
        const amount = 2500;
        //Start creating order on Razorpay
        rzp.orders.create({amount, currency:"INR"},(err,order)=>{
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            //Order created successfully and here we are saving it in the db using magic function
            req.user.createOrder({orderid:order.id, status: 'PENDING'}).then(()=>{  
  
                return res.status(201).json({orderid:order.id,key_id:rzp.key_id});
            }).catch(err =>{
                throw new Error(err);
            })
        })
    } catch (err) {
        
        res.status(403).json({message:'something went wrong from purchase', error:err});
    }
}


exports.updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
    
        const order = await Order.findOne({ where: { orderid: order_id } });

        await order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
    
        const userUpdatePromise = req.user.update({ ispremiumuser: true });
        console.log(userUpdatePromise);
        await Promise.all([userUpdatePromise]);
        return res.status(202).json({ success: true, message: 'Transaction successful' });
    } catch (err) {
        res.status(403).json({ success: false, message: 'Transaction failed' });
    }
    };

    exports.failedTransactionStatus = async (req, res) => {
        try {
            const { payment_id, order_id } = req.body;
        
            const order = await Order.findOne({ where: { orderid: order_id } });
    
            await order.update({ paymentid: payment_id, status: 'FAILED' });
        
            const userUpdatePromise = req.user.update({ ispremiumuser: null });
            console.log(userUpdatePromise);
            await Promise.all([userUpdatePromise]);
            return res.status(202).json({ success: true, message: 'Transaction FAILED' });
        } catch (err) {
            return res.status(403).json({ success: false, message: 'UPDATION failed' });
        }
        };
    