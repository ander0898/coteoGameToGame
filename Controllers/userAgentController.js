
const ramdonUser = require("random-useragent");

let userRandom = null;
async function userAgent(){
    try{
        if(!userRandom){
             userRandom = await ramdonUser.getRandom();
        }
        return userRandom;
    }catch(err){
        console.log('Error al generar User Agent',err);
    }
}

module.exports = userAgent;