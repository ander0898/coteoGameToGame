
const clickNavBarCod = async (page, textOpcion) => {
    const navBarInterno = await page.$$('.sb-tabs-categories-swiper--button.sportsbook');

    for (const item of navBarInterno) {
        const match = await item.evaluate((element, textOpcion) => {
            const label = element.querySelector('ion-label');
            if (label && label.textContent.trim() === textOpcion) {
                element.click(); // Click en el botón principal
                return true;
            }
            return false;
        }, textOpcion);

        if (match) return true; // Si se hizo click en una opción, salimos
    }

    return false; // Si no encontró la opción
};
    
    module.exports= {clickNavBarCod}