const { Tenis } = require("../../Models/TenisModel");
const { extraerSinEmpateBw } = require("../bwServices/metodosFutbolBw/extraerSinEmpateBw");
const { buscarIndex } = require("../RbServices/buscarIndex");
const { extraerAmbosMarcan } = require("../RbServices/metodosFutbol/extraerAmbosMarcan");
const { clickNavBarCod } = require("./metodosTenis/clickNavbarCod");
const { extraerHandicapCod } = require("./metodosTenis/extraerHandicapCod");
const { extraerTotalGolesCod } = require("./metodosTenis/extraerTotalGolesCod");


const tenisDataCod = async (page) =>{
    // varibales del modelo tenis
    var ganadorPartido;
    var ganadorSet1;
    var ganadorSet2;
    var ganadorHandicapJuegos;
    var juegosTotal;
    var localAlmenosUno;
    var visitanteAlmenosUno;
    var partidoRemontada;
    var tieBreak;
    var setsDelParido;
    var juegosTotalSetUno;
    var handicapSets;
    var tieBreakSet1;
    var ambosGananSet;
    
    const sesionSelector = 'sb-dropdown--title';
    const cuotaSelector = 'sb-button--subtitle.color-dark'
    var opcionesPanel = await page.$$('.sb-two-columns-desktop');
    var sesionActual;
    const participantes = await page.$$('.sb-prematch-scoreboard--title');
    const local = await participantes[0].evaluate(el => el.textContent.trim());
    const visitante = await participantes[1].evaluate(el => el.textContent.trim());
    // console.log(local, visitante)
    console.log('escraping en Cod')
    // +++++++++++++++++++++++++++++++++++++ extraer ganador Partido ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var index = await buscarIndex(opcionesPanel,sesionSelector, 'Ganador del partido');
    // console.log(index);
    if(index > -1){
        sesionActual = opcionesPanel[index];
        ganadorPartido = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('ganador del partido',ganadorPartido);
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ extraer ganador set 1++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionesPanel,sesionSelector, 'Ganador del Set 1');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        ganadorSet1 = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('ganador Set 1',ganadorSet1);
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ extraer ganador set 2++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionesPanel,sesionSelector, 'Ganador del Set 2');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        ganadorSet2 = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('ganador Set 2',ganadorSet2);
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ ganador Handicap Juegos++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionesPanel,sesionSelector, 'Hándicap por Juegos');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        ganadorHandicapJuegos = await extraerHandicapCod(sesionActual, local, visitante);
        // console.log('ganador Handicap Juegos',ganadorHandicapJuegos);
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ ganador Handicap Juegos++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionesPanel,sesionSelector, 'Hándicap por Sets');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        handicapSets = await extraerHandicapCod(sesionActual, local, visitante);
        // console.log('Hándicap por Sets',handicapSets);
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ total juegos ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionesPanel,sesionSelector, 'Total de Juegos Más/Menos');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        juegosTotal = await extraerTotalGolesCod(sesionActual);
        // console.log('Total de Juegos Más/Menos',juegosTotal);
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ tieBreak ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionesPanel, sesionSelector, 'Tiebreak en el Partido');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        tieBreak = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('tieBreak', tieBreak);
        index = -1;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const opcionesNavbar = await clickNavBarCod(page,'sets')
    console.log(opcionesNavbar)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if(opcionesNavbar){
    // +++++++++++++++++++++++++++++++++++++ tieBreak set 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    opcionesPanel = await page.$$('.sb-two-columns-desktop');
    index = await buscarIndex(opcionesPanel, sesionSelector, 'Tiebreak en el Set 1');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        tieBreakSet1 = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('tieBreak set 1', tieBreakSet1);
        index = -1;
    }
    index = await buscarIndex(opcionesPanel, sesionSelector, 'Ambos Ganan un Set');
    if(index > -1){
        sesionActual = opcionesPanel[index];
        ambosGananSet = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('ambosGananSet', ambosGananSet);
        index = -1;
    }
    }

    const result = new Tenis(local, visitante, ganadorPartido, ganadorSet1, ganadorSet2, ganadorHandicapJuegos, juegosTotal, localAlmenosUno
        , visitanteAlmenosUno, partidoRemontada, tieBreak, setsDelParido, juegosTotalSetUno, handicapSets,tieBreakSet1,ambosGananSet)
        await page.close();
        console.log('termino escraping en Cod')
        return result;


}

module.exports= {tenisDataCod};