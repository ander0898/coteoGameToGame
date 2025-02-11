
const extraerHandicapSetsBw = async (handicapAsiaticoClass)=>{
    try{
        const handicap = await handicapAsiaticoClass.evaluate((element) =>{
            const listaHandicap = [];
            // const { local, visitante } = equipos;
            const mas  =  Promise.all(Array.from(element.querySelectorAll('.option-indicator')).map((el) => {
                const handicap = el.querySelector('.name').textContent.trim();
                const valor = el.querySelector('.option-value').textContent.trim();
                // parImpar = index % 2;
                // if(index === 0){
                    let name =handicap;
                    listaHandicap.push({[name]:valor});
                // }else{
                //     let name = visitante+' '+handicap;
                //     listaHandicap.push({[name]:valor});
                // }
            }));
            return listaHandicap;
        });
        return handicap;
    }catch(err){
        console.error('error al extraer handicap asiatico ', err.message);
    }
}

module.exports = {extraerHandicapSetsBw}