const { listaBw } = require("../../services/iniciarServices");


const getDataFutbolBw = async () => {
    return listaBw;
};

module.exports = { getDataFutbolBw };