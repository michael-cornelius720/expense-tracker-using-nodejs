const express=require("express");
const router=express.Router();
const Expense=require("../models/Expense");
const authMiddleware=require("../middleware/authMiddleware");

//create expenses

router.post("/",authMiddleware,async(req,res)=>{
 try{
    const {amount,category,description,date}=req.body;
    const expense=await Expense.create({
        amount,
        category,
        description,
        date,
        userid:req.user.id
    });
    res.status(201).json({
        message:"Expense added successfully",
        expense
    });
 }
 catch(err){
    res.status(500).json({
        error: err.message
    });
}
});

//find expenses

router.get("/",authMiddleware,async(req,res)=>{
    try{
        const expenses=await Expense.find({
            userid:req.user.id
        });
        res.status(201).json({
            messgae:"Expenses found",
            expenses
        });
    }
    catch(err)
    {
        res.status(500).json({
            error:err.message
        });
    }

});


router.get("/:id",authMiddleware,async(req,res)=>{
    try{
    const expense_id=req.params.id;
    const expense=await Expense.findById(expense_id);

    if(!expense)
    {
        res.status(404).json({
            message:"Expense does not exists"
        })
    }
    res.status(200).json({
    expense
});
}
    catch(err)
    {
            res.status(500).json({
            error:err.message
        });
    }
});


//update expenses

router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const expenseId = req.params.id;
        const { amount, category, description, date } = req.body;
    
        const updatedExpense = await Expense.findByIdAndUpdate(
    expenseId,
    {
        amount,
        category,
        description,
        date
    },
    { new: true }
);
if (!updatedExpense) {
    return res.status(404).json({
        message: "Expense not found"
    });
}
res.status(200).json({
    message: "Expense updated successfully",
    updatedExpense
});
    }
    catch(err){
    res.status(500).json({
        error: err.message
    });
}

});

//delete 
router.delete("/:id", authMiddleware, async(req,res)=>{
    try{
    const expenseId = req.params.id;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if(!deletedExpense)
    {
        return res.status(404).json({
                message: "Expense not found"
            });
    }

    res.status(200).json({
        message:"Expenses deleted successfully"
    });
}
catch(err)
{
    res.status(500).json({
        error: err.message
    });
}
    
});
module.exports=router;
