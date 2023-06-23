const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


userRouter.post("/register", async (req, res)=>{
    try {
        let {password} = req.body;
        let hash = bcrypt.hashSync(password, 5)
        req.body.password = hash;
        let payload = new UserModel(req.body);
        await payload.save();
        res.json({msg: "register success"})
    } catch (error) {
        res.json({msg: error.message})
    }
})

userRouter.post("/login", async (req, res)=>{
    try {
        let {email, password} = req.body;

        let user = await UserModel.findOne({email});
        if(!user) return res.json({msg:"email not present"})

        let isValid = bcrypt.compareSync(password, user.password)
        if(!isValid) return res.json({msg: "wrong password"})

        let token = jwt.sign({email}, "secret")

        res.cookie("token", token,{ maxAge: 3600000, httpOnly:true })
        res.cookie( "isLoggedIn", true, {httpOnly:true}) 

        res.json({msg: "login success", isLoggedIn:true, username:user.name})
    } catch (error) {
        res.json({msg: error.message})
    }
})

userRouter.get("/logout", async (req, res)=>{
    try {
        console.log(req.cookies)
        res.clearCookie("isLoggedIn")
        res.json({msg: "logout success"})
    } catch (error) {
        res.json({msg: error.message})
    }
})

module.exports = {userRouter}