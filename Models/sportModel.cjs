class SportModel {
    constructor(deporte, liga, fecha, hora, local, visitante,cuotaLocal, cuotaVisitante,cuotaEmpate){
       this.deporte = deporte;
       this.liga = liga;
       this.fecha = fecha;
       this.hora = hora;
       this.local = local;
       this.visitante = visitante;
       this.cuotaLocal = cuotaLocal;
       this.cuotaVisitante = cuotaVisitante;
       this.cuotaEmpate= cuotaEmpate;
    }
}

module.exports =  SportModel;