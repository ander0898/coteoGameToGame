const { Tenis } = require("../../Models/TenisModel");
const { browser } = require("../browserServices/browserservice");
const { buscarIndex } = require("./buscarIndex");
const { extraerAmbosMarcan } = require("./metodosFutbol/extraerAmbosMarcan");
const {
    extraerCuotasPartido,
} = require("./metodosFutbol/extraerCuotasPartido");
const { extraerHandicapAsiatico } = require("./metodosFutbol/extraerHandicapAsiatico");
const { extraerTotalGoles } = require("./metodosFutbol/extraerTotalGoles");
const { prepararPageRb } = require("./prepararPageRb");

const tenisData = async (link, local, visitante, liga) => {
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
    var tieBreakSet1;
    var setsDelParido;
    var juegosTotalSetUno;
    var handicapSets;
    var ambosGananSet;
    // variables de los selectores
    const cuotaSelector = "sc-kAyceB.gIMtGL";
    const sesionSelector = "KambiBC-bet-offer-subcategory__label";

    var index;
    const browserInstance = await browser();
    const page = await browserInstance.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page
        .goto(link, {
            waitUntil: "networkidle0",
            timeout: 40000,
        })
        .catch((err) => {
            console.error(err.message);
        });

    console.log("iniciando scraping en Rh");
    await prepararPageRb(page);
    //+++++++++++++++++++++++++++++++++++++++++++ extrar ganador del partido +++++++++++++++++++++++
    const partido = await page
        .$$(".KambiBC-bet-offer-subcategory--onecrosstwo")
        .catch((err) => err.message);
    index = await buscarIndex(partido, sesionSelector, "Cuotas del partido");
    if (index >= 0) {
        ganadorPartido = await extraerCuotasPartido(partido[index], cuotaSelector);
        // console.log(index, "ganadorPartido", ganadorPartido);
        index = -1;
    }
    //+++++++++++++++++++++++++++++++++++++++++++ extrar ganador del set 1+++++++++++++++++++++++
    index = await buscarIndex(partido, sesionSelector, "Set 1");
    if (index >= 0) {
        ganadorSet1 = await extraerCuotasPartido(partido[index], cuotaSelector);
        // console.log(index, "ganador Set 1", ganadorSet1);
        index = -1;
    }
    //+++++++++++++++++++++++++++++++++++++++++++ extrar ganador del set 2+++++++++++++++++++++++
    index = await buscarIndex(partido, sesionSelector, "Set 2");
    if (index >= 0) {
        ganadorSet2 = await extraerCuotasPartido(partido[index], cuotaSelector);
        // console.log(index, "ganador Set 2", ganadorSet2);
        index = -1;
    }
    //+++++++++++++++++++++++++++++++++++ extraer Total de juegos +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw
    const totalJuegos = await page.$$('.KambiBC-bet-offer-subcategory--overunder'); // esta clase tambien la utiliza la lista de tarjetas 
    index = await buscarIndex(totalJuegos,sesionSelector, 'Total de juegos');
    if(index >= 0){
        juegosTotal = await extraerTotalGoles(totalJuegos[index]);
        // console.log(index, 'Total de juegos', juegosTotal);
        index = -1
    }
    //++++++++++++++++++++++++++++++++ sets Del Parido +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(totalJuegos,sesionSelector, 'Total de sets');
    if(index >= 0){
        setsDelParido = await extraerTotalGoles(totalJuegos[index]);
        // console.log(index, 'Total de sets', setsDelParido);
        index = -1
    }
    //++++++++++++++++++++++++++++++++ Número total de Tiebreaks +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(totalJuegos,sesionSelector, 'Número total de Tiebreaks');
    if(index >= 0){
        tieBreak = await extraerTotalGoles(totalJuegos[index]);
        // console.log(index, 'Número total de Tiebreaks', tieBreak);
        index = -1
    }
    //++++++++++++++++++++++++++++++++ juegos Total Set Uno +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(totalJuegos,sesionSelector, 'Total de juegos - Set 1');
    if(index >= 0){
        juegosTotalSetUno = await extraerTotalGoles(totalJuegos[index]);
        // console.log(index, 'Total de juegos - Set 1', juegosTotalSetUno);
        index = -1
    }
    //++++++++++++++++++++++++++++++++++ ganador Handicap Juegos +++++++++++++++++++++++++++++++++++++++++++++
    const juegosHandicap = await page.$$('.KambiBC-bet-offer-subcategory--handicap');
    index = await buscarIndex(juegosHandicap, sesionSelector, 'Hándicap de juegos');
    if(index >= 0){
        ganadorHandicapJuegos= await extraerHandicapAsiatico(juegosHandicap[index], local, visitante);
        // console.log(index, 'ganadorHandicapJuegos', ganadorHandicapJuegos);
        index = -1;
    }
    //++++++++++++++++++++++++++++++++++ handicap Sets +++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(juegosHandicap, sesionSelector, 'Hándicap de sets');
    if(index >= 0){
        handicapSets= await extraerHandicapAsiatico(juegosHandicap[index], local, visitante);
        // console.log(index, 'Hándicap de sets', handicapSets);
        index = -1;
    }
    //+++++++++++++++++++++++++++++++++++++ visitante Al menos Uno ++++++++++++++++++++++++++++++++++++++++++++++++
    const alMenosUno = await page.$$('.KambiBC-bet-offer-subcategory--yesno');
        index = await buscarIndex(alMenosUno,sesionSelector, `${visitante} gana al menos un set`)
        if(index >= 0){
            visitanteAlmenosUno = await extraerAmbosMarcan(alMenosUno[index],cuotaSelector);
            // console.log(index, `${visitante} gana al menos un set`, visitanteAlmenosUno);
            index = -1;
        }
    //+++++++++++++++++++++++++++++++++++++ local Al menos Uno ++++++++++++++++++++++++++++++++++++++++++++++++
        index = await buscarIndex(alMenosUno,sesionSelector, `${local} gana al menos un set`)
        if(index >= 0){
            localAlmenosUno = await extraerAmbosMarcan(alMenosUno[index],cuotaSelector);
            // console.log(index, `${local} gana al menos un set`, localAlmenosUno);
            index = -1;
        }

    const result = new Tenis(local, visitante, ganadorPartido, ganadorSet1, ganadorSet2, ganadorHandicapJuegos, juegosTotal, localAlmenosUno
        , visitanteAlmenosUno, partidoRemontada, tieBreak, setsDelParido, juegosTotalSetUno, handicapSets, tieBreakSet1, ambosGananSet)
        await page.close()
        return result;
};

module.exports = { tenisData };
