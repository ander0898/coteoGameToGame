const express = require('express');
const { getErrorAlias } = require('../Controllers/errorAliasController');
const Routes = express.Router();

Routes.get('/errorAlias', async (req, res)=>{
    try{
        const data = await getErrorAlias();
        // console.log(data);
        res.json(data);
    }catch(err){
        res.status(500).json( err.message);
    }
})

module.exports = Routes;