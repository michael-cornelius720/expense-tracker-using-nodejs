require("dotenv").config();
const mongoose=require("mongoose");
const cors = require("cors");
const express=require("express");
const app=express();
app.use(cors());
const authroute=require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");


app.use(express.json());

app.use("/api/auth/",authroute);
app.use("/api/expenses",expenseRoutes);
//routes
const authMiddleware = require("./middleware/authMiddleware");
//profile route
app.get("/profile", authMiddleware, (req, res) => {
    res.json(req.user);
});
//mongo connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to Mongodb"))
.catch((err)=>console.log(err));




//server creation
app.listen(process.env.PORT,()=>{
    console.log("Server running on port 3000");
});