
// +++++++++++++++++++++++++++++++++++++ extraer cuotas  del resultado final, apuesta sin empate, resutado al descanso,  sin empate parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const extraerCuotasPartido = async (tiempoReglamentarioClass, selector) =>{
    try{
        const cuotas = await tiempoReglamentarioClass.evaluate((element,selector) => {
            // Objeto para almacenar las cuotas
            let cuotaActual = {
                local: '',
                empate: '',
                visitante: ''
            };

            // Extraer las cuotas
            const elementosCuotas = Array.from(element.querySelectorAll(`.${selector}`));
            // const elementosCuotas = Array.from(element.querySelectorAll(`.sc-kAyceB.gIMtGL`)); selector para rushbet
            if (elementosCuotas.length === 2) {
                // Si solo hay dos cuotas
                cuotaActual.local = elementosCuotas[0]?.textContent.trim() || '';
                cuotaActual.visitante = elementosCuotas[1]?.textContent.trim() || '';
                delete cuotaActual.empate; // Eliminar la clave "empate"
            } else if (elementosCuotas.length >= 3) {
                // Si hay tres cuotas
                cuotaActual.local = elementosCuotas[0]?.textContent.trim() || '';
                cuotaActual.empate = elementosCuotas[1]?.textContent.trim() || '';
                cuotaActual.visitante = elementosCuotas[2]?.textContent.trim() || '';
            }

            return cuotaActual;
        },selector
    );
    return cuotas;
    }catch(err){
        console.error('error al extraer cuotas partido', err.message);
    }
}

module.exports= {extraerCuotasPartido}