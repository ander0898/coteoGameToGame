const extraerHandicapBw = async (handicapAsiaticoClass, local, visitante)=>{
    try{
        const handicap = await handicapAsiaticoClass.evaluate((element, equipos) =>{
            const listaHandicap = [];
            const { local, visitante } = equipos;
            const mas  =  Array.from(element.querySelectorAll('.option-indicator')).forEach((el,index) => {
                const handicap = el.querySelector('.name').textContent.trim();
                const valor = el.querySelector('.option-value').textContent.trim();
                parImpar = index % 2;
                if(index === 0){
                    let name = local+' '+handicap;
                    listaHandicap.push({[name]:valor});
                }else{
                    let name = visitante+' '+handicap;
                    listaHandicap.push({[name]:valor});
                }
            });
            return listaHandicap;
        },{local, visitante});
        return handicap;
    }catch(err){
        console.error('error al extraer handicap asiatico ', err.message);
    }
}

module.exports = {extraerHandicapBw}