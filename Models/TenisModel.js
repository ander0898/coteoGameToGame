class Tenis {
    constructor(local, visitante, ganadorPartido, ganadorSet1, ganadorSet2, ganadorHandicapJuegos, juegosTotal, localAlmenosUno
        , visitanteAlmenosUno, partidoRemontada, tieBreak, setsDelParido, juegosTotalSetUno, handicapSets,tieBreakSet1,ambosGananSet
    ){
        this.local = local;
        this.visitante = visitante;
        this.ganadorPartido = ganadorPartido;
        this.ganadotSet1 = ganadorSet1;
        this.ganadotSet2 = ganadorSet2;
        this.ganadorHandicapJuegos = ganadorHandicapJuegos;
        this.juegosTotal = juegosTotal;
        this.localAlmenosUno = localAlmenosUno;
        this.visitanteAlmenosUno = visitanteAlmenosUno;
        this.partidoRemontada = partidoRemontada;
        this.tieBreak = tieBreak;
        this.setsDelParido = setsDelParido;
        this.juegosTotalSetUno = juegosTotalSetUno;
        this.handicapSets = handicapSets;
        this.tieBreakSet1 = tieBreakSet1;
        this.ambosGananSet = ambosGananSet;
    }
}

module.exports= {Tenis};