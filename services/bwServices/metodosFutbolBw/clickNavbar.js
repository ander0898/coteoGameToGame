
const clickNavBar = async (page, textOpcion)=>{
const navBarInterno = await page.$$('div.ds-tab-header-container.ds-tab-nav-enabled');
// console.log(navBarInterno.length);
const opcionesNavBar = await Promise.all( navBarInterno.map(async (item) =>{
    return await item.evaluate((element,textOpcion) =>{
        const opciones = element.querySelectorAll('li.ds-tab-header-item');
        // const listaOpcines = [];
        for(const opcion of opciones){
            const text = opcion.textContent.trim();
            if(text === textOpcion){
                opcion.click();
                return true
            }
            // listaOpcines.push(text)
        }
        return false;
    },textOpcion)
}))
return opcionesNavBar;
// console.log('opciones del menu', opcionesNavBar);
}

module.exports= {clickNavBar}