
const extraerAmbosMarcan = async (marcanAmbosClass, cuotaSelector) =>{
    try{
        const  ambosMarcan = await marcanAmbosClass.evaluate((element, selector) =>{
            let marcan = {
                'Si': '',
                'No': ''
            };
            Array.from(element.querySelectorAll(`.${selector}`)).map(el => {
            // Array.from(element.querySelectorAll('.gIMtGL')).map(el => {
                if(marcan['Si'] === ''){
                    marcan['Si'] = el.textContent.trim();
                }else{
                    marcan['No'] = el.textContent.trim();
                }
            })
            return marcan;
        }, cuotaSelector);
        return ambosMarcan;
    }catch(err){
        console.error('error al extraer cuotas de ambos marcan', err.message);
    }
}

module.exports = { extraerAmbosMarcan };