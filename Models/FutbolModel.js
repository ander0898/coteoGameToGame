class Futbol{
    constructor(liga, Local, Visitante, resultadoFinal,  totalGoles/*ya*/,  dobleOportunidad, ambosMarcan, sinEmpate, totalGolesLocal/*ya*/, 
        totalGolesVisitante /*ya*/, resultadoParte1, sinEmpateParte1, dobleOportunidadParte1, ambosMarcanParte1, totalGolesParte1/*ya*/, totalGolesLocalParte1 /*ya*/,
        totalGolesVisitanteParte1 /*ya*/, resultadoParte2, totalGolesParte2/*ya*/,
        handicapAsiatico, handicapTotal, handicapAsiaticoParte1, handicapTotalParte1, totalTarjetas/*ya*/, totalTarjetasLocal, totalTarjetasVisitante,
        tarjetaRoja, totalCorner, totalCornerParte1, totalCornerParte2, totalCornerLocal,
        totalCornerVisitante, totalCornerLocalParte1, totalCornerVisitanteParte1,
        totalCornerLocalParte2, totalCornerVisitanteParte2,
     ){
        this.deporte= 'Futbol',
        this.liga= liga,
        this.local= Local,
        this.visitante= Visitante,
        this.resultadoFinal= resultadoFinal, // ya
        this.totalGoles = totalGoles, // alteracion  ya
        // this.totalGolesMas= totalGolesMas, 
        // this.totalGolesMenos= totalGolesMenos,
        this.dobleOportunidad= dobleOportunidad, // ya
        this.ambosMarcan= ambosMarcan, // ya
        this.sinEmpate= sinEmpate, // ya
        this.totalGolesLocal= totalGolesLocal, // ya
        // this.totalGolesLocalMas= totalGolesLocalMas,
        // this.totalGolesLocalMenos= totalGolesLocalMenos,
        this.totalGolesVisitante = totalGolesVisitante, //ya 
        // this.totalGolesVisitanteMas= totalGolesVisitanteMas,
        // this.totalGolesVisitanteMenos= totalGolesVisitanteMenos,
        this.resultadoParte1= resultadoParte1, // ya 
        this.sinEmpateParte1= sinEmpateParte1, // ya
        this.dobleOportunidadParte1= dobleOportunidadParte1, // ya
        this.ambosMarcanParte1= ambosMarcanParte1, // ya
        this.totalGolesParte1= totalGolesParte1, // ya
        // this.totalGolesMasParte1= totalGolesMasParte1,
        // this.totalGolesMenosParte1= totalGolesMenosParte1,
        this.totalGolesLocalParte1= totalGolesLocalParte1, // ya
        // this.totalGolesLocalMasParte1= totalGolesLocalMasParte1,
        // this.totalGolesLocalMenosParte1= totalGolesLocalMenosParte1,
        this.totalGolesVisitanteParte1= totalGolesVisitanteParte1, //ya
        // this.totalGolesVisitanteMasParte1= totalGolesVisitanteMasParte1,
        // this.totalGolesVisitanteMenosParte1= totalGolesVisitanteMenosParte1,
        this.resultadoParte2= resultadoParte2, // ya 
        this.totalGolesParte2= totalGolesParte2, //ya
        // this.totalGolesMasParte2= totalGolesMasParte2,
        // this.totalGolesMenosParte2= totalGolesMenosParte2,
        this.handicapAsiatico= handicapAsiatico, //  ya
        // this.handicapAsiaticolocal= handicapAsiaticolocal,
        // this.handicapAsiaticoVisitante= handicapAsiaticoVisitante,
        this.handicapTotal= handicapTotal, // ya
        // this.handicapTotalmas= handicapTotalmas,
        // this.handicapTotalmenos= handicapTotalmenos,
        this.handicapAsiaticoParte1= handicapAsiaticoParte1, // ya
        // this.handicapAsiaticolocalParte1= handicapAsiaticolocalParte1,
        // this.handicapAsiaticoVisitanteParte1= handicapAsiaticoVisitanteParte1,
        this.handicapTotalParte1= handicapTotalParte1, // ya
        // this.handicapTotalmasParte1= handicapTotalmasParte1,
        // this.handicapTotalMenosParte1= handicapTotalMenosParte1,
        this.totalTarjetas= totalTarjetas, // ya
        // this.totalTarjetasMas= totalTarjetasMas,
        // this.totalTarjetasMenos= totalTarjetasMenos,
        this.totalTarjetasLocal= totalTarjetasLocal, // ya
        // this.totalTarjetasLocalMas= totalTarjetasLocalMas,
        // this.totalTarjetasLocalMenos= totalTarjetasLocalMenos,
        this.totalTarjetasVisitante= totalTarjetasVisitante, // ya 
        // this.totalTarjetasVisitanteMas= totalTarjetasVisitanteMas,
        // this.totalTarjetasVisitanteMenos= totalTarjetasVisitanteMenos,
        this.tarjetaRoja= tarjetaRoja, // ya
        this.totalCorner= totalCorner, // ya
        // this.totalCornerMas= totalCornerMas,
        // this.totalCornerMenos= totalCornerMenos,
        this.totalCornerParte1= totalCornerParte1, // ya
        // this.totalCornerMasParte1= totalCornerMasParte1,
        // this.totalCornerMenosParte1= totalCornerMenosParte1,
        this.totalCornerParte2= totalCornerParte2, // ya
        // this.totalCornerMasParte2= totalCornerMasParte2,
        // this.totalCornerMenosParte2= totalCornerMenosParte2,
        this.totalCornerLocal= totalCornerLocal, // ya
        // this.totalCornerLocalMas= totalCornerLocalMas,
        // this.totalCornerLocalMenos= totalCornerLocalMenos,
        this.totalCornerVisitante= totalCornerVisitante,// ya 
        // this.totalCornerVisitanteMas= totalCornerVisitanteMas,
        // this.totalCornerVisitanteMenos= totalCornerVisitanteMenos,
        this.totalCornerLocalParte1= totalCornerLocalParte1, // ya
        // this.totalCornerLocalMasParte1= totalCornerLocalMasParte1,
        // this.totalCornerLocalMenosParte1= totalCornerLocalMenosParte1,
        this.totalCornerVisitanteParte1= totalCornerVisitanteParte1, // ya 
        // this.totalCornerVisitanteMasParte1= totalCornerVisitanteMasParte1,
        // this.totalCornerVisitanteMenosParte1= totalCornerVisitanteMenosParte1,
        this.totalCornerLocalParte2= totalCornerLocalParte2, //  ya
        // this.totalCornerLocalMasParte2= totalCornerLocalMasParte2,
        // this.totalCornerLocalMenosParte2= totalCornerLocalMenosParte2,
        this.totalCornerVisitanteParte2= totalCornerVisitanteParte2 // ya 
        // this.totalCornerVisitanteMasParte2= totalCornerVisitanteMasParte2,
        // this.totalCornerVisitanteMenosParte2= totalCornerVisitanteMenosParte2
        // this.ambosMarcan = ambosMarcan
    }
}

module.exports = {Futbol};