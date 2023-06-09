const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')


const authRoute = require('./Routes/authroute')
const usermodel = require('./Model/user')
const authController = require('./Controllers/authController')
const verifytoken = require('./utils/verfiytoken')
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



mongoose.connect('mongodb://localhost:27017/JWT', {useNewUrlParser:true}).then(()=>{
    console.log("DB Connected successfully.......")
}).catch((_err)=>{
    console.log("DB not connected.....")
})


app.use('/auth',authRoute)


app.use('/',(req,res)=>{
    res.send("AUTHENTICATION HEALTH ")
})






app.listen('3000',(_req,_res)=>{
    console.log("Server running on port 3000 ......... ")
})

// const express = require('express')
// const app = express()
// //app.use(express.json)
// app.listen('3100',(_req,_res)=>{
//         console.log("Server running on port 3100 ......... ")
//     })

//     app.use('/',(_req,res)=>{
//             res.send("AUTHENTICATION HEALTH ")
//         })
        