const { listaTenisCod } = require("../../services/iniciarServices")


const getDataTenisCod = async () =>{
    return listaTenisCod;
}

module.exports = {getDataTenisCod};