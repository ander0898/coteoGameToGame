function renderData(data) {
   const res = data.map(element => {
     return element.map(model =>{
      // console.log(model)
      const renderModel = {
        deporte: model.deporte,
        liga: model.liga,
        fecha: model.fecha,
        hora: model.hora,
        local: model.local,
        visitante: model.visitante,
        cuotaLocal: model.cuotaLocal,
        cuotaVisitante: model.cuotaVisitante,
      };
      if( model?.cuotaEmpate !== null && model?.cuotaEmpate !== undefined && model?.cuotaEmpate !== ''){
        renderModel.cuotaEmpate = model.cuotaEmpate;
      }
      // console.log(renderModel);
      return renderModel;
    })
    
  });
  //  console.log(res)
  return res.flat();
}
function renderDataR(data) {
  const res = data.map(model =>{
    //  console.log(model)
     const renderModel = {
       deporte: model.deporte,
       liga: model.liga,
       fecha: model.fecha,
       hora: model.hora,
       local: model.local,
       visitante: model.visitante,
       cuotaLocal: model.cuotaLocal,
       cuotaVisitante: model.cuotaVisitante,
     };
     if( model?.cuotaEmpate !== null && model?.cuotaEmpate !== undefined && model?.cuotaEmpate !== ''){
       renderModel.cuotaEmpate = model.cuotaEmpate;
     }
     // console.log(renderModel);
     return renderModel;
   })
   
  // console.log(res)
 return res.flat();
}

module.exports = { renderData, renderDataR};
