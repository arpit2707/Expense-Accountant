const path = require('path');
const expenseT = require('../model/expenseT');
let expenseHtmlFile = path.join(__dirname,'../../ExpenseTrackerFrontEnd/view/expenses/expenseForm.html');

exports.profile =(req, res, next) => {
    try {

      res.status(200).sendFile(expenseHtmlFile);

    } catch (error) {

      return res.status(500).json({ success: false, message: 'Internal server error'});

    }
  };

exports.addExpense=async (req,res,next)=>{
  try {

    const {amount , description ,category} = req.body;

   if(amount == undefined || amount === 0){
    return res.status(400).json({success:false});
   }

    const response  = await expenseT.create({amount , description ,category});
    console.log(response);
    return res.status(201).json({response, success:true });

  } catch(err){
    return res.status(403).json({success:false , error:err});
  }  
}

exports.getExpense = async(req,res,next)=>{
  try {
    const expenses  =  await expenseT.findAll();
      return res.status(200).json({expenses,success:true});
  } catch(error){
    return res.status(500).json({error:err,success:false});
  }
}


exports.deleteExpense=async(req,res,next)=>{
  try {
   const id=req.params.expenseId;
   
   if(id==undefined || id.length === 0){
    return res.status(400).json({success:false});
   }
   
   await expenseT.destroy({where :{id:id}})
   
  } catch (err) {
    return res.status(500).json({error:err,success:false});
  }
}