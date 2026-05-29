require("dotenv").config();
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const authroute=require("./routes/authRoutes");

app.use(express.json());
app.use("/api/auth/",authroute);
//mongo connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to Mongodb"))
.catch((err)=>console.log(err));


//server creation
app.listen(process.env.PORT,()=>{
    console.log("Server running on port 3000");
});