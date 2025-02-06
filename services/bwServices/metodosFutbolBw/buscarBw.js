const { buscarEquipo } = require("./buscarEquipo");
// const aliasEquipos = {
//     "manchester city": "man city",
//     "manchester united": "man united",
//     "newcastle united": "newcastle",
//     '1. FC Kaiserslautern': 'Kaiserslautern',
//     'Preußen Münster': 'SC Preussen 06 Munster',
//     'La Equidad Seguros': 'Equidad',
//     'Atletico Nacional S.': 'Atlético Nacional',
//     'Club Deportivo Junior':'Junior FC',
//     'Aguilas Doradas Rionegro +++':'Águilas Doradas',
//     'Real Betis':'Real Betis'
// };

const buscarBw = async(page,selectorInput, str, local, visitante)=>{
    // const normalizeText = (text) => {
    //     text = text.toLowerCase().trim();
    //     return aliasEquipos[text] || text;
    // };
    // str = normalizeText(str);
    await page.type(selectorInput, str);
    await new Promise(resolve => { setTimeout(resolve, 500) });
    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');
    await page.waitForSelector('.ng-star-inserted');
    await new Promise(resolve => { setTimeout(resolve, 1000) });

    const contenido = await page.$('.popular-recent-search-suggestion');
    if (contenido) {

        const resultado = await contenido.evaluate(el => el.textContent.trim());
        if (resultado === 'SIN RESULTADOS') {
            const cerrar = await page.$('.input-search');
            await cerrar.evaluate((el) => {
                const x = el.querySelector('.close.theme-ex');
                x.click();
            })
            return false; 
            // await page.type(selectorInput, local);
            // await new Promise(resolve => { setTimeout(resolve, 500) });
            // await page.keyboard.down('Enter');
            // await page.keyboard.up('Enter');
            // await new Promise(resolve => { setTimeout(resolve, 1000) });
            // res = await buscarEquipo(page, local, visitante);
            // await page.type(selectorInput, local);  
        } else {
            const barNav = await page.$('.modal-content');
        //     const text = await barNav.evaluate(async (el,local,visitante) => {
        //         const contenedor = el.querySelectorAll('.grid-event-wrapper');
        //         const listaRes= [];
        //         for (const item of contenedor) {
        //             const texto = item.querySelectorAll('.participant-container');
        //             const localActual = texto[0]?.textContent.trim();
        //             const visitanteActual = texto[1]?.textContent.trim();
                    
        //             if(localActual.includes(local) && visitanteActual.includes(visitante)){
        //                 listaRes.push({localActual, visitanteActual}, {local, visitante});
        //             //     // const enlace = item.closest('a');
        //             //     // if (enlace) {
        //             //     //     const url = enlace.href;
        //             //     //     return url;
        //             //     // }
        //             //     listaRes.push({local, visitante});
        //             }
                    
        //         }
        //         return listaRes;
        //     },local, visitante
        // );
            const res = await buscarEquipo(barNav, local, visitante);
            // console.log('barNav', res);
            if (!res) {
                const cerrar = await page.$('.input-search');
                await cerrar.evaluate((el) => {
                const x = el.querySelector('.close.theme-ex');
                x.click();
            })
            return false;
            }
            return res;
            await new Promise(resolve => { setTimeout(resolve, 1000) });
        }
    }
}

module.exports = {buscarBw};