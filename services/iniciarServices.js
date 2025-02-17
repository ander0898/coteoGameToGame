const { Deportes } = require("../utils/deportes");
const { browser } = require("./browserServices/browserservice");
const { buscarGame } = require("./bwServices/buscarGameService");
const { buscarGameCod } = require("./codServices/buscarGameCodService");
const { futbolData } = require("./RbServices/futbolDataServices");
const { pageRushbet } = require("./RbServices/pageRusbetServices");
const { tenisData } = require("./RbServices/tenisDataServices");
const listaRh = [];
const listaBw = [];
const listaTenisRh=[];
const listaTenisBw=[];
const listaTenisCod=[];

const iniciarServices = async ( ) =>{
  //   console.log('services')
  var contadorParidos = 0;
  var contador = 0;
    await browser();
    const Promises = Deportes.map(async (item)=>{
    const deporte = item.nombre;
    const response = await pageRushbet(item.url, deporte);
    contadorParidos= response.length;
    console.log(`Total Partidos${deporte} : `+ contadorParidos);
    for(const element of  response){
      const local = element.partido?.local;
      const visitante = element.partido?.visitante;
      const busquedaCod = await buscarGameCod(local, visitante, deporte );
      var busquedaBw
      busquedaCod ? busquedaBw = await buscarGame(local, visitante, deporte): null;
      if(busquedaBw && busquedaCod){
        if(deporte === 'Futbol'){
          listaBw.push(busquedaBw)
          const busquedaRh = await futbolData(element.link, local, visitante, element.liga);
          if(busquedaRh){
            listaRh.push(busquedaRh);
          }else{
            listaBw.pop();
          }
        }
        if(deporte === 'Tenis'){
          listaTenisBw.push(busquedaBw);
          listaTenisCod.push(busquedaCod);
          const busquedaRh = await tenisData(element.link, local, visitante, element.liga);
          if(busquedaRh){
            listaTenisRh.push(busquedaRh);
          }else{
            listaTenisBw.pop();
            listaTenisCod.pop();
          }
        }
      }
      contador++;
      let restan = (contadorParidos) - contador
      console.log(`partido #: ${contador} FALTAN #: ${restan}` );
      // break; // denetner en la primer siclo 
    }
    // const busquedaBw = await buscarGame('Moutet, Corentin', 'Munar, Jaume', deporte );
    // const busquedaBw = await buscarGameCod('Tien, Learner', 'Walton, Adam', deporte );
    // const busquedaRh = await futbolData(`https://www.rushbet.co/?page=sportsbook#event/1021042784`, 'Chelsea', 'West Ham', 'Premier League');
    // const busquedaRh = await tenisData(`https://www.rushbet.co/?page=sportsbook#event/1022790226`, 'Rublev, Andrey', 'Hurkacz, Hubert', 'Challenger / Bribane');
  });
  await Promise.all(Promises);
    console.log('****************TERMINO LA EJECUCION******************');
  // Deportes.forEach(item =>{
  //   pageRushbet(item.url, item.nombre).then((response)=>{
  //     let contador = 0;
  //     response.forEach(async (element)=>{
  //       if(contador === 0){
  //         futbolData(element.link);
  //        const busquedaRh = await futbolData('https://www.rushbet.co/?page=sportsbook#event/1021554725','RB Leipzig','Sporting Lisboa', 'Champions League');
  //         console.log(busquedaRh);
  //       }
  //       contador++;
  //     })
  //   });
  // })
}

module.exports = {iniciarServices, listaRh, listaBw, listaTenisRh, listaTenisBw, listaTenisCod};