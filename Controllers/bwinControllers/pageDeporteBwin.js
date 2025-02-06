const { text } = require("express");
const { timeout } = require("puppeteer");
const { pageDataBwin } = require("./pageDataBwin");

const listaDeportes =  [
    // {
    //     "link": "/es/sports/fútbol-4",
    //     "deporte": "Fútbol"
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
    {
        "link": "/es/sports/ajedrez-67",
        "deporte": "Ajedrez"
    },
    {
        "link": "/es/sports/bádminton-44",
        "deporte": "Bádminton"
    },
    {
        "link": "/es/sports/baloncesto-7",
        "deporte": "Baloncesto"
    },
    {
        "link": "/es/sports/balonmano-16",
        "deporte": "Balonmano"
    },
    {
        "link": "/es/sports/béisbol-23",
        "deporte": "Béisbol"
    },
    {
        "link": "/es/sports/billar-americano-38",
        "deporte": "Billar americano"
    },
    {
        "link": "/es/sports/boxeo-24",
        "deporte": "Boxeo"
    },
    {
        "link": "/es/sports/ciclismo-10?fallback=true",
        "deporte": "Ciclismo"
    },
    {
        "link": "/es/sports/cricket-22",
        "deporte": "Cricket"
    },
    {
        "link": "/es/sports/curling-68",
        "deporte": "Curling"
    },
    {
        "link": "/es/sports/dardos-34",
        "deporte": "Dardos"
    },
    {
        "link": "/es/sports/deportes-de-combate-45",
        "deporte": "Deportes de combate"
    },
    {
        "link": "/es/sports/deportes-gaélicos-48?fallback=true",
        "deporte": "Deportes gaélicos"
    },
    {
        "link": "/es/sports/entretenimiento-60",
        "deporte": "Entretenimiento"
    },
    {
        "link": "/es/sports/esquí-alpino-9",
        "deporte": "Esquí alpino"
    },
    {
        "link": "/es/sports/esquí-de-fondo-94",
        "deporte": "Esquí de fondo"
    },
    {
        "link": "/es/sports/floorball-28",
        "deporte": "Floorball"
    },
    {
        "link": "/es/sports/fórmula-1-6?fallback=true",
        "deporte": "Fórmula 1"
    },
    {
        "link": "/es/sports/fútbol-4",
        "deporte": "Fútbol"
    },
    {
        "link": "/es/sports/fútbol-americano-11",
        "deporte": "Fútbol americano"
    },
    {
        "link": "/es/sports/fútbol-sala-70",
        "deporte": "Fútbol sala"
    },
    {
        "link": "/es/sports/golf-13?fallback=true",
        "deporte": "Golf"
    },
    {
        "link": "/es/sports/hockey-sobre-hielo-12",
        "deporte": "Hockey sobre hielo"
    },
    {
        "link": "/es/sports/nascar-39?fallback=true",
        "deporte": "NASCAR"
    },
    {
        "link": "/es/sports/pádel-87",
        "deporte": "Pádel"
    },
    {
        "link": "/es/sports/rugby-league-31",
        "deporte": "Rugby League"
    },
    {
        "link": "/es/sports/rugby-union-32",
        "deporte": "Rugby Union"
    },
    {
        "link": "/es/sports/salto-de-esquí-95?fallback=true",
        "deporte": "Salto de esquí"
    },
    {
        "link": "/es/sports/snooker-33",
        "deporte": "Snooker"
    },
    {
        "link": "/es/sports/surf-109",
        "deporte": "Surf"
    },
    {
        "link": "/es/sports/tenis-5",
        "deporte": "Tenis"
    },
    {
        "link": "/es/sports/tenis-de-mesa-56",
        "deporte": "Tenis de mesa"
    },
    {
        "link": "/es/sports/voleibol-18",
        "deporte": "Voleibol"
    },
    {
        "link": "/es/sports/vóley-playa-63",
        "deporte": "Vóley playa"
    },
    {
        "link": "/es/sports/waterpolo-52",
        "deporte": "Waterpolo"
    }
]

const listaLinks = [];

//***************************************************************************************** */
// esta funcion se encarga de ir navegando entre los diferentes links de los deportes para optener las competencias y sus links 
//*********************************************************************************************** */
async function pageDeporteBw(Browser) {
    let page;
    // Usamos un bucle for para esperar a que cada página se procese secuencialmente
    for (let element of listaDeportes) {
        // console.log(element.deporte);

        page = await Browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        // Navegar a la URL correspondiente
        await page.goto(`https://sports.bwin.co/es/sports${element.link}/apuestas`);
        
        // Esperar 2 segundos para que la página cargue
        await new Promise(resolve => setTimeout(resolve, 5000));
        // const span = await page.$('.fast-svg')
        // if(span){
            
        //     await span.click();
        // }
        //   ***************************************** usar cuando el navegador esta en false ****************************
        // const container = await page.$$('.list-item');
        // function delay(ms) {
        //     return new Promise((resolve) => setTimeout(resolve, ms));
        //   }
        // for(let i = 0; i < container.length-1; i++){
        //    try {
        //     const text = await container[i].evaluate(el => el.textContent);
        //     const texto = text.replace(/\d+/g, '')
        //     // console.log(texto)
        //     if(texto !== 'Todos los países' && texto !== 'Todas las competencias'){

        //         await container[i].click();
        //     }
        //     }catch(err){
        //         console.error('error',err.message);
        //         continue;
        //     }
        //     await delay(1000);

        // }

        const paises = await page.$$('.item-level-2')
        console.log('--->', paises.length);
        const data = await Promise.all(paises.map(async (items)=>{
            return await items.evaluate(e =>{
                const info = (Array.from(e.querySelectorAll('.ms-active-highlight'))).map((el,index) =>{
                    if(index === 0 ){
                        return el.href;
                    }
                }).filter(filtro => filtro !== undefined && filtro !== null && filtro.length > 0);
                
                return info
            })
        }))
        // const links = data
        // const lista =  pageDataBwin(Browser, links)
        listaLinks.push({deporte: element.deporte, links: data})
        
        console.log(element.deporte, 'terminado de escanear')
        await page.close();

        // break;// momentane para para el ciclo
    }
    return listaLinks;
}

module.exports = {pageDeporteBw, listaLinks};