
// +++++++++++++++++++++++++++++++++++++++ extraer cuotas de doble oportunidad, parte 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const extraerDobleOportunidad = async (oportunidadDobleClass, cuotaSelector)=>{
    try{
        dobleOportunidad = await oportunidadDobleClass.evaluate((element, selector) =>{
            let oportunidad = {
                '1x': '',
                '12': '',
                'x2': ''
            }
            // Array.from(element.querySelectorAll('.gIMtGL')).map(el => {
            Array.from(element.querySelectorAll(`.${selector}`)).map(el => {
                if(oportunidad['1x'] === ''){
                    oportunidad['1x'] = el.textContent.trim();
                }else if( oportunidad['1x'] !== ''&& oportunidad['12']===''){
                    oportunidad['12'] = el.textContent.trim();
                }else{
                    oportunidad['x2'] = el.textContent.trim();
                }
            })
            return oportunidad;
        }, cuotaSelector);
        return dobleOportunidad;
    }catch(err){
        console.error('error al extraer cuotas de doble oportunidad', err.message);
    } 
}

module.exports = { extraerDobleOportunidad };