const User = require('../Model/user')
const  mongoose = require('mongoose')
const { use } = require('../Routes/authroute')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const privatekey ='venugopal'


exports.adduser= async (req,res)=>{
    try {
        const {name,email,password,confirmpassword,about}=req.body;
        const existeduser = await User.find({email:email})
        if(!existeduser.length){
            if(password ===confirmpassword){                
                const decryptpaswd = await bcrypt.hash(password,10)
                req.body.password=decryptpaswd                
                const user  = await User.create(req.body)
                 const token =jwt.sign({id:user._id,email:user.email},privatekey,{expiresIn:'1h'})
                 const userdetails = { ...user._doc }
                 userdetails.token=token
                 res.status(200).json({
                    status:"Successfully registered.....",
                    message:{
                        userdetails
                    }
                 })

               }else{
                    res.status(401).json({
                        status:"Password and Confirm password both are not match",
                        message :"please type correct"
                    })
               }
            
        }else{
            res.status(401).json({
                status:"USER ALREDY EXISTS",
                message :"please login instead of sign up"
            })
        }
    }
    catch(err){
    console.log("error occured",err)
    res.send("Error occured")
}
}

