const express = require('express');
const router = express.Router();

const sportView = require('../views/sportView.js');
const { getDataFutbol } = require('../Controllers/rushtbetController/futbolController.js');

router.get('/Rh',async (req,res)=>{
    // const url = req.query.url
    try{
        const data = await getDataFutbol();
        res.json(data);
    }catch(error){
        res.status(500).json( error.message);
    }
})

module.exports = router;