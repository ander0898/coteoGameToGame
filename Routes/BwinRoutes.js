const express = require('express');
const { getDataFutbolBw } = require('../Controllers/bwinControllers/futbolBwController');
const Router = express.Router();


Router.get('/Bw', async (req, res)=>{
    try{
        const data = await getDataFutbolBw();
        res.json(data);
    }catch(error){
        res.status(500).json( error.message);
    }
})

module.exports = Router;