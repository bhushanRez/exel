const express=require('express');
const router=express.Router();
const {getData}=require("../controller/dataController");

router.get('/roles',getData);

router.get('/technologies',getData);

router.get('/productTypes',getData);

module.exports=router;