const { Deportes } = require("../utils/deportes");
const { browser } = require("./browserServices/browserservice");
const { buscarGame } = require("./bwServices/buscarGameService");
const { futbolData } = require("./RbServices/futbolDataServices");
const { pageRushbet } = require("./RbServices/pageRusbetServices");
const listaRh = [];
const listaBw = [];

const iniciarServices = async ( ) =>{
  //   console.log('services')
  var contadorParidos = 0;
  var contador = 0;
    await browser();
    const Promises = Deportes.map(async (item)=>{
    const response = await pageRushbet(item.url, item.nombre);
    contadorParidos= response.length;
    console.log('Total Partidos: '+ contadorParidos);
    for(const element of  response){
      const local = element.partido?.local;
      const visitante = element.partido?.visitante;
      const BusquedaBw = await buscarGame(local, visitante );
      if(BusquedaBw){
        listaBw.push(BusquedaBw)
        const BusquedaRh = await futbolData(element.link, local, visitante, element.liga);
        if(BusquedaRh){
          listaRh.push(BusquedaRh);
        }else{
          listaBw.pop();
        }
      }
      contador++;
      let restan = (contadorParidos-1) - contador
      console.log('partido #:', contador, 'FALTAN #:', restan );
      // break; // denetner en la primer siclo 
    }
  });
  await Promise.all(Promises);
  // const BusquedaBw = await buscarGame('Real Sociedad', 'Osasuna' );
  // const BusquedaRh = await futbolData(`https://www.rushbet.co/?page=sportsbook#event/1021042784`, 'Chelsea', 'West Ham', 'Premier League');
    console.log('****************TERMINO LA EJECUCION******************');
  // Deportes.forEach(item =>{
  //   pageRushbet(item.url, item.nombre).then((response)=>{
  //     let contador = 0;
  //     response.forEach(async (element)=>{
  //       if(contador === 0){
  //         futbolData(element.link);
  //        const BusquedaRh = await futbolData('https://www.rushbet.co/?page=sportsbook#event/1021554725','RB Leipzig','Sporting Lisboa', 'Champions League');
  //         console.log(BusquedaRh);
  //       }
  //       contador++;
  //     })
  //   });
  // })
}

module.exports = {iniciarServices, listaRh, listaBw};