
const express = require('express');
const Router = express.Router();
const { getDataFutbolBw } = require('../Controllers/bwinControllers/futbolBwController');
const { getDataFutbol } = require('../Controllers/rushtbetController/futbolController');
const { listasGet } = require('../Controllers/listasController');
const { getErrorAlias } = require('../Controllers/errorAliasController');


Router.get('/Bw', async (req, res)=>{
    try{
        const data = await getDataFutbolBw();
        res.json(data);
    }catch(error){
        res.status(500).json( error.message);
    }
})
Router.get('/Rh',async (req,res)=>{
    // const url = req.query.url
    try{
        const data = await getDataFutbol();
        res.json(data);
    }catch(error){
        res.status(500).json( error.message);
    }
})
Router.get('/listas',async (req,res)=>{
    try{
        const data = await listasGet();
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})
Router.get('/errorAlias', async (req, res)=>{
    try{
        const data = await getErrorAlias();
        // console.log(data);
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})

module.exports = Router;