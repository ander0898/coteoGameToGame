// const puppeteer = require('puppeteer');
// const ramdonUser = require('random-useragent');
// const SportModel = require('../Models/SportModel.js');
const SportModel = require("../../Models/sportModel.cjs");
// const { browser } = require("./browserController.js");
// const { pageRushbet } = require("../Controllers/pageRushbetController.js");
let listaRushbet = [];
async function sportData(pageRushbet,deporte) {
  try{ 
    console.log('iniciando escaneo',deporte);
    // usamos el navegador ya iniciado con su pagina
  const page = await pageRushbet;
  // console.log(page);
  //  instanciamos la clase que queremos atacar creando un arreglo de elementos
  const DataRushbet = await page.$$(
    ".CollapsibleContainer__CollapsibleWrapper-sc-14bpk80-0"
  );
  console.log('conjuto de elementos',DataRushbet.length);
  // recorre y desglosa los elementos extraidos de la web
  const lista = await Promise.all(
    DataRushbet.map(async (element) => {
      // evaluamos el contenido del elemento para extraer la informacion de los deportes y ligas
      return await element.evaluate((el, deporteExterno) => {
        const DeporSinEmpate = [
          "Baloncesto",
          "Bádminton",
          "Críquet",
          "Dardos",
          "E-sports",
          "Fútbol Americano",
          "Snooker",
          "Tenis",
          "Tenis Mesa",
          "Voleibol",
        ];
        const DeporConEmpate = [
          "Fútbol",
          "Hockey Césped",
          "Hockey Hielo",
          "Waterpolo",
          "Balonmano",
          "Golf",
        ];
        var deporte = deporteExterno || '';
        var liga = "";
        var listaPartidos = [];
        var partido = {
          local: "",
          visitante: "",
        };
        var cuotas = {
          local: "",
          empate: "",
          visitante: "",
        };
        var fecha 
        var horaInit
        const diasSemana = {
          'lun': 1,
          'mar': 2,
          'mié': 3,
          'jue': 4,
          'vie': 5,
          'sáb': 6,
          'dom': 7
        };
        // creamos un arreglo de las clases que queremos obtener datos
        const elementos = Array.from(
          el.querySelectorAll(`.CollapsibleContainer__HeaderWrapper-sc-14bpk80-1.kBYZVk, 
                                                               .CollapsibleContainer__HeaderWrapper-sc-14bpk80-1.jeFboi, 
                                                               .KambiBC-event-participants,
                                                               .KambiBC-event-participants__name,
                                                               .KambiBC-betty-outcome,
                                                               .KambiBC-event-item__start-time--date,
                                                               .KambiBC-event-item__start-time--time`)
        );
        // se recorre el array anterior mente creado para ir añadiendo elementos en nustro objeto json
        elementos.forEach((e) => {
          // comprueba la existencia de la clase que contiene las fechas de los partidos
          if(e.classList.contains('KambiBC-event-item__start-time--date')){
            const datafecha = e.textContent.trim();
            const hoy = new Date();
            const diaHoy = hoy.getDay();
            
            const diaDestino = diasSemana[datafecha.toLowerCase()];
            let diferenciaDias = diaDestino - diaHoy;
            if(diferenciaDias === 0){
              diferenciaDias = 0;
            }else if(diferenciaDias < 0){
              diferenciaDias += 7;
            }
            hoy.setDate(hoy.getDate()+diferenciaDias);
            fecha = hoy.toLocaleDateString('es-Es')
          }
          if(e.classList.contains('KambiBC-event-item__start-time--time')){
            horaInit= e.textContent.trim();
          }
          // comprueba la existencia de la clase que pertenece a los deportes
          if (e.classList.contains("kBYZVk")) {
            if (
              (deporte === "" ||  DeporConEmpate.includes(e.textContent.trim()) || DeporSinEmpate.includes(e.textContent.trim())) &&
              e.textContent.trim() !== undefined
            ) {
              deporte = e.textContent.trim();
            }
          }
          // comprueba la existencia de la clase que contiene las ligas
          else if (e.classList.contains("jeFboi")) {
            if (
              (liga === "" || e.textContent.trim() !== liga) &&
              e.textContent.trim() !== undefined
            ) {
              liga = e.textContent.trim();
            }
          }
          // // comprueba la existencia de la clase que contiene los partidos
          else if (e.classList.contains("KambiBC-event-participants__name")) {
            const partidoTexto = e.textContent.trim();
            if (partido.local === "")
              partido = {
                local: partidoTexto,
                visitante: "",
              };
            if (partido.local !== partidoTexto && partido.visitante === "") {
              partido.visitante = partidoTexto;
            }
          }
          // comprueba y toma el valor da las cuotas
          else if (e.classList.contains("KambiBC-betty-outcome")) {
            let cuotastexto = e.textContent.split(/[^0-9.]+/).filter(Boolean);
            partido.deporte = deporte;
            partido.fecha =  fecha;
            partido.horaInit = horaInit;
            if (DeporSinEmpate.includes(deporte)) {
              if (cuotas.local === "" && cuotas.visitante === "") {
                cuotas.local = cuotastexto;
              } else if (cuotas.local !== "" && cuotas.visitante === "") {
                cuotas.visitante = cuotastexto;
                partido.liga = liga;
                partido.cuotas = cuotas;
                listaPartidos.push(partido);
                partido = {
                  local: "",
                  visitante: "",
                };
                cuotas = {
                  local: "",
                  empate: "",
                  visitante: "",
                };
              }
            } else if (DeporConEmpate.includes(deporte)) {
              if (
                cuotas.local === "" &&
                cuotas.visitante === "" &&
                cuotas.empate === ""
              ) {
                cuotas.local = cuotastexto;
              } else if (
                cuotas.local !== "" &&
                cuotas.visitante === "" &&
                cuotas.empate === ""
              ) {
                cuotas.empate = cuotastexto;
              } else if (
                cuotas.local !== "" &&
                cuotas.visitante === "" &&
                cuotas.empate !== ""
              ) {
                cuotas.visitante = cuotastexto;
                partido.liga = liga;
                partido.cuotas = cuotas;
                listaPartidos.push(partido);
                cuotas = {
                  local: "",
                  empate: "",
                  visitante: "",
                };
                partido = {
                  local: "",
                  visitante: "",
                };
              }
            }
          }
        });
        return listaPartidos;
      },
      deporte
    );
    })
  );
//  filtramos la informacion para eliminar objetos sin datos
  const dataFilter = lista.filter((element) => Object.keys(element).length > 0);

//  acoplamos la informacion a nuestro modelo
  const resultado =  dataFilter.flatMap(element =>{
    var data
    return element.map(item => {
      const deporte = item.deporte;
      const liga = item.liga;
      const local = item.local;
      const visitante = item.visitante;
      const cuotaLocal = item.cuotas.local.toString();
      const cuotaVisitante = item.cuotas.visitante.toString();
      const cuotaEmpate = item.cuotas.empate.toString();
      const horaInit = item.horaInit;
      const fecha= item.fecha;
      // console.log(item.cuotas.local);
      if(deporte && liga && local && visitante && cuotaLocal && cuotaVisitante && horaInit && fecha){
        if(listaRushbet?.local?.includes(local) && listaRushbet?.visitante?.includes(visitante)){
            data = new SportModel(deporte,liga,fecha,horaInit,local, visitante,cuotaLocal, cuotaVisitante, cuotaEmpate);
            const index = listaRushbet.local.indexOf(local);
            console.log(index,data)
            return listaRushbet[index]=data;
        }else{
          data = new SportModel(deporte,liga,fecha,horaInit,local, visitante,cuotaLocal, cuotaVisitante, cuotaEmpate);
          // console.log(data)
          return listaRushbet.push(data)
        }
      }
    })
  })
  // console.log(lista)
  
  //  listaRushbet.push(resultado);
  return resultado;
}catch(err){
  console.error('Error de datos', err)
}
}

module.exports = { sportData, listaRushbet };
