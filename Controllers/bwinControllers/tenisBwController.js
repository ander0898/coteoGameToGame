const { listaTenisBw } = require("../../services/iniciarServices")


const getDataTenisBw = async  ()=>{
    return listaTenisBw;
}

module.exports = {getDataTenisBw};