const { listaRh, listaBw, listaTenisRh, listaTenisBw, listaTenisCod } = require("../services/iniciarServices");


const listasGet = async() =>{
    const listaCombinada = [];
    const rh = listaRh;
    const bw = listaBw;
    const rhLongitud = rh.length;
    const bwLongitud = bw.length;
    // console.log(rhLongitud, bwLongitud);

    // if((rhLongitud >= 0 && bwLongitud>= 0) && rhLongitud === bwLongitud){
        for(let i = 0; i<= rh.length; i++){
            listaCombinada.push({bw: bw[i], rh: rh[i]});
        }
    // }
    return listaCombinada;
}

const listasBwGet = async ()=>{
    const listaCombinada = [];
    for(let i = 0; i<= listaTenisRh.length; i++){
        listaCombinada.push({bw: listaTenisBw[i], rh: listaTenisRh[i], cod: listaTenisCod[i]});
    }
    return listaCombinada;
}
module.exports = {listasGet, listasBwGet};