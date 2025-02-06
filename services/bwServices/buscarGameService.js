const { query } = require("express");
const { browser } = require("../browserServices/browserservice");
const { futbolDataBw } = require("./futbolDataBwService");
const levenshtein = require('fast-levenshtein');
const jaroWinkler = require('jaro-winkler');
const { buscarEquipo } = require("./metodosFutbolBw/buscarEquipo");
const { buscarBw } = require("./metodosFutbolBw/buscarBw");
const { normalizeText } = require("../../utils/aliasEquipos");


const listaError =[];
var intento = 0; // NOTA   USAR LA VARIABLE GLOBAL ME INPIDE LLAMAR EL METODO EN SIMULTANIO 
var page;
const buscarGame = async (local, visitante) => {
    const MAX_INTENTOS = 2;
    var res = false;
    try{

        if (intento >= MAX_INTENTOS) {
            console.log("Máximo de intentos alcanzado. Retornando false.");
            intento = 0; // Reiniciar el contador
            return false;
        }
        const Browser = await browser();
        page = await Browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://sports.bwin.co/es/sports', {
            // waitUntil: "networkidle0",
        });
    
        await new Promise(resolve => { setTimeout(resolve, 200) });
        // await page.setViwport({ width: 1920, height: 1080 });
        await page.goto('https://sports.bwin.co/es/sports?popup=betfinder',
        // { waitUntil: 'domcontentloaded' }
        );
        await new Promise(resolve =>  setTimeout(resolve, 3000) );
        // const cerrar = await page.$('.close.theme-ex');
        // await cerrar.click();  // NOTA DEJAR DESABILIATADO SIN INTERFAZ**
        const selectorInput = 'input[name="searchField"]';
        // const selectorInput = 'search-bar';
        local= await cleanTeamName(local);
        visitante= await cleanTeamName(visitante);
        const localActual = await normalizeText(local);
        const visitanteActual = await normalizeText(visitante);
        console.log('localActual', localActual, 'visitanteActual', visitanteActual);
        await page.waitForSelector(selectorInput,{ visible: true })
        console.log('iniciando busqueda en  Bw');
        var localVisitante = await buscarBw(page,selectorInput, localActual+" "+visitanteActual, localActual, visitanteActual);
        if(localVisitante){
            res = localVisitante;
        }else{
            localVisitante = await buscarBw(page,selectorInput, localActual, localActual, visitanteActual);
            if(localVisitante){
                res = localVisitante;
            }else{
                localVisitante = await buscarBw(page,selectorInput, visitanteActual, localActual, visitanteActual);
                if(localVisitante){
                    res = localVisitante;
                }
            }
        }
        
    
        // await page.type(selectorInput, localActual+" "+visitanteActual);
        // await new Promise(resolve => { setTimeout(resolve, 500) });
        // await page.keyboard.down('Enter');
        // await page.keyboard.up('Enter');
        // await page.waitForSelector('.ng-star-inserted');
        // await new Promise(resolve => { setTimeout(resolve, 500) });
    
        // const contenido = await page.$('.popular-recent-search-suggestion');
        // if (contenido) {
    
        //     const resultado = await contenido.evaluate(el => el.textContent.trim());
        //     if (resultado === 'SIN RESULTADOS') {
        //         const cerrar = await page.$('.input-search');
        //         await cerrar.evaluate(el => {
        //             const x = el.querySelector('.close.theme-ex');
        //             x.click();
        //         })
        //         await page.type(selectorInput, localActual);
        //         await new Promise(resolve => { setTimeout(resolve, 500) });
        //         await page.keyboard.down('Enter');
        //         await page.keyboard.up('Enter');
        //         await new Promise(resolve => { setTimeout(resolve, 1000) });
        //         res = await buscarEquipo(page, localActual, visitanteActual);
        //         // await page.type(selectorInput, localActual);  
        //     } else {
        //         await new Promise(resolve => { setTimeout(resolve, 1000) });
                // res = await buscarEquipo(page, localActual, visitanteActual);
        //     }
        // }
        page.close();
        if(res){
            // console.log('res', res);
            const URL = res;
            res = await futbolDataBw(URL.toString()); // quitar el awit para que ejecute el scarping en Rb al mismo tiempo 
        }else{
            listaError.push({local: local, visitante: visitante});
            console.log('add lista ERROR');
        }
        
        console.log('termino la  busqueda en  Bw');
        intento = 0;
        return res!==false? res:false;
    }catch(err){
        console.log(`Error en el intento ${intento + 1}: ${err.message}`);
        intento++;
        await page.close();
        console.log('Reintentando....');
        return await buscarGame(local, visitante);
    }
}


function cleanTeamName(name) {
    return name
        .replace(/ü/g, 'ue').replace(/ä/g, 'ae').replace(/ö/g, 'oe') // Convierte caracteres alemanes antes de eliminar acentos
        .normalize("NFD").replace(/[\u0300-\u036f]/g, '') // Elimina acentos
        .replace(/^\d+\.?\s*|\d+$/g, '') // Elimina números al inicio o final (con o sin punto)
        .replace(/\s*\([^)]*\)\s*/g, '') // Elimina texto dentro de paréntesis
        .replace(/^\s*\b\w{1,3}\b\s*|\s*\b\w{1,2}\b\s*$/g, '') // Elimina palabras de 1 o 2 caracteres solo al inicio o final
        .trim(); // Elimina espacios extra
}


module.exports = { buscarGame, listaError }