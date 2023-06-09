const User = require('../Model/user')
const  mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const privatekey ='venugopal'

exports.login =async (req,res)=>{
    try{
        if((req.body.email && req.body.password)){
            const user = await User.find({email:req.body.email})
            const userdet={...user}
            if(!user.length){
                    res.status(401).json({
                        status:"user not found",
                        message:"please signup instead of login"
                    })
            }
            if(user.length && (await bcrypt.compare(req.body.password,userdet[0].password))){
                const token = jwt.sign({id:user._id,email:user.email},privatekey,{expiresIn:"2h"})
                    const userdetails = {...userdet[0]._doc}
                    userdetails.token=token
                    res.status(200).json({
                        status:"login successfully...",
                        message:userdetails
                    })
            }else{
                res.status(403).json({
                    status:"Invalid credentails....",
                    message:"Please try with correct credentails...."
                })                
            }
        }
        else{
            res.status(403).json({
                status:"login failed .......",
                message:"Please enter both email and password "
            })
        }


    }catch{
        console.log("ERROR ERROCURED....")
        res.send("Error occured")
    }

}