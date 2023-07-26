const express=require('express');
const router =express.Router();
const multer  = require('multer');
const xlsx = require("xlsx");
const connection=require('../connection/connection');
const _ =require('lodash');


var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null ,Date.now() +'_'+file.originalname);   
    }
 });

 let data = [];


const upload = multer({ storage:storage});


  
const convertArray = (tempData, objectArr) => {
    return tempData.map((val) => objectArr.map((key) => val[key]));
  };
  
  
  const addExcelToDb=(fileName)=>{
    try{
        console.log("inside get data")
        // let excelData = (req.file) ? req.file.filename : null
        const file = xlsx.readFile(fileName)
        let data = []
        const sheets = file.SheetNames
        sheets.map(async (sheet,index)=>{
            const temp = xlsx.utils.sheet_to_json(
                file.Sheets[sheet])
            
                const protemp= temp.map(async (data)=>{
                    const [row]=await connection.query(`select * from ${sheet} where id = ?`,[data.id]);
                    if(row.length > 0){
                        
                      let keys = Object.keys(data);
                      keys.splice(0,1);
                      let str=``;
                    let arr= Object.values(data)
                     const [id] = arr.splice(0,1);
                     arr.push(id);
                      keys.forEach((item)=>{
                        str+=`${item} = ?,`
                      })
                      
                      const sql= `update ${sheet} set ${str.slice(0,-1)} where id = ?` ;
                      console.log(sql);
                      await connection.query(sql,arr);
                    }else{
                       let keys = Object.keys(data); 
                       const place = Array(keys.length).fill("?").join(", ");
                       keys=keys.join(' , '); 
                       console.log(keys,place);
                       await connection.query(`insert into ${sheet} (${keys}) values  (${place})`,Object.values(data));
                    }
                })
                await Promise.all(protemp);

        }
        )
        // console.log(data)
    }
    catch(err){
        console.log(err)
       
    }

  }

 
  
  
  router.post("/", upload.single("myFile"),async (req, res) => {
    // Stuff to be added later
    addExcelToDb(req.file.path);
    res.send(req.file.filename);

    
  });

 
module.exports=router;