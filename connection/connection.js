const mysql=require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "company"
})

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("DB Connected");
    }
})

module.exports=connection.promise();