const { browser } = require("../browserServices/browserservice")
const levenshtein = require('fast-levenshtein');
const { tenisDataCod } = require("./tenisDataCodService");

var intento = 0;
var page;
const buscarGameCod = async (local, visitante, deporte)=>{
    const MAX_INTENTOS = 2;
    var res = false;
    try{
        console.log('inicia la  busqueda en  Cod');
        if (intento >= MAX_INTENTOS) {
            console.log("Máximo de intentos alcanzado. Retornando false.");
            intento = 0; // Reiniciar el contador
            return false;
        }
        const Browser = await browser();
        page = await Browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        await page.goto('https://m.codere.com.co/deportesCol/#/MercadosPage'),{
            waitUntil: "networkidle0",
        };
        local = organizarName(local);
        visitante = organizarName(visitante);
        console.log('Cod', local, visitante);
        const selectorInput = '#ion-input-0'
        // const inputBuscar = await page.$(selectorInput);
        // if(inputBuscar){
            // await inputBuscar.click();
            // await inputBuscar.click();//  click con interfaz para quitar la ventana de cookies
            await new Promise(resolve =>  setTimeout(resolve, 1000) );
            await page.type(selectorInput, local );
            await new Promise(resolve =>  setTimeout(resolve, 3000) );
            const campoResultados = await page.$('.search-accordion-group');
            if(campoResultados){
                const participantesConteiner = await page.$$('.search-accordion--item-content-name') 
                for(const element of participantesConteiner){
                const participantes = await element.evaluate(el => el.textContent.trim());
                const dividirCadena = participantes.split('-');
                let localBusqueda = dividirCadena[0].trim();
                let visitanteBusqueda = dividirCadena[1].trim();
                if(localBusqueda && visitanteBusqueda){
                    localBusqueda = await quitarTildes(localBusqueda);
                    visitanteBusqueda = await quitarTildes(visitanteBusqueda)
                    const coincideLocal = levenshtein.get(local,localBusqueda);
                    const coincideVisitante = levenshtein.get(visitante, visitanteBusqueda);

                    console.log(localBusqueda,coincideLocal, local);
                    console.log(visitanteBusqueda,coincideVisitante, visitante);

                    if((coincideLocal < 5 && coincideVisitante < 5)
                        || coincideLocal === 0 || coincideVisitante === 0){
                        // await participantesConteiner.click();
                        await element.click();//click  para quitar la ventana de cookies
                        await element.click();
                        await new Promise(resolve =>  setTimeout(resolve, 1000) );
                        res = await tenisDataCod(page);
                        break;
                        }
                    }
                }
            }else{
                console.log('no se encontro el nombre')
            }
        // }
        console.log('termino la  busqueda en  Cod');
        intento = 0;
        return res!==false? res:false;
    }catch(err){
        console.log(`Error en el intento ${intento + 1}: ${err.message}`);
        intento++;
        await page.close();
        console.log('Reintentando....');
        return await buscarGameCod(local, visitante, deporte);
    }
}

const organizarName = (str) => {
    const dividirCadena = str.split(',');
    if (dividirCadena.length < 2) return quitarTildes(str); // Si el formato no es válido, devuelve el texto sin cambios.

    const parte1 = quitarTildes(dividirCadena[1].trim()); // Quitamos espacios extras
    const parte2 = quitarTildes(dividirCadena[0].trim());

    return `${parte1} ${parte2}`;
};
const quitarTildes = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

module.exports ={buscarGameCod}; 