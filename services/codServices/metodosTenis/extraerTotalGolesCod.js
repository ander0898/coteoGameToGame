

const extraerTotalGolesCod = async (golesTotalClass) =>{
    try{
        const totalGolesLocal = await golesTotalClass.evaluate(element =>{
            const listaGoles = [];
            let name;
            const mas  =  Array.from(element.querySelectorAll('.sb-button--title, .sb-button--subtitle.color-dark')).map(el => {
                const match  = el.textContent.match(/(Más |Menos )([\d.]+)/);
                if(match){
                    name =  `${match[1]} ${match[2]}`
                }else {
                    let valor = el.textContent.trim();
                    listaGoles.push({[name]: valor});
                    name =  null;
                }
            });
            return listaGoles;
        })
        return totalGolesLocal;
    }catch(err){
        console.error('error al extraer total de goles local', err.message);
    }
}

module.exports = {extraerTotalGolesCod};