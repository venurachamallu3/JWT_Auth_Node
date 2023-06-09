const mongoose = require('mongoose')
const express = require('express')

const UserCollection = new mongoose.Schema({
    "name":{
        type:String,
        require:true
    },
    "email":{
        type:String,
        require:true
    },
    "password":{
        type:String,
        require:true
    },
    "confirmpassword":{
        type:String,
        require:true
    },
    "about":{
        type:String
    }
}
    
)

const Usermodel = mongoose.model('User',UserCollection)

module.exports=Usermodel