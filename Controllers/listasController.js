const { listaRh, listaBw } = require("../services/iniciarServices");


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

module.exports = {listasGet};