const { timeout } = require("puppeteer");
const puppeteer = require("puppeteer");
let browserinstance = null;
// -------------------------------------------------------------------------- iniciar el browser--------------------------------------------------------------------------
// crea la instancia de un navegador y la importa 
async function browser(){

  try {
    if (!browserinstance) {
      browserinstance = await puppeteer.launch({ headless: true });
      return browserinstance;
    }
    return browserinstance;
  } catch (error) {
    console.error("puppeter no se pudo iniciar");
    console.error("cargando de nuevo............");
    await browserinstance.close();
    browser();
  }

//   pageRushbet();
  
};

module.exports =  { browser } ;