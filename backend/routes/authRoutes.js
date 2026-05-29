const express=require("express");
const User = require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const router = express.Router();

//signup route
router.post("/signup",async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                message:"User already exists please login"
            });
        }

        //hash the password
        const hashedpass=await bcrypt.hash(password,10);
        //save user
        const newuser=await User.create({
            name,
            email,
            password:hashedpass
        });
        res.status(201).json({
            message:"User created successfully",
            newuser
        });
    }
    catch(err)
    {
        return res.status(500).json({
            error:err.message
        });
    }
})


//login route
router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                message:"User not found"
            });
        }
        //compare password
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch)
        {
            return res.status(400).json({
                message:"Invalid password!"
            });
        }

        //token generation
        const token=jwt.sign({
            id:user._id,
            email:user.email
        },
     process.env.JWT_SECRET
    );
    res.json({
        message:"Login successfull",
        token
    });
    }
    catch(err)
    {
            res.status(500).json({
            error:err.message
        });
    }
});

module.exports = router;