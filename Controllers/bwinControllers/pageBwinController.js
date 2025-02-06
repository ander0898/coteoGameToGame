// const browser = require("../browserController");

let page
//*********************************************************************************************** */
// esta funcion se encarga de cargar la pagina principal de bwin para exportarla 
//*********************************************************************************************** */
const pageBwin = async (Browser)=>{
    try{
        if(!page){
            const browserinstance = Browser;
            page = await browserinstance.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto('https://sports.bwin.co/es/sports')
            console.log('inciando Bwin...');
            // await new Promise(resulve => setTimeout(resulve, 5000));
            console.log('Bwin Cargado...')

            await page.waitForSelector('.grid-info-wrapper.image');
            

            
            
            return page
        }


    }catch(err){
        console.error('Error al abrir la página de Bwin: ', err);
    }
}

module.exports = { pageBwin };