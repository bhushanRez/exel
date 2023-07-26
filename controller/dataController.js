const connection=require('../connection/connection');
const asyncHandler=require('express-async-handler');

const getData=asyncHandler(async(req,res)=>{
    const path = req.path;
        const dbObject = {
        field: "",
        table: "",
        };
        if (path.includes("roles")) {
            dbObject.field = "roleType";
            dbObject.table = "roles";
        } else if (path.includes("technologies")) {
            dbObject.field = "technology";
            dbObject.table = "technologies";
        } else if (path.includes("productTypes")) {
            dbObject.field = "ptype";
            dbObject.table = "productType";
        } else {
            res.status(400).json({ success: false, message: 'Wrong Request' })
        }
        try {
            const results = await connection.query(`SELECT id, ${dbObject.field} FROM ${dbObject.table}`);
            // console.log(results)
            if (results[0].length > 0) {
                res.status(200).json({ success: true, data: results[0] });
            } else {
                res.status(400).json({ success: false, message: "No data found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal Error" });
        }
})

module.exports={getData};