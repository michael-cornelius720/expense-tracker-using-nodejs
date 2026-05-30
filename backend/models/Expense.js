const mongoose=require("mongoose");

const expschema=mongoose.Schema({
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    }

});

const Expense=mongoose.model("Expense",expschema);
module.exports=Expense;


