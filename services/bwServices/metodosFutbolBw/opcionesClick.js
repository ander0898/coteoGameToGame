const opcionesClick = async (page) => {
    await page.waitForSelector(".option-panel", { visible: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const opciones = await page.$$(".option-panel"); // Obtiene los elementos con Puppeteer

    let resultados = [];

    for (let element of opciones) {
        try{
            const menuBody = await element.$(".option-panel-body");
            if (!menuBody) {
                await element.click(); // Hace click de manera segura
                resultados.push(true);
                await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña espera para evitar clicks demasiado rápidos
            } else {
                resultados.push(false);
            }

        }catch(err){

        }
    }

    // console.log(resultados);
};

module.exports = { opcionesClick };
