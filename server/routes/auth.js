const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");


//Sign Up APi
authRouter.post('/api/signup',async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exitingUser = await User.findOne({email:email});
    if(exitingUser){
      return res.status(400).json({msg : "User with same email already exits"});
    }

    const hashPassword = await bcryptjs.hash(password,8);
  
    let user = new User({
      name,
      email,
      password: hashPassword,
    })

    user = await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json ({error:error.message});
  }
});

//sign In
authRouter.post('/api/signin',async(req,res) => {
try {
  const {email,password} = req.body;
  const user = await User.findOne ({email});
  if(!user){
    return res.status(400).json({msg:"user with this email not found"});
  }
  const isMatch = bcryptjs.compare(password,user.password);
  if(!isMatch){
    return res.status(400).json({msg: "Incorrect password"})
  }
 const token = jwt.sign({id:user._id}, "passwordKey");
 res.json({token,...user._doc});
} catch (error) {
  res.status(500).json ({error:error.message});
}

});





module.exports = authRouter;
