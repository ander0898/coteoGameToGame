

const extraerHandicapCod = async(handicapAsiaticoClass, local, visitante)=>{
    try{
        const handicap = await handicapAsiaticoClass.evaluate((element, equipos) =>{
            const listaHandicap = [];
            const { local, visitante } = equipos;
            const mas  =  Array.from(element.querySelectorAll('.background-color-button')).map((el) => {
                const handicap = el.querySelector('.sb-button--title.color-muted').textContent.trim();
                const valor = el.querySelector('.sb-button--subtitle.color-dark').textContent.trim();
                const dividirHandicap = handicap.split(' ');
                // dividirHandicap = handicap.split(/[\+\-]/);
                // local = local.toLowerCase();
                const  str = dividirHandicap[0].toLowerCase();
                // listaHandicap.push(local.toLowerCase().includes(str))
                if(local.toLowerCase().includes(str)){
                    let localActual = local+' '+dividirHandicap[1];
                    listaHandicap.push({[localActual]: valor});
                }
                if(visitante.toLowerCase().includes(str)){
                    let visitanteActual = visitante+' '+dividirHandicap[1];
                    listaHandicap.push({[visitanteActual]: valor});
                }
            });
            return listaHandicap;
        },{local, visitante});
        return handicap;
    }catch(err){
        console.error('error al extraer handicap asiatico ', err.message);
    }
}

module.exports = {extraerHandicapCod}