const { text } = require("express");
const { browser } = require("../browserServices/browserservice");
const { buscarIndex } = require("../RbServices/buscarIndex");
const {
    extraerAmbosMarcan,
} = require("../RbServices/metodosFutbol/extraerAmbosMarcan");
const {
    extraerCuotasPartido,
} = require("../RbServices/metodosFutbol/extraerCuotasPartido");
// const { extraerCuotasPartido } = require("../RbServices/metodosFutbol/extraerCuotasPartido");
const {
    extraerDobleOportunidad,
} = require("../RbServices/metodosFutbol/extraerDobleOportunidad");
// const { extraerDobleOportunidad } = require("../RbServices/metodosFutbol/extraerDobleOportunidad");
// const { extraerDobleOportunidad } = require("../RbServices/metodosFutbol/extraerDobleOportunidad");
const { clickBw } = require("./metodosFutbolBw/clickBw");
// const { clickBw } = require("./metodosFutbolBw/clickBw");
// // const { clickBw } = require("./metodosFutbolBw/clickBw");
const {
    extraerTotalGolesBw,
} = require("./metodosFutbolBw/extraerTotalGolesBw");
const { clickNavBar } = require("./metodosFutbolBw/clickNavbar");
// const { clickNavBar } = require("./metodosFutbolBw/clickNavbar");
const { extraerSinEmpateBw } = require("./metodosFutbolBw/extraerSinEmpateBw");
const { Futbol } = require("../../Models/FutbolModel");
const { opcionesClick } = require("./metodosFutbolBw/opcionesClick");
// const { listaBw } = require("../iniciarServices");

listaFutbolBw = [];
//  +++++++++++++++++++++++++++++++++++++++++ metodo de preparacion y extracion de datos de bw +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const futbolDataBw = async (URL) => {
    // await new Promise(resolve => { setTimeout(resolve, 3000) });
    const Browser = await browser();
    const page = await Browser.newPage(); //// volver a poner page como parametro al terminar
    await page.setViewport({ width: 1920, height: 1080 });
    console.log("url: ", URL);
    await page.goto(
        URL
        // // {waitUntil: "networkidle0",}
        // { waitUntil: 'domcontentloaded' }
    );
    // variables del modelo futbol
    var resultadoFinal;
    var resultadoParte1;
    var resultadoParte2;
    var dobleOportunidad;
    var dobleOportunidadParte1;
    var totalGoles;
    var totalGolesParte1;
    var totalGolesParte2;
    var totalCorner;
    var totalCornerParte1;
    var totalCornerParte2;
    var totalGolesVisitante;
    var totalGolesVisitanteParte1;
    var ambosMarcan;
    var ambosMarcanParte1;
    var totalGolesLocal;
    var totalGolesLocalParte1;
    var totalCornerVisitante;
    var totalCornerVisitanteParte1;
    var totalCornerVisitanteParte2;
    var totalCornerLocal;
    var totalCornerLocalParte1;
    var totalCornerLocalParte2;
    var totalTarjetas;
    var totalTarjetasLocal;
    var totalTarjetasVisitante;
    var penal;
    var tarjetaRoja;
    var sinEmpate;
    var sinEmpateParte1;
    var handicapAsiatico,
        handicapTotal,
        handicapAsiaticoParte1,
        handicapTotalParte1; // no la usamos pero se necesitan para el modelo
    // variables de los selectores
    await page.waitForSelector(".option-panel");
    await page.waitForSelector(".participant-name");
    const cuotaSelector = "option-value";
    const sesionSelector = "market-name";
    var sesionActual;
    var index;
    // variables funcionales
    var click = false;
    const resultado = "Tiempo reglamentario";
    const alDescanso = "1º tiempo";
    const parte2 = "2º tiempo";
    // console.log(page);
    // console.log('pagina cargada');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // await page.evaluate(() => {
    //     const spam = document.querySelector('.fullscreen-promo-banner.djsignup');
    //     if (spam) {
    //         spam.style.display = 'none';
    //         // console.log("Se ocultó el spam correctamente.");
    //     }
    // });
    // const spam = await page.$(".fast-svg");
    // if (spam) {
    //     await spam.click().catch((err) =>
    //         console.log(
    //             err.message,
    //             sesionActual.evaluate((el) => el.textContent.trim)
    //         )
    //     );
    // }

    console.log("iniciando Scraping bw");
    const participantes = await page.$$(".participant-name");
    const local = await participantes[0].evaluate((el) => el.textContent.trim());
    const visitante = await participantes[1].evaluate((el) =>el.textContent.trim());
    // console.log(local, visitante);
    await opcionesClick(page);
    // return local;
    // +++++++++++++++++++++++++++++++++++++ extraer cuotas  del resultado final ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var opcionPanel = await page.$$(".option-panel");
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "Resultado del partido"
    ); // el index sirve para el descanso y la segunda parte
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        resultadoFinal = await extraerCuotasPartido(sesionActual, cuotaSelector);
        // console.log('resultado Final',resultadoFinal, index);
        // console.log('resultado Final');
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++ resultado al descanso ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso); // inconsistencia por culpa del spam que se genera en la pagina
    // console.log(click);
    await new Promise((resolve) => setTimeout(resolve, 500)); // consultar despues si hay manera de que espere un cambio del componente
    if (click && index !== -1) {
        resultadoParte1 = await extraerCuotasPartido(sesionActual, cuotaSelector);
        // console.log('descanso ',resultadoParte1);
        // console.log('descanso ');
        click = false;
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++ resultado parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, parte2); // inconsistencia por culpa del spam que se genera en la pagina
    // console.log(click);
    await new Promise((resolve) => setTimeout(resolve, 500)); // consultar despues si hay manera de que espere un cambio del componente
    if (click && index !== -1) {
        resultadoParte2 = await extraerCuotasPartido(sesionActual, cuotaSelector);
        // console.log('resultado segundo tiempo',resultadoParte2);
        // console.log('resultado segundo tiempo');
        index = -1;
        click = false;
    }
    // +++++++++++++++++++++++++++++++++++++++ extraer cuotas de doble oportunidad ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionPanel, sesionSelector, "Doble oportunidad");
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        dobleOportunidad = await extraerDobleOportunidad(
            sesionActual,
            cuotaSelector
        );
        // console.log('resultado final doble oportunidad',dobleOportunidad);
        // console.log('resultado final doble oportunidad');
    }
    // +++++++++++++++++++++++++++++++++++++++ extraer cuotas de doble oportunidad parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        dobleOportunidadParte1 = await extraerDobleOportunidad(
            sesionActual,
            cuotaSelector
        );
        // console.log('doble oportunidad parte 1',dobleOportunidadParte1);
        // console.log('doble oportunidad parte 1');
        index = -1;
        click = false;
    }
    //+++++++++++++++++++++++++++++++++++ extraer cuotas del total de goles +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(opcionPanel, sesionSelector, "Total de goles");
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        totalGoles = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles',totalGoles);
        // console.log('total goles');
    }
    //+++++++++++++++++++++++++++++++++++++++++++++ total goles parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        totalGolesParte1 = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles parte 1',totalGolesParte1);
        // console.log('total goles parte 1');
        // index = -1;
        click = false;
    }
    //+++++++++++++++++++++++++++++++++++++++++++++ total goles parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, parte2);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        totalGolesParte2 = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles parte 2',totalGolesParte2);
        // console.log('total goles parte 2');
        index = -1;
        click = false;
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "Número total de córners"
    );
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        // await sesionActual.click().catch(err => console.log(err.message, sesionActual.evaluate(el => el.textContent.trim)));
        await new Promise((resolve) => setTimeout(resolve, 500));
        totalCorner = await extraerTotalGolesBw(sesionActual);
        // console.log('total corners',totalCorner);
        // console.log('total corners');
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        totalCornerParte1 = await extraerTotalGolesBw(sesionActual);
        // console.log('total corners parte 1',totalCornerParte1);
        // console.log('total corners parte 1');
        // index = -1;
        click = false;
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, parte2);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        totalCornerParte2 = await extraerTotalGolesBw(sesionActual);
        // console.log('total corners parte 2',totalCornerParte2);
        // console.log('total corners parte 2');
        index = -1;
        click = false;
    }
    // ++++++++++++++++++++++++++++++++++++++++++ total de goles visitante +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        `${visitante} - Total de goles`
    );
    // console.log('index',index);
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        // await sesionActual.click().catch(err => console.log(err.message, sesionActual.evaluate(el => el.textContent.trim)));
        await new Promise((resolve) => setTimeout(resolve, 500));
        totalGolesVisitante = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles visitante',totalGolesVisitante);
        // console.log('total goles visitante');
    }
    // ++++++++++++++++++++++++++++++++++++++++++ total de goles visitante parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        totalGolesVisitanteParte1 = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles visitante parte ',totalGolesVisitanteParte1);
        // console.log('total goles visitante parte ');
        index = -1;
        click = false;
    }
    // ++++++++++++++++++++++++++++++++++++++++ cuotas de ambos marcan ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        "Ambos equipos marcan"
    );
    // console.log('index',index);
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        ambosMarcan = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('ambos marcan',ambosMarcan);
        // console.log('ambos marcan');
    }
    // ++++++++++++++++++++++++++++++++++++++++ cuotas de ambos marcan parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        ambosMarcanParte1 = await extraerAmbosMarcan(sesionActual, cuotaSelector);
        // console.log('ambos marcan parte 1',ambosMarcanParte1);
        // console.log('ambos marcan parte 1');
        click = false;
    }
    // ++++++++++++++++++++++++++++++++++++++++++ total de goles local +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    index = await buscarIndex(
        opcionPanel,
        sesionSelector,
        `${local} - Total de goles`
    );
    // console.log('index',index);
    if (index !== -1) {
        sesionActual = opcionPanel[index];
        // await sesionActual.click().catch(err => console.log(err.message, sesionActual.evaluate(el => el.textContent.trim)));
        await new Promise((resolve) => setTimeout(resolve, 500));
        totalGolesLocal = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles local',totalGolesLocal);
        // console.log('total goles local');
    }
    // ++++++++++++++++++++++++++++++++++++++++++ total de goles local parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    click = await clickBw(sesionActual, alDescanso);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (click && index !== -1) {
        totalGolesLocalParte1 = await extraerTotalGolesBw(sesionActual);
        // console.log('total goles local parte 1 ',totalGolesLocalParte1);
        // console.log('total goles local parte 1 ');
        index = -1;
        click = false;
    }
    ///////////////////////////////////////////////////////////////////// AQUI TERMINA EL ESCANEO DE LA SESION PRINCIPALES ////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////  CORNER //////////////////////////////////////////////////////////////////////////////////
    var opcionNavBar = false;
    opcionNavBar = await clickNavBar(page, "Córners");
    opcionNavBar = opcionNavBar.filter((filter) => filter !== false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log('navbar corner',opcionNavBar.length);
    // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners visitantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (opcionNavBar.length > 0) {
        opcionPanel = await page.$$(".option-panel");
        await opcionesClick(page);
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            `${visitante} - Número total de Corners`
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            totalCornerVisitante = await extraerTotalGolesBw(sesionActual);
            // console.log(`total corner ${visitante}`, totalCornerVisitante);
            // console.log(`total corner ${visitante}`);
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners visitantes parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        click = await clickBw(sesionActual, alDescanso);
        await new Promise((resolve) => setTimeout(resolve, 500));
        // console.log(click, index);
        if (click && index !== -1) {
            totalCornerVisitanteParte1 = await extraerTotalGolesBw(sesionActual);
            // console.log(`total corners ${visitante} parte 1`, totalCornerVisitanteParte1);
            // console.log(`total corners ${visitante} parte 1`);
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners visitantes parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        click = await clickBw(sesionActual, parte2);
        await new Promise((resolve) => setTimeout(resolve, 500));
        // console.log(click, index);
        if (click && index !== -1) {
            totalCornerVisitanteParte2 = await extraerTotalGolesBw(sesionActual);
            // console.log(`total corners ${visitante} parte 2`, totalCornerVisitanteParte2);
            // console.log(`total corners ${visitante} parte 2`);
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners Local ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            `${local} - Número total de Corners`
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            totalCornerLocal = await extraerTotalGolesBw(sesionActual);
            // console.log(`total corner ${local}`, totalCornerLocal);
            // console.log(`total corner ${local}`);
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners local parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        click = await clickBw(sesionActual, alDescanso);
        await new Promise((resolve) => setTimeout(resolve, 500));
        // console.log(click, index);
        if (click && index !== -1) {
            totalCornerLocalParte1 = await extraerTotalGolesBw(sesionActual);
            // console.log(`total corners ${local} parte 1`, totalCornerLocalParte1);
            // console.log(`total corners ${local} parte 1`);
            click = false;
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners local parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        click = await clickBw(sesionActual, parte2);
        await new Promise((resolve) => setTimeout(resolve, 500));
        // console.log(click, index);
        if (click && index !== -1) {
            totalCornerLocalParte2 = await extraerTotalGolesBw(sesionActual);
            // console.log(`total corners ${local} parte 2`, totalCornerLocalParte2);
            // console.log(`total corners ${local} parte 2`);
            index = -1;
            click = false;
        }
        opcionNavBar = false;
    } else {
        console.log("ERROR: no se puedo navegar a la sesion de Corners");
    }
    ///////////////////////////////////////////////////////////////////// AQUI TERMINA EL ESCANEO DE LA SESION CORNER ////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////   Tarjetas/penaltis  //////////////////////////////////////////////////////////////////////////////////

    // console.log('navbar antes de tarjeta ',opcionNavBar);
    var opcionNavBar = await clickNavBar(page, "Tarjetas/penaltis");
    opcionNavBar = opcionNavBar.filter((filter) => filter !== false);
    // console.log('navbar despues de tarjeta ',opcionNavBar.length);

    await new Promise((resolve) => setTimeout(resolve, 500));
    //+++++++++++++++++++++++++++++++++++++++++++ total tarjetas visitante  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (opcionNavBar.length > 0) {
        await opcionesClick(page);
        opcionPanel = await page.$$(".option-panel");
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            `${visitante} - Total de tarjetas`
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            totalTarjetasVisitante = await extraerTotalGolesBw(sesionActual);
            // console.log(`total Total de tarjetas ${visitante}`, totalTarjetasVisitante);
            // console.log(`total Total de tarjetas ${visitante}`);
            index = -1;
        }
        //+++++++++++++++++++++++++++++++++++++++++++ total tarjetas ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            "Número de tarjetas en total"
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            totalTarjetas = await extraerTotalGolesBw(sesionActual);
            // console.log('tarjetas totales', totalTarjetas);
            // console.log('tarjetas totales');
            index = -1;
        }
        //+++++++++++++++++++++++++++++++++++++++++++ total tarjetas local  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            `${local} - Total de tarjetas`
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            totalTarjetasLocal = await extraerTotalGolesBw(sesionActual);
            // console.log(`tarjetas totales ${local}`, totalTarjetasLocal);
            // console.log(`tarjetas totales ${local}`);
            index = -1;
        }
        //+++++++++++++++++++++++++++++++++++++++++++ penal ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        index = await buscarIndex(opcionPanel, sesionSelector, "Penalti - Sí/No");
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            penal = await extraerTotalGolesBw(sesionActual);
            // console.log(`Penalti - Sí/No`, penal);
            // console.log(`Penalti - Sí/No`);
            index = -1;
        }
        // ++++++++++++++++++++++++++++++++++++++++++++++++ trajeta Roja ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            "Tarjeta roja - Sí/No"
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            // await sesionActual.click();
            await new Promise((resolve) => setTimeout(resolve, 500));
            tarjetaRoja = await extraerTotalGolesBw(sesionActual);
            // console.log(`Tarjeta roja - Sí/No`, tarjetaRoja);
            // console.log(`Tarjeta roja - Sí/No`);
            index = -1;
        }
        opcionNavBar = false;
    } else {
        console.log("ERROR: no se puedo navegar a la sesion de Tarjetas/penaltis");
    }
    ///////////////////////////////////////////////////////////////////// AQUI TERMINA EL ESCANEO DE LA SESION Tarjetas/penaltis ////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////   OTROS  ////////////////////////////////////////////////////////////////////////////////

    // console.log('navbar antes de otros',opcionNavBar);
    opcionNavBar = await clickNavBar(page, "Otro");
    opcionNavBar = opcionNavBar.filter((filter) => filter !== false);
    // console.log('navbar despues de otros',opcionNavBar.length);

    await new Promise((resolve) => setTimeout(resolve, 500));
    // ++++++++++++++++++++++++++++++++++++++++ cuota sin empate +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (opcionNavBar.length > 0) {
        await opcionesClick(page);
        opcionPanel = await page.$$(".option-panel");
        index = await buscarIndex(
            opcionPanel,
            sesionSelector,
            `Ganador sin empate`
        );
        if (index !== -1) {
            sesionActual = opcionPanel[index];
            // await sesionActual.click();
            await new Promise((resolve) => setTimeout(resolve, 500));
            sinEmpate = await extraerSinEmpateBw(sesionActual, cuotaSelector);
            // console.log(`cuota sin empate`, sinEmpate);
            // console.log(`cuota sin empate`);
        }
        // ++++++++++++++++++++++++++++++++++++++++ cuota sin empate parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        click = await clickBw(sesionActual, alDescanso);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (click && index !== -1) {
            sinEmpateParte1 = await extraerSinEmpateBw(sesionActual, cuotaSelector);
            // console.log(`cuota sin empate parte 1`, sinEmpateParte1);
            // console.log(`cuota sin empate parte 1`);
        }
    } else {
        console.log("ERROR: no se puedo navegar a la sesion de OTROS");
    }
    var liga = await page.$(".breadcrumb-items");
    liga = await liga.evaluate((el) => el.textContent.trim);
    //   console.log('liga',liga);
    const modeloFutbol = new Futbol(
        liga,
        local,
        visitante,
        resultadoFinal,
        totalGoles,
        dobleOportunidad,
        ambosMarcan,
        sinEmpate,
        totalGolesLocal,
        totalGolesVisitante,
        resultadoParte1,
        sinEmpateParte1,
        dobleOportunidadParte1,
        ambosMarcanParte1,
        totalGolesParte1,
        totalGolesLocalParte1,
        totalGolesVisitanteParte1,
        resultadoParte2,
        totalGolesParte2,
        handicapAsiatico,
        handicapTotal,
        handicapAsiaticoParte1,
        handicapTotalParte1,
        totalTarjetas,
        totalTarjetasLocal,
        totalTarjetasVisitante,
        tarjetaRoja,
        totalCorner,
        totalCornerParte1,
        totalCornerParte2,
        totalCornerLocal,
        totalCornerVisitante,
        totalCornerLocalParte1,
        totalCornerVisitanteParte1,
        totalCornerLocalParte2,
        totalCornerVisitanteParte2
    );
    // listaBw.push(modeloFutbol);
    console.log("termino  Scraping bw");

    page.close();
    return modeloFutbol;
};

module.exports = { futbolDataBw, listaFutbolBw };
