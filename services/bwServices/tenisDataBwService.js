const { Tenis } = require("../../Models/TenisModel");
const { browser } = require("../browserServices/browserservice");
const { buscarIndex } = require("../RbServices/buscarIndex");
const { extraerAmbosMarcan } = require("../RbServices/metodosFutbol/extraerAmbosMarcan");
const { extraerHandicapAsiatico } = require("../RbServices/metodosFutbol/extraerHandicapAsiatico");
const { clickNavBar } = require("./metodosFutbolBw/clickNavbar");
const { extraerHandicapBw } = require("./metodosFutbolBw/extraerHandicapBw");
const { extraerHandicapSetsBw } = require("./metodosFutbolBw/extraerHandicapSetsBw");
const { extraerSinEmpateBw } = require("./metodosFutbolBw/extraerSinEmpateBw");
const { extraerTotalGolesBw } = require("./metodosFutbolBw/extraerTotalGolesBw");
const { opcionesClick } = require("./metodosFutbolBw/opcionesClick");

const tenisDataBw = async (URL)=>{
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
    
    const Browser = await browser();
    const page = await Browser.newPage(); //// volver a poner page como parametro al terminar
    await page.setViewport({ width: 1920, height: 1080 });
    console.log("url: ", URL);
    await page.goto(
        URL
        // // {waitUntil: "networkidle0",}
        // { waitUntil: 'domcontentloaded' }
    );
    
    // variables de los selectores
    await page.waitForSelector(".option-panel");
    await page.waitForSelector(".participant-name");
    const cuotaSelector = "option-value";
    const sesionSelector = "market-name";
    var sesionActual;
    var index;
    // con interfas visible
    // const spam = await page.$(".fast-svg");
    // if (spam) {
    //     await spam.click().catch((err) =>
    //         console.log(
    //             err.message,
    //             sesionActual.evaluate((el) => el.textContent.trim)
    //         )
    //     );
    // }
    
    var opcionNavBar = false;
    opcionNavBar = await clickNavBar(page, "Todo");
    opcionNavBar = opcionNavBar.filter((filter) => filter !== false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await opcionesClick(page);
    // return 'si';
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('inica scraping en bw tenis');
    const participantes = await page.$$(".participant-name");
    const local = await participantes[0].evaluate((el) => el.textContent.trim());
    const visitante = await participantes[1].evaluate((el) =>el.textContent.trim());

    // +++++++++++++++++++++++++++++++++++++ extraer ganador Partido ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var opcionPanel = await page.$$(".option-panel");
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Ganador del partido (1-2)?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        ganadorPartido = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('ganador Partido',ganadorPartido, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ extraer ganador set 1++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Quién ganará el 1er set?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        ganadorSet1 = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('ganador Set 1',ganadorSet1, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ extraer ganador set 2++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Quién ganará el 2° set?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        ganadorSet2 = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('ganador Set 2',ganadorSet2, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ ganador Handicap Juegos++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Quién ganará más juegos en el partido? (hándicap jugador)"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        ganadorHandicapJuegos = await extraerHandicapBw(sesionActual, local, visitante);
        // console.log('ganador Handicap Juegos',ganadorHandicapJuegos, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ total juegos ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Cuántos juegos se disputarán en el partido?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        juegosTotal = await extraerTotalGolesBw(sesionActual);
        // console.log('juegos Totals',juegosTotal, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ local Almenos Uno ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Ganará el jugador 1 al menos 1 set?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        localAlmenosUno = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('local Almenos Uno',localAlmenosUno, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ visitante Almenos Uno ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Ganará el jugador 2 al menos 1 set?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        visitanteAlmenosUno = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('visitante Almenos Uno',visitanteAlmenosUno, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ partido Remontada ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Remontará un(a) jugador(a) un marcador en contra de 0-1 set y ganará el partido? (el partido tiene que finalizar de manera reglamentaria para que las apuestas sean válidas)"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        partidoRemontada = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('partido Remontada',partidoRemontada, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++ tieBreak ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Habrá un tie break en el primer set?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        tieBreak = await extraerSinEmpateBw(sesionActual, cuotaSelector);
        // console.log('tieBreak',tieBreak, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++     handicap Sets ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Quién ganará el partido? (hándicap de set)"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        handicapSets = await extraerHandicapSetsBw(sesionActual);
        // console.log('handicap Sets',handicapSets, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++     sets Del Parido ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Cuántos sets se jugarán en el partido? (Al mejor de tres)"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        setsDelParido = await extraerHandicapSetsBw(sesionActual);
        console.log('sets Del Parido',setsDelParido, index);
        // console.log('resultado Final');
        index = -1;
    }
    // +++++++++++++++++++++++++++++++++++++     juegos Total Set Uno ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "¿Cuántos juegos se disputarán en el 1er set?"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        juegosTotalSetUno = await extraerTotalGolesBw(sesionActual);
        // console.log('juegos Total Set Uno',juegosTotalSetUno, index);
        // console.log('resultado Final');
        index = -1;
    }

    const result = new Tenis(local, visitante, ganadorPartido, ganadorSet1, ganadorSet2, ganadorHandicapJuegos, juegosTotal, localAlmenosUno
    , visitanteAlmenosUno, partidoRemontada, tieBreak, setsDelParido, juegosTotalSetUno, handicapSets)
    await page.close();
    return result;
    
}

module.exports = {tenisDataBw};