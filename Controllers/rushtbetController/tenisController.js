const { listaTenisRh } = require("../../services/iniciarServices")


const getDataTenis = async ()=>{
    return listaTenisRh;
}

module.exports = {getDataTenis}