const connection=require('../connection/connection');


const fetchData=async(email)=>{
    try{
        return await connection.query(`select * from employee where email='${email}'`);
    }
    catch(err){
        return err;
    }
}

const insertData=async(name,email,hashedPassword,role)=>{
    try{

        const res= await connection.query(`insert into employee (name , email, password ,roleId) values ( '${name}','${email}','${hashedPassword}',${role})`);
        console.log(res)
        return res;
    }
    catch(err){
        console.log(err)
        return err;
    }
}

module.exports={fetchData,insertData}