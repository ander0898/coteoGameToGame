const { browser } = require("../browserServices/browserservice");
const { buscarIndex } = require("./buscarIndex");
const { extraerCuotasPartido } = require("./metodosFutbol/extraerCuotasPartido");
const { extraerDobleOportunidad } = require("./metodosFutbol/extraerDobleOportunidad");
const { extraerHandicapAsiatico } = require("./metodosFutbol/extraerHandicapAsiatico");
const { extraerTotalGoles } = require("./metodosFutbol/extraerTotalGoles");
const { extraerAmbosMarcan } = require("./metodosFutbol/extraerAmbosMarcan");
const { timeout } = require("puppeteer");
const { extratorDataInicial } = require("./extractorDataInicialServices");
const { Futbol } = require("../../Models/FutbolModel");
const listaFutbol = [];
const futbolData = async (link, local, visitante, liga) => {
        // varibales del modelo futbol
        var resultadoFinal;
        var totalGoles;
        var dobleOportunidad;
        var ambosMarcan;
        var sinEmpate;
        var totalGolesLocal;
        var totalGolesVisitante;
        var resultadoParte1;
        var sinEmpateParte1;
        var dobleOportunidadParte1;
        var ambosMarcanParte1;
        var totalGolesParte1;
        var totalGolesParte2;
        var totalGolesLocalParte1;
        var totalGolesVisitanteParte1;
        var resultadoParte2;
        var handicapAsiatico;
        var handicapAsiaticoParte1;
        var handicapTotal;
        var handicapTotalParte1;
        var totalTarjetas;
        var totalTarjetasLocal;
        var totalTarjetasVisitante;
        var tarjetaRoja;
        var totalCorner;
        var totalCornerParte1;
        var totalCornerParte2;
        var totalCornerLocal;
        var totalCornerVisitante;
        var totalCornerLocalParte1;
        var totalCornerVisitanteParte1;
        var totalCornerLocalParte2;
        var totalCornerVisitanteParte2;
        // variables de los selectores
        const cuotaSelector= 'sc-kAyceB.gIMtGL';
        const sesionSelector = 'KambiBC-bet-offer-subcategory__label';



        // variables de busqueda en la pagina
        // var tiempoReglamentarioClass;
        // var golesTotalClass;
        // var oportunidadDobleClass;
        // var marcanAmbosClass;
        // var index;

        //--------------------------------------------------------------
        const browserInstance = await browser();
        const page = await browserInstance.newPage();
        // await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(link, {
                waitUntil: "networkidle0",
                timeout: 40000
        }).catch(err => { console.error(err.message) });
        function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
        }
        console.log('iniciando scraping en Rh');
        const plegables = await page.$$('.iunwi');
        for (let i = 0; i < plegables.length; i++) {
                try {
                        await plegables[i].click();
                        if(i === plegables.length-1){
                                await delay(2000);
                        }
                } catch (err) {
                        console.error('error al hacer click en el elemento #:' + i);
                }
                // await delay(2000);
        }
        // NOTA REVISAR LUEGO POR QUE NO ABRE TODOS LOS COMPONENTES 
        const button = await page.$$('.KambiBC-outcomes-list__toggler-toggle-button.down');
        // console.log(button.length);
        for (let i = 0; i < button.length; i++) {
                try {
                        await button[i].click();
                } catch (err) {
                        console.error('error al hacer click en el botón #:' + i);
                }
                await delay(500);
        }
        
        // +++++++++++++++++++++++++++++++++++++ extraer cuotas  del resultado final ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        const tiempoReglamentarioClass = await page.$$('.KambiBC-bet-offer-subcategory--onecrosstwo').catch(err => err.message);
        index = await buscarIndex(tiempoReglamentarioClass,sesionSelector, 'Tiempo reglamentario');
        if(index >= 0){
                resultadoFinal = await extraerCuotasPartido(tiempoReglamentarioClass[index], cuotaSelector);
                // console.log(index, 'resultadoFinal', resultadoFinal);
        }

        // ++++++++++++++++++++++++++++++++++++++++ cuota sin empate ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ya bw

        index = await buscarIndex(tiempoReglamentarioClass,sesionSelector, 'Apuesta sin empate');
        if(index >= 0){
                sinEmpate = await extraerCuotasPartido(tiempoReglamentarioClass[index],cuotaSelector);
                // console.log(index, 'sinEmpate', sinEmpate);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++ resultado al descanso ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw 

        index = await buscarIndex(tiempoReglamentarioClass,sesionSelector, 'Descanso');
        if(index >= 0){
                resultadoParte1 = await extraerCuotasPartido(tiempoReglamentarioClass[index],cuotaSelector);
                // console.log(index, 'resultadoParte1', resultadoParte1);
        }
        // +++++++++++++++++++++++++++++++++++++++++++++++++ resultado parte 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(tiempoReglamentarioClass,sesionSelector, '2.ª parte');
        if(index >= 0){
                resultadoParte2 = await extraerCuotasPartido(tiempoReglamentarioClass[index],cuotaSelector);
                // console.log(index, 'resultadoParte2', resultadoParte2);
        }

        // ++++++++++++++++++++++++++++++++++++++++ cuota sin empate parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(tiempoReglamentarioClass,sesionSelector, 'Apuesta sin empate - 1.ª parte');
        if(index >= 0){
                sinEmpateParte1 = await extraerCuotasPartido(tiempoReglamentarioClass[index],cuotaSelector);
                // console.log(index, 'sinEmpateParte1', sinEmpateParte1);
        }

        //+++++++++++++++++++++++++++++++++++ extraer cuotas del total de goles +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        const golesTotalClass = await page.$$('.KambiBC-bet-offer-subcategory--overunder'); // esta clase tambien la utiliza la lista de tarjetas 
        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de goles');
        if(index >= 0){
                totalGoles = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, 'Total de goles', totalGoles);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++++ total goles parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw
        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de goles - 1.ª parte');
        if(index >= 0){
                totalGolesParte1 = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, 'Total de goles parte 1', totalGolesParte1);
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++++ total goles parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ya bw
        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de goles - 2.ª parte');
        if(index >= 0){
                totalGolesParte2 = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, 'Total de goles parte 1', totalGolesParte2);
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++ total de goles Local +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de goles de ${local}`);
        if(index >= 0){
                totalGolesLocal = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, `Total de goles ${local}`, totalGolesLocal);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++ total de goles visitante +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ya bw 

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de goles de ${visitante}`);
        if(index >= 0){
                totalGolesVisitante = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, `Total de goles ${visitante}`, totalGolesVisitante);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++ total de goles Local parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de goles de ${local} - 1ª mitad`);
        if(index >= 0){
                totalGolesLocalParte1 = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, `Total de goles de ${local} - 1ª mitad`, totalGolesLocalParte1);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++ total de goles visitante parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de goles de ${visitante} - 1ª mitad`);
        if(index >= 0){
                totalGolesVisitanteParte1 = await extraerTotalGoles(golesTotalClass[index]);
                // console.log(index, `Total de goles de ${visitante} - 1ª mitad`, totalGolesVisitanteParte1);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // +++++++++++++++++++++++++++++++++++++++ extraer cuotas de doble oportunidad ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        const oportunidadDobleClass = await page.$$('.KambiBC-bet-offer-subcategory--doublechance');
        index = await buscarIndex(oportunidadDobleClass, sesionSelector, 'Doble Oportunidad');
        if(index >= 0){
                dobleOportunidad = await extraerDobleOportunidad(oportunidadDobleClass[index],cuotaSelector);
        }
        // console.log(index, 'doble oportunidad', dobleOportunidad);

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // +++++++++++++++++++++++++++++++++++++++ extraer cuotas de doble oportunidad parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(oportunidadDobleClass, sesionSelector, 'Doble Oportunidad - 1.ª parte');
        if(index >= 0){
                dobleOportunidadParte1 = await extraerDobleOportunidad(oportunidadDobleClass[index], cuotaSelector);
                // console.log(index, 'doble oportunidad parte 1', dobleOportunidadParte1);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++ cuotas de ambos marcan ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        const marcanAmbosClass = await page.$$('.KambiBC-bet-offer-subcategory--yesno');
        index = await buscarIndex(marcanAmbosClass,sesionSelector, 'Ambos Equipos Marcarán')
        if(index >= 0){
                ambosMarcan = await extraerAmbosMarcan(marcanAmbosClass[index],cuotaSelector);
                // console.log(index, 'ambos marcan', ambosMarcan);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++ cuotas de ambos marcan parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw
        index = await buscarIndex(marcanAmbosClass,sesionSelector, 'Ambos Equipos Marcarán - 1.ª parte')
        if(index >= 0){
                ambosMarcanParte1 = await extraerAmbosMarcan(marcanAmbosClass[index],cuotaSelector);
                // console.log(index, 'ambos marcan 1', ambosMarcanParte1);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++ handicap asiantico +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        const handicapAsiaticoClass = await page.$$('.KambiBC-bet-offer-subcategory--asian');
        index = await buscarIndex(handicapAsiaticoClass,sesionSelector, 'Hándicap Asiático');
        if(index >= 0){
                handicapAsiatico = await extraerHandicapAsiatico(handicapAsiaticoClass[index], local, visitante);
                // console.log(index, 'handicap asiantico', handicapAsiatico);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++++++++++++++++++++++++++++++++++ handicap asiantico parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

        index = await buscarIndex(handicapAsiaticoClass,sesionSelector, 'Hándicap asiático - 1.ª parte');
        if(index >= 0){
                handicapAsiaticoParte1 = await extraerHandicapAsiatico(handicapAsiaticoClass[index], local, visitante);
                // console.log(index, 'handicap asiantico parte 1', handicapAsiaticoParte1);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++ handicap total +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        const handicapTotalClass = await page.$$('.KambiBC-bet-offer-subcategory--asianoverunder');
        index = await buscarIndex(handicapTotalClass,sesionSelector, 'Total asiático');
        if(index >= 0){
                handicapTotal = await extraerTotalGoles(handicapTotalClass[index]);
                // console.log(index, 'handicap total', handicapTotal);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++ handicap total parte 1+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        index = await buscarIndex(handicapTotalClass,sesionSelector, 'Total asiático - 1.ª parte');
        if(index >= 0){
                handicapTotalParte1 = await extraerTotalGoles(handicapTotalClass[index]); // REVISAR POR QUE NO DESPLIEGA TODAS LAS OPCIONES DEL HANDICAP TOTAL PARTE 1
                // console.log(index, 'handicap total parte 1', handicapTotalParte1);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++ total tarjetas ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de tarjetas');
        if(index >= 0){
                totalTarjetas = await extraerTotalGoles(golesTotalClass[index]);  // el metodo para los goles es funcional para las tarjetas 
                // console.log(index, 'Total tarjetas', totalTarjetas);
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++ total tarjetas local  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de tarjetas - ${local}`);
        if(index >= 0){
                totalTarjetasLocal = await extraerTotalGoles(golesTotalClass[index]);  // el metodo para los goles es funcional para las tarjetas 
                // console.log(index, 'Total tarjetas local', totalTarjetasLocal);
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //+++++++++++++++++++++++++++++++++++++++++++ total tarjetas visitante  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de tarjetas - ${visitante}`);
        if(index >= 0){
                totalTarjetasVisitante = await extraerTotalGoles(golesTotalClass[index]);  // el metodo para los goles es funcional para las tarjetas 
                // console.log(index, 'Total tarjetas visitante', totalTarjetasVisitante);
        }

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++ trajeta Roja +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ya bw

        index = await buscarIndex(marcanAmbosClass,sesionSelector, 'Tarjeta Roja mostrada');
        if(index >= 0){
                tarjetaRoja = await extraerAmbosMarcan(marcanAmbosClass[index],cuotaSelector);    // el metodo extareAmbosMarcan funciona para las tarjetas roja 
                // console.log(index, 'Tarjeta Roja', tarjetaRoja);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de Tiros de Esquina');
        if(index >= 0){
                totalCorner = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, 'Total Corner', totalCorner);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de Tiros de Esquina - 1.ª parte');
        if(index >= 0){
                totalCornerParte1 = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, 'Total Corner parte 1', totalCornerParte1);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners parte 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw 

        index = await buscarIndex(golesTotalClass,sesionSelector, 'Total de Tiros de Esquina - 2.ª parte');
        if(index >= 0){
                totalCornerParte2 = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, 'Total Corner parte 2', totalCornerParte2);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners local +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw 

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de Tiros de Esquina a favor de ${local}`);
        if(index >= 0){
                totalCornerLocal = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, `Total de Tiros de Esquina a favor de ${local}`, totalCornerLocal);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners local parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Número total de tiros de esquina por parte de ${local} - 1ª parte`);
        if(index >= 0){
                totalCornerLocalParte1 = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, `Número total de tiros de esquina por parte de ${local} - 1ª parte`, totalCornerLocalParte1);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners local parte 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Número total de tiros de esquina por parte de ${local} - 2ª parte`);
        if(index >= 0){
                totalCornerLocalParte2 = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, `Número total de tiros de esquina por parte de ${local} - 2ª parte`, totalCornerLocalParte2);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners visitantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya  bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Total de Tiros de Esquina a favor de ${visitante}`);
        if(index >= 0){
                totalCornerVisitante = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, `Total de Tiros de Esquina a favor de ${visitante}`, totalCornerVisitante);
        }

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners visitante parte 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw 

        index = await buscarIndex(golesTotalClass,sesionSelector, `Número total de tiros de esquina por parte de ${visitante} - 1ª parte`);
        if(index >= 0){
                totalCornerVisitanteParte1 = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, `Número total de tiros de esquina por parte de ${visitante} - 1ª parte`, totalCornerVisitanteParte1);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++ total Corners visitante parte 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ya bw

        index = await buscarIndex(golesTotalClass,sesionSelector, `Número total de tiros de esquina por parte de ${visitante} - 2ª parte`);
        if(index >= 0){
                totalCornerVisitanteParte2 = await extraerTotalGoles(golesTotalClass[index]); // el metodo extrarTotalGoles se ajusta para el total de corners
                // console.log(index, `Número total de tiros de esquina por parte de ${visitante} - 2ª parte`, totalCornerVisitanteParte2);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const modeloFutbol = new Futbol(liga, local, visitante, resultadoFinal, totalGoles, dobleOportunidad, ambosMarcan, sinEmpate, totalGolesLocal,
                totalGolesVisitante, resultadoParte1, sinEmpateParte1, dobleOportunidadParte1, ambosMarcanParte1, totalGolesParte1, totalGolesLocalParte1,
                totalGolesVisitanteParte1, resultadoParte2, totalGolesParte2,
                handicapAsiatico, handicapTotal, handicapAsiaticoParte1, handicapTotalParte1, totalTarjetas, totalTarjetasLocal, totalTarjetasVisitante,
                tarjetaRoja, totalCorner, totalCornerParte1, totalCornerParte2, totalCornerLocal,
                totalCornerVisitante, totalCornerLocalParte1, totalCornerVisitanteParte1,
                totalCornerLocalParte2, totalCornerVisitanteParte2
        )
        // listaFutbol.push(modeloFutbol);
        await page.close();
        console.log('Termino scraping en Rh');
        return modeloFutbol? modeloFutbol: false;
};

module.exports = { futbolData, listaFutbol };