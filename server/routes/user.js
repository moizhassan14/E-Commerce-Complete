import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import verifyToken from "../middleware/verfiyToken.js";
import 'dotenv/config'

const router=express.Router();

router.delete('/:id',async(req,res)=>{
    await User.deleteOne({_id: req.params.id})
    res.status(200).send({status:200,message:"success"})
})

router.get('/',verifyToken,async(req,res)=>{
    const users=await getAllUsers();
    res.status(200).send({status:200,user:users})
})

const userSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20),
});

router.post('/',async(req,res)=>{
    try{
        const {email}=req.body;
        await userSchema.validateAsync(req.body);
        const password=await bcrypt.hash(req.body.password,10);
        const user=new User({...req.body,password});
        const newUser= await user.save()
        const token =jwt.sign({_id:newUser._id,email:newUser.email},process.env.JWT_SECRET,{
            expiresIn: '7d'
        })
        return res.status(200).send({status:200,message:"success",user:newUser,token})
    }catch(err){
        return res.status(400).send({status:400,message:err.message});
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email}).then(res=>res.toObject());;
        if(!user){
            return res.status(401).send({status:401,message:"user not found"})
        }
        const compare=await bcrypt.compare(password,user.password);
        if(!compare){
            return res.status(403).send({status:403,message:"incorrect password"})
        }
        console.log("compare-->",compare)
        delete user.password;
        const token =jwt.sign({_id:user._id,email:user.email},process.env.JWT_SECRET)
        return res.status(200).send({status:200,user,token,message:"success"})
    }catch(err){
        return res.status(400).send({status:400,message:err.message});
    }
})

const getAllUsers=async()=>{
    return await User.find({});
}

export default router;
