intentoMaximo = 6;
intento = 0;
let resultados = [];
const opcionesClick = async (page) => {
    await page.waitForSelector(".option-panel", { visible: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const opciones = await page.$$(".option-panel"); // Obtiene los elementos con Puppeteer
    var menuBody = await page.$$('.option-panel-body');
    console.log(menuBody.length+" "+ opciones.length);

    for (let element of opciones) {
        try{
            const menuBodyClick = await element.$(".option-panel-body");
            if (!menuBodyClick) {
                await element.click(); // Hace click de manera segura
                // resultados.push(true);
                await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña espera para evitar clicks demasiado rápidos
            } else {
                resultados.push(false);
            }

        }catch(err){
            // console.log('elemento no clikeable');
            // resultados.push(false);
        }
    }

    if(menuBody.length !== opciones.length){
        intento++;
        // console.log(resultados);
        // resultados = [];
        // console.log(resultados);
        await opcionesClick(page);
    }else{
        // console.warn('No se pudo dar click en :'+ resultados.length);
    }

    // console.log(resultados);
};

module.exports = { opcionesClick };
