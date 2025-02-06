
const buscarIndex= async (Class, sesionSelector,textoABuscar)=>{
    const indices = await Promise.all(
        Class.map(async (element) => {
            return await element.evaluate((el, texto, Selector) => {
                return Array.from(el.querySelectorAll(`.${Selector}`)).findIndex(
                    (el) => el.textContent.trim() === (texto)
                    // (el) => el.textContent.trim().includes(texto)
                );
                // return Array.from(el.querySelectorAll('.KambiBC-bet-offer-subcategory__label')).findIndex(
                //     (el) => el.textContent.trim().includes(texto)
                // );
            },textoABuscar,sesionSelector);
        })
    );
    
    // Combinar y filtrar resultados válidos
    const index = indices.findIndex((i) => i !== -1);
    
    // console.log(index);
    return index;
}

module.exports = {buscarIndex}