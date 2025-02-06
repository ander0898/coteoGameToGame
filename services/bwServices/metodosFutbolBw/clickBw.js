
const clickBw = async (sesionActual, lugarClick) =>{
    try{
        const tiempos = await sesionActual.$$('.ds-tab-header-item');
        for(const tiempo of tiempos){
            const tiempoTexto = await tiempo.evaluate(el => el.textContent.trim());
            if(tiempoTexto === lugarClick){
                await tiempo.click();
                return true
            }
        }
        return false;
    
    }catch(err){
        console.error('error al extraer cuotas', err.message);
    }
};

module.exports= {clickBw};