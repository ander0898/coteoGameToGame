

//  ++++++++++++++++++++++++++++++++++++++++++++++++ metodo encargado de barrer la primera capa de informacion de la pagina del deporte de Rb ++++++++++++++++++++++++++++++++++++++++
const extratorDataInicial = async (page) => {
  const encabezado = await page.$$('.CollapsibleContainer__CollapsibleWrapper-sc-14bpk80-0');

  const Data = await Promise.all(encabezado.map(async (data) => {
    return await data.evaluate((element) => {
      const competicion = element.querySelector('.kBYZVk')
      if (competicion && competicion.textContent.trim() !== 'En vivo\n\t\t\t\t\tEn vivo \n\t\t\t\t\tAhora' && competicion.textContent.trim() !== '|Esports Fútbol|') {
        const info = Array.from(element.querySelectorAll(`.jYNcGR,
                                                          .KambiBC-event-participants__name,
                                                          .KambiBC-event-item__link`));
        const lista = [];
        let partido = { local: "", visitante: "" };
        let liga = "";
        let link = "";
        info.forEach(el => {
          if (el.classList.contains("KambiBC-event-item__link")) {
            if (link === "" || el.textContent.trim() !== link) {
              link = el.href;
            }
          }
          if (el.classList.contains("jYNcGR")) {
            if (
              (liga === "" || el.textContent.trim() !== liga) &&
              el.textContent.trim() !== undefined
            ) {
              liga = el.textContent.trim();
            }
          }
          if (el.classList.contains("KambiBC-event-participants__name")) {
            const partidoTexto = el.textContent.trim();
            if (partido.local === "")
              partido = {
                local: partidoTexto,
                visitante: "",
              };
            if (partido.local !== partidoTexto && partido.visitante === "") {
              partido.visitante = partidoTexto;
              lista.push({ link, liga, partido });
              partido = {
                local: "",
                visitante: ""
              };
            }
          }
        })
        return lista;
        // const liga = element.querySelector('.jeFboi');
      }
    },)
  }));
  const filtro = Data.filter(element => element !== undefined && element !== null)

  return filtro.flat();
}
module.exports = { extratorDataInicial }