const express = require('express');
const { listasGet } = require('../Controllers/listasController');
const Roter = express.Router();

Roter.get('/listas',async (req,res)=>{
    try{
        const data = await listasGet();
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})

module.exports = Roter;