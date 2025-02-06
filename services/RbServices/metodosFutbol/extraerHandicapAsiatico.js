

const extraerHandicapAsiatico = async (handicapAsiaticoClass, local, visitante)=>{
    try{
        const handicap = await handicapAsiaticoClass.evaluate((element, equipos) =>{
            const listaHandicap = [];
            const { local, visitante } = equipos;
            let name;
            const mas  =  Array.from(element.querySelectorAll('.kLwvTb, .gIMtGL')).forEach(el => {
                const text = el.textContent.trim();
                const match = text.match(new RegExp(`(${local}|${visitante})([+-]?\\d*\\.?\\d+)`));
                if(match){
                    name =  `${match[1]} ${match[2]}`
                }else {
                    let valor = el.textContent.trim();
                    listaHandicap.push({[name]: valor});
                    name =  null;
                }
            });
            return listaHandicap;
        },{local, visitante});
        return handicap;
    }catch(err){
        console.error('error al extraer handicap asiatico ', err.message);
    }
}

module.exports = {extraerHandicapAsiatico}