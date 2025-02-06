//*********************************************************************************************** */
// esta funcion se encarga de estrear de la pagina principal de bwin todos sus deportes con su respectivo link
//*********************************************************************************************** */

async function DataBwin(pageBw){
   try{
     const page = pageBw
     const databwin = page.$$('.leaf-item.list-item');
     console.log((await databwin).length);
     const listaDeportes = await Promise.all((await databwin).map(async (element)=>{
        return await element.evaluate(el =>{
            const link = el.querySelector('.ms-active-highlight').getAttribute('href');
            const deporte = el.querySelector('.title').textContent.trim();
            
            return {
                link,
                deporte
            };
        })
     }))
    //  console.log(listaDeportes);
       page.close();
        return listaDeportes;
   }catch(error){
     return ('error al optener los datos de Bwin', error);
   }
};

module.exports = { DataBwin };