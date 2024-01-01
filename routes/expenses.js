const express=require('express');
const router=express.Router();
const Expense=require('../models/expenses');


// get all expenses
router.get('/',async(req,res)=>{
    try{
        const expense=await Expense.find({createBy:req.user._id});
    res.status(200).json({expense});
    }
    catch(error){
        res.status(500).json(error);
    }
});

// create a new expense
router.post('/',async(req,res)=>{
    try{
        let expense=new Expense({
        name:req.body.name,
        amount:req.body.amount,
        createBy:req.user._id
    });
    
    expense=await expense.save();
    res.status(201).send("Expense Added");
}
catch(error){
    res.status(500).send("Error while creating expense! ",error);
}
});

module.exports=router;