const Futbol = require('../../Models/FutbolModel');
const { browser } = require('../browserServices/browserservice');
const { extratorDataInicial } = require('./extractorDataInicialServices');
let page;
var Button = '';
var text = '';
const listaFutbol = [];
//funcion que nos permite interactuar con la pagina de Rb y abrir los componenetes necesarios
const pageRushbet = async (url, deporte) => {
  var contador;
  try {
    // console.log(Browser)
    // if (!page) {
    // const page = await browser().newPage();


    const browserinstance = await browser();
    page = await browserinstance.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url,
      {
        waitUntil: "networkidle0"
      }
    );

    console.log("rushtbet cargando.....");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("rushtbet cargado");
    await page.waitForSelector(
      ".CollapsibleContainer__HeadElemTop-sc-14bpk80-3"
    ).catch(err => console.error(err.message, 'no exite la clase a esperar '));
    console.log("abriendo componentes...");
    const sportsToClick = await page.$$(
      ".CollapsibleContainer__HeaderWrapper-sc-14bpk80-1.iunwi"
    );
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    for (let i = 0; i < sportsToClick.length; i++) {
      try {
        await sportsToClick[i].click();
      } catch {
        console.error(`Error al hacer click en el deporte ${i + 1}`);
        contador++;
        continue;
      }
      await delay(500);
    }

    const competitionToClick = await page.$$(
      ".CollapsibleContainer__HeaderWrapper-sc-14bpk80-1.dPmqCG"
    );
    for (let i = 0; i < competitionToClick.length; i++) {
      try {
        await competitionToClick[i].click();
        // console.log("click Rh", i);
      } catch {
        console.error(`Error al hacer click en la liga ${i + 1}`);
        contador++;
        continue;
      }
      await delay(500);
    }
    if (contador <= competitionToClick.length / 2) {
      throw new Error("error al abrir componentes");
    }
    console.log("componentes abiertos");
    console.log(
      "web lista. tiene: " +
      sportsToClick.length +
      " deportes y " +
      competitionToClick.length +
      " competecias "
    );
    const lista = await extratorDataInicial(page);
    if (deporte === "Futbol") {
      listaFutbol.push(lista);
      await page.close();
      return listaFutbol.flat();
    }
    await page.close();
    //  return page;
  } catch (error) {
    console.error("error en la pagina Rh", error.message);
  }
};
module.exports = { pageRushbet };
