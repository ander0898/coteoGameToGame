const { Cluster } = require('puppeteer-cluster');
const { Deportes } = require("../utils/deportes");
const { browser } = require("./browserServices/browserservice");
const { buscarGame } = require("./bwServices/buscarGameService");
const { buscarGameCod } = require("./codServices/buscarGameCodService");
const { futbolData } = require("./RbServices/futbolDataServices");
const { pageRushbet } = require("./RbServices/pageRusbetServices");
const { tenisData } = require("./RbServices/tenisDataServices");

const listaRh = [];
const listaBw = [];
const listaTenisRh = [];
const listaTenisBw = [];
const listaTenisCod = [];

const iniciarServices = async () => {
  try {
    let contadorPartidos = 0;
    let contador = 0;
    
    await browser();
    const deporte = 'Tenis';
    const response = await pageRushbet('https://www.rushbet.co/?page=sportsbook#filter/tennis', deporte);
    contadorPartidos = response.length;
    console.log(`Total Partidos ${deporte}: ${contadorPartidos}`);

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 3,
      timeout: 60000,
      puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    // Configuración de la tarea del cluster
    cluster.task(async ({ page, data }) => {
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const bloqueados = ['image', 'stylesheet', 'font', 'media', 'script', 'texttrack', 'websocket'];
        bloqueados.includes(req.resourceType()) ? req.abort() : req.continue();
      });

      const { tipo, local, visitante, deporte, link, liga, idPartido } = data;
      
      try {
        let resultado;
        switch (tipo) {
          case 'buscarGame':
            resultado = await buscarGame(local, visitante, deporte, 0);
            break;
          case 'tenisData':
            resultado = await tenisData(link, local, visitante, liga);
            break;
          case 'buscarGameCod':
            resultado = await buscarGameCod(local, visitante, deporte, 0);
            break;
        }
        
        return { idPartido, tipo, resultado };
      } catch (error) {
        console.error(`Error en ${tipo} (${idPartido}):`, error);
        return { idPartido, tipo, resultado: null };
      }
    });

    // Encolar todas las tareas primero
    for (const [index, element] of response.entries()) {
      const idPartido = `partido-${index + 1}`; // ID único
      const local = element.partido?.local;
      const visitante = element.partido?.visitante;

      // Encolar 3 tareas por partido con mismo ID
      cluster.queue({ 
        tipo: 'buscarGameCod',
        local,
        visitante,
        deporte,
        idPartido
      });

      cluster.queue({ 
        tipo: 'buscarGame',
        local,
        visitante,
        deporte,
        idPartido
      });

      cluster.queue({ 
        tipo: 'tenisData',
        local,
        visitante,
        deporte,
        link: element.link,
        liga: element.liga,
        idPartido
      });
    }

    // Procesar resultados
    const resultadosPorPartido = new Map();
    
    cluster.on('taskdone', ({ data, result }) => {
      if (!result || !result.resultado) return;
      
      const { idPartido, tipo } = data;
      if (!resultadosPorPartido.has(idPartido)) {
        resultadosPorPartido.set(idPartido, { cod: null, bw: null, rh: null });
      }
      
      const partido = resultadosPorPartido.get(idPartido);
      switch (tipo) {
        case 'buscarGameCod': partido.cod = result.resultado; break;
        case 'buscarGame': partido.bw = result.resultado; break;
        case 'tenisData': partido.rh = result.resultado; break;
      }
    });

    // Esperar a que todas las tareas terminen
    await cluster.idle();
    await cluster.close();

    // Llenar las listas originales y contar coincidencias
    for (const [id, { cod, bw, rh }] of resultadosPorPartido) {
      if (cod && bw && rh) {
        listaTenisCod.push(cod);
        listaTenisBw.push(bw);
        listaTenisRh.push(rh);
        contador++;
      }
    }

    console.log(`Partidos completos: ${contador} de ${contadorPartidos}`);
    console.log('**************** TERMINÓ LA EJECUCIÓN ******************');

  } catch (err) {
    console.log('Error en iniciarServices:', err);
  }
};

module.exports = { iniciarServices, listaRh, listaBw, listaTenisRh, listaTenisBw, listaTenisCod };