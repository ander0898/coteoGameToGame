
const extraerTotalGolesBw = async (sesion ) => {
    try{
        const golesTotal = await sesion.evaluate(element=>{
            const listaGoles = [];
            let name; 
            const mas = Array.from(element.querySelectorAll('.name, .option-value')).map(el =>{
                if(el.classList.contains('name')){
                    name = el.textContent.trim();
                }
                if(el.classList.contains('option-value')){
                    let valor = el.textContent.trim();
                    listaGoles.push({[name]: valor});
                    name = null;
                }
            });
            return listaGoles;
        });
        return golesTotal;
    }catch(err){
    console.error('error al extraer los goles Bw', err.message);
    }
};

module.exports = {extraerTotalGolesBw};