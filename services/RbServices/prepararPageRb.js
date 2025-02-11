
const prepararPageRb = async (page)=>{
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
        }
    const plegables = await page.$$('.iunwi');
        for (let i = 0; i < plegables.length; i++) {
                try {
                        await plegables[i].click();
                        if(i === plegables.length-1){
                                await delay(1000);
                        }
                } catch (err) {
                        console.error('error al hacer click en el elemento #:' + i);
                }
                // await delay(2000);
        }
        // NOTA REVISAR LUEGO POR QUE NO ABRE TODOS LOS COMPONENTES 
        const button = await page.$$('.KambiBC-outcomes-list__toggler-toggle-button.down');
        // console.log(button.length);
        for (let i = 0; i < button.length; i++) {
                try {
                        await button[i].click();
                } catch (err) {
                        console.error('error al hacer click en el botón #:' + i);
                }
                await delay(500);
        }
}

module.exports={prepararPageRb};