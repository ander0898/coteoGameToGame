const { text } = require("express");
const { timeout } = require("puppeteer");
const { pageDataBwin } = require("./pageDataBwin");
const { ExtrarData } = require("./DataBwcontroller");
const e = require("express");

const listaDeportes = [
  
  // {
  //   link: "/es/sports/fútbol-4",
  //   deporte: "Fútbol",
  // },
  // {
  //     "link": "/es/sports/tenis-5",
  //     "deporte": "Tenis"
  // },
  // {
  //     "link": "/es/sports/baloncesto-7",
  //     "deporte": "Baloncesto"
  // },
  // {
  //     "link": "/es/sports/tenis-de-mesa-56",
  //     "deporte": "Tenis de mesa"
  // },
  // {
  //     "link": "/es/sports/fútbol-americano-11",
  //     "deporte": "Fútbol americano"
  // },
  // {
  //     "link": "/es/sports/voleibol-18",
  //     "deporte": "Voleibol"
  // },
  // {
  //     "link": "/es/sports/deportes-de-combate-45",
  //     "deporte": "Deportes de combate"
  // },
  // {
  //     "link": "/es/sports/balonmano-16",
  //     "deporte": "Balonmano"
  // },
  // {
  //     "link": "/es/sports/fórmula-1-6?fallback=true",
  //     "deporte": "Fórmula 1"
  // },
  // {
  //     "link": "/es/sports/hockey-sobre-hielo-12",
  //     "deporte": "Hockey sobre hielo"
  // },
  // {
  //     "link": "/es/sports/béisbol-23",
  //     "deporte": "Béisbol"
  // },
  // {
  //     "link": "/es/sports/ciclismo-10?fallback=true",
  //     "deporte": "Ciclismo"
  // },
  // {
  //     "link": "/es/sports/boxeo-24",
  //     "deporte": "Boxeo"
  // },
  // {
  //     "link": "/es/sports/dardos-34",
  //     "deporte": "Dardos"
  // },
  // {
  //   link: "/es/sports/ajedrez-67",
  //   deporte: "Ajedrez",
  // },
  {
    link: "/es/sports/bádminton-44",
    deporte: "Bádminton",
  },
  {
    link: "/es/sports/baloncesto-7",
    deporte: "Baloncesto",
  },
  {
    link: "/es/sports/balonmano-16",
    deporte: "Balonmano",
  },
  {
    link: "/es/sports/béisbol-23",
    deporte: "Béisbol",
  },
  // {
  //   link: "/es/sports/billar-americano-38",
  //   deporte: "Billar americano",
  // },
  {
    link: "/es/sports/boxeo-24",
    deporte: "Boxeo",
  },
  // {
  //   link: "/es/sports/ciclismo-10?fallback=true",
  //   deporte: "Ciclismo",
  // },
  {
    link: "/es/sports/cricket-22",
    deporte: 'Cricket  / Críquet',
  },
  // {
  //   link: "/es/sports/curling-68",
  //   deporte: "Curling",
  // },
  {
    link: "/es/sports/dardos-34",
    deporte: "Dardos",
  },
  // agregar en rushbet
  {
    link: "/es/sports/deportes-de-combate-45",
    deporte: "Deportes de combate",
  },
  // {
  //   link: "/es/sports/deportes-gaélicos-48?fallback=true",
  //   deporte: "Deportes gaélicos",
  // },
  // {
  //   link: "/es/sports/entretenimiento-60",
  //   deporte: "Entretenimiento",
  // },
  // {
  //   link: "/es/sports/esquí-alpino-9",
  //   deporte: "Esquí alpino",
  // },
  // {
  //   link: "/es/sports/esquí-de-fondo-94",
  //   deporte: "Esquí de fondo",
  // },
  // {
  //   link: "/es/sports/floorball-28",
  //   deporte: "Floorball",
  // },
  // {
  //   link: "/es/sports/fórmula-1-6?fallback=true",
  //   deporte: "Fórmula 1",
  // },
  {
    link: "/es/sports/fútbol-4",
    deporte: "Fútbol",
  },
  {
    link: "/es/sports/fútbol-americano-11",
    deporte: "Fútbol americano",
  },
  // {
  //   link: "/es/sports/fútbol-sala-70",
  //   deporte: "Fútbol sala",
  // },
  // {
  //   link: "/es/sports/golf-13?fallback=true",
  //   deporte: "Golf",
  // },
  {
    link: "/es/sports/hockey-sobre-hielo-12",
    deporte: "Hockey sobre hielo",
  },
  // {
  //   link: "/es/sports/nascar-39?fallback=true",
  //   deporte: "NASCAR",
  // },
  // {
  //   link: "/es/sports/pádel-87",
  //   deporte: "Pádel",
  // },
  {
    link: "/es/sports/rugby-league-31",
    deporte: "Rugby League",
  },
  {
    link: "/es/sports/rugby-union-32",
    deporte: "Rugby Union",
  },
  // {
  //   link: "/es/sports/salto-de-esquí-95?fallback=true",
  //   deporte: "Salto de esquí",
  // },
  {
    link: "/es/sports/snooker-33",
    deporte: "Snooker",
  },
  // {
  //   link: "/es/sports/surf-109",
  //   deporte: "Surf",
  // },
  {
    link: "/es/sports/tenis-5",
    deporte: "Tenis",
  },
  {
    link: "/es/sports/tenis-de-mesa-56",
    deporte: "Tenis de mesa",
  },
  {
    link: "/es/sports/voleibol-18",
    deporte: "Voleibol",
  },
  {
    link: "/es/sports/vóley-playa-63",
    deporte: "Vóley playa",
  },
  {
    link: "/es/sports/waterpolo-52",
    deporte: "Waterpolo",
  },
];

const listaDataBw = [];

//***************************************************************************************** */
// navega entre las paginas de los diferentes deportes 
//*********************************************************************************************** */
async function pageBwScrool(Browser) {
  let page;
  // Usamos un bucle for para esperar a que cada página se procese secuencialmente
  for (let element of listaDeportes) {
    // console.log(element.deporte);

    page = await Browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
   

    // Navegar a la URL correspondiente
    await page.goto(`https://sports.bwin.co/es/sports${element.link}/apuestas`,
    // {
    //   waitUntil: "networkidle0"
    // }
  );
    const pagina = page.url();
    // Esperar 2 segundos para que la página cargue
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const span = await page.$(".fast-svg");
    // if (span) {
    //   await span.click();
    // }
    let contador = 0;
    const deporte =  element.deporte;
    console.log(deporte);
    const paises = await page.$$('.list-item').catch(()=>'error')
    var guardar = 0;
    do{
      try{
      const element = await page.waitForSelector('.grid-footer',{timeout: 5000}).catch(()=> null);
      if(element){
        var elementFinal = await page.$('.grid-footer');
          if(elementFinal){
            contador++;
            // console.log('click Bw',contador)
            await new Promise((resolve) => setTimeout(resolve, 4000));
            await elementFinal.click().catch(async (err)=> 
              {
                if(page.url() === pagina){
                  console.log('guardo')
                  guardar++;
                  elementFinal = null;
                  listaDataBw.push(await ExtrarData(page, deporte));
                  await page.close();
                }else{
                  // console.log('cambio de pagina')
                  await page.goto(pagina);
                  await new Promise((resolve) => setTimeout(resolve, 10000));
                  throw new Error('cambio de pagina');
                }
                // console.log(await page.url());
                // console.log(listaDataBw)
              });
          }      

      }else{
        console.log('Nf guardo')
        listaDataBw.push(await ExtrarData(page, deporte));
        guardar++;
        await page.close();
        break;
      }
      
      }catch(err){
        console.log('error en Bw',err.message);
        continue;
      }
    }while(elementFinal && contador <= 100)
      if(guardar === 0){
        console.log('tm guardo')
        listaDataBw.push(await ExtrarData(page, deporte));
        await page.close();
      }
      // listaDataBw.push(await ExtrarData(page));
      // await page.close();
    
    //  console.log(listaDataBw)
   

    //  break; // momentane para para el ciclo
  }
  return;
}

module.exports = { pageBwScrool, listaDataBw };
