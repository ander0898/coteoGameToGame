const express = require('express');
const { getDataTenis } = require('../Controllers/rushtbetController/tenisController');
const { getDataTenisBw } = require('../Controllers/bwinControllers/tenisBwController');
const { listasBwGet } = require('../Controllers/listasController');
const { getDataTenisCod } = require('../Controllers/CodControllers/tenisCodController');
const Router = express.Router();


Router.get('/Bw',async(req,res)=>{
    try{
        const data = await getDataTenisBw();
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})

Router.get('/Rh',async (req,res)=>{
    try{
        const data = await getDataTenis();
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})
Router.get('/Cod',async (req,res)=>{
    try{
        const data = await getDataTenisCod();
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})

Router.get('/listas',async (req,res)=>{
    try{
        const data = await listasBwGet();
        res.json(data); 
    }catch(err){
        res.status(500).json( err.message);
    }
})

module.exports = Router;
