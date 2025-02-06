const { listaError } = require("../services/bwServices/buscarGameService")


const getErrorAlias = async() =>{
    return listaError;
}

module.exports = {getErrorAlias}