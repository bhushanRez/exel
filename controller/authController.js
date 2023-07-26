const bcrypt=require('bcrypt');
const asyncHandler=require('express-async-handler');
const connection = require('../connection/connection');
const {fetchData,insertData}=require('../repository/user.repository');
const {checkPassword}=require('../service/user.service')

let employees=[];

const login=asyncHandler( async(req,res)=>{
    const {email,password}=req.body;
    let foundEmp =await connection.query(`select * from employee where email='${email}'`);
    if(foundEmp[0].length>0){
        const matchPassword=checkPassword(password,foundEmp)
        if(matchPassword){
            res.status(200).json({"authorisation":true});
        }
        else{
            res.status(404).json({"authorisation":false});
        }
    }
    else{
        res.status(404).json({"user":"Not found"});
    }
})

const register=asyncHandler(async(req,res)=>{
    const {name,email,password,role}=req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    try{
        const result= await insertData(name,email,hashedPassword,role)
        res.status(201).json({ result,success: true, message: 'Registered Successfully' })
    }
    catch(err){
        console.log(err)
    }
})

module.exports={login,register};