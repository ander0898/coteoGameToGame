const { listaRh } = require("../../services/iniciarServices");




const getDataFutbol = async () => {
    return listaRh;
};

module.exports = { getDataFutbol };