const { text } = require('express');
const levenshtein = require('fast-levenshtein');
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

const buscarEquipo = async (barNav, local, visitante) => {
    console.log('local', local, 'visitante', visitante);
    local = local.toLowerCase();
    visitante= visitante.toLowerCase();
    const partidoEncontrado = await barNav.evaluate(
        (el,local, visitante) => {
            const levenshtein = {
                get: (a, b) => {
                    const matrix = [];
                    let i;
                    for (i = 0; i <= b.length; i++) {
                        matrix[i] = [i];
                    }
                    let j;
                    for (j = 0; j <= a.length; j++) {
                        matrix[0][j] = j;
                    }
                    for (i = 1; i <= b.length; i++) {
                        for (j = 1; j <= a.length; j++) {
                            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                                matrix[i][j] = matrix[i - 1][j - 1];
                            } else {
                                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                            }
                        }
                    }
                    return matrix[b.length][a.length];
                }
            };
            // const normalizeText = (text) => {
            //     text = text.toLowerCase().trim();
            //     return alias[text] || text;
            // };
            // local = normalizeText(local);
            // visitante= normalizeText(visitante);
            const lista = [];
            const contenedoresPartidos = el.querySelectorAll('.grid-event-wrapper');
            for (const partido of contenedoresPartidos) {
                const equipos = partido.querySelectorAll('.participant-container');
                let equipoLocal = equipos[0]?.textContent.toLowerCase().trim();
                let equipoVisitante = equipos[1]?.textContent.toLowerCase().trim();
                // equipoLocal= normalizeText(equipoLocal);
                // equipoVisitante = normalizeText(equipoVisitante);
                // lista.push({equipoLocal, equipoVisitante},{local,visitante});
                // lista.push(levenshtein.get(equipoLocal, local));
                // lista.push(levenshtein.get(equipoVisitante, visitante));
                const esLocalSimilar = 
                    equipoLocal.includes(local) || local.includes(equipoLocal) || levenshtein.get(equipoLocal, local) < 5;
                const esVisitanteSimilar =
                    equipoVisitante.includes(visitante) || visitante.includes(equipoLocal) || levenshtein.get(equipoVisitante, visitante) < 5;
                // Verificar si coinciden local y visitante usando Levenshtein Distance
                if (esLocalSimilar && esVisitanteSimilar) {
                // lista.push({equipoLocal, equipoVisitante},{local,visitante}, 'si');
                    const enlace = partido.querySelector('a');
                    lista.push({'enlace': enlace});
                    if (enlace) {
                        const url = enlace.href;
                        // enlace.click();
                        // console.log('click');
                        return url;
                    }
                }
            }
            return false;
        },
        local,
        visitante,
    );
    // console.log(partidoEncontrado)

    return partidoEncontrado;
}

module.exports = { buscarEquipo };