const mongoose=require('mongoose');

const expenseSchema= new mongoose.Schema({

    name:{
        type:String
    },
    amount:{
        type:String
    },
    createBy:{
        type:String
    }
   
});

const Expense=mongoose.model('expense',expenseSchema);

module.exports=Expense;