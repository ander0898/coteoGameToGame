const SportModel = require("../../Models/sportModel.cjs");
// *********************************************************************************************
// ********metodo de extracion de datos de la pagina bwin para deportes de formato regular *****
// *********************************************************************************************

const ExtrarData = async (page, deporte) =>{
    // const DataPartido = await page.$$('.grid-event-wrapper.image');
    const DataPartido = await page.$$('.event-group.collapsible');
    // console.log(deporte);
    const listaActual =  await Promise.all(DataPartido.map( async (data)=>{
        return await data.evaluate((element, deporte)=>{
            // let deporte = document.getElementsByClassName('sport-name')[0];
            let equipos = {
                local:'',
                visitante:''
            }
            let cuotas = {
                local:'',
                empate: '',
                visitante:'',
            }
            let listaEquipos = [];
            // let cuotas = [];
            let fecha
            let hora
            let contador = 0;
            let contadorEquipos = 0;
            let equiposActuales = 0;
            let liga;
            const listaExcepcion =['Baloncesto','Fútbol americano','Hockey sobre hielo']
            const  partido = (Array.from(element.querySelectorAll(`.league-group,
                                                                   .participant-wrapper,
                                                                   .starting-time,
                                                                   .timer-badg,
                                                                   .grid-option-group`)));
            partido.forEach(e =>{
                if(e.classList.contains('league-group')){
                    liga = e.textContent.trim();
                }
                if(e.classList.contains('participant-wrapper')){
                    if(equipos.local === ''){
                    equipos.local = e.textContent.trim();

                    }else{
                        equipos.visitante = e.textContent.trim();
                        listaEquipos.push({equipos});
                        equipos = {
                            local:'',
                            visitante:''
                        }
                        contadorEquipos++;
                    }
                }
                if(e.classList.contains('starting-time')){
                    const input = e.textContent.trim();
                    const ahora = new Date();
                    if( input.includes('Hoy')){
                        fecha = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()}`;
                        hora = input.split('/')[1].trim();
                        listaEquipos.push({hora, fecha});
                    }else if( input.includes('Mañana')){
                        fecha = `${ahora.getDate()+1}/${ahora.getMonth()+1 }/${ahora.getFullYear()}`;
                        hora = input.split('/')[1].trim();
                        listaEquipos.push({hora, fecha});
                    }
                    else{
                        const partes = input.split(' ');
                        fecha = partes[0];
                        hora = partes[1];
                        listaEquipos.push({hora, fecha});
                    }
                }
                
                if(contadorEquipos !== equiposActuales ){
                    equiposActuales = contadorEquipos
                    contador = 0;
                }

                if(e.classList.contains('grid-option-group')){
                    let grid = e.querySelectorAll('.grid-option');
                    const numCuotas = grid.length;
                    const boolean = listaExcepcion.includes(deporte);
                    if( boolean && contador === 2){
                    for(let i of grid){
                        if(cuotas.local===''){
                            cuotas.local = i.textContent.trim();
                        }
                         else{
                            cuotas.visitante = i.textContent.trim();
                            listaEquipos.push({cuotas});
                            cuotas = {
                                local:'',
                                empate: '',
                                visitante:'',
                            }
                            // equiposActuales++;
                        }
                    }
                    }else if(!boolean && contador === 0){
                        for(let i of grid){
                            if(numCuotas === 3){
                                if(cuotas.local===''){
                                    cuotas.local = i.textContent.trim();
                                }
                                else if(cuotas.visitante === '' && cuotas.empate === '' && cuotas.local !== ''){
                                    cuotas.empate = i.textContent.trim();
                                } 
                                else if(cuotas.local !== '' && cuotas.empate !== ''){
                                    cuotas.visitante = i.textContent.trim();
                                    listaEquipos.push({cuotas});
                                    cuotas = {
                                        local:'',
                                        empate: '',
                                        visitante:'',
                                    }
                                    // equiposActuales++;
                                }
                            }else{
                                if(cuotas.local===''){
                                    cuotas.local = i.textContent.trim();
                                }
                                 else{
                                    cuotas.visitante = i.textContent.trim();
                                    listaEquipos.push({cuotas});
                                    cuotas = {
                                        local:'',
                                        empate: '',
                                        visitante:'',
                                    }
                                    // equiposActuales++;
                                }
                            }
                            
                        }
                    }     
                     
                    contador++;
                }
            })
            return {
                deporte: deporte,
                liga: liga,
                equipos: listaEquipos,
            };
        }, deporte)
    }))

    const json = listaActual.flatMap( element =>{
        var  deporte = element.deporte;
        var  liga = element.liga;
        let local
        let visitante
        let cuotaLocal 
        let cuotaVisitante
        let cuotaEmpate 
        let fecha
        let hora
         return element.equipos.map(el => {
             
            el.equipos !== undefined? (local = el.equipos.local,
                                         visitante = el.equipos.visitante )
                                         : (local, visitante);
            
            el.cuotas!== undefined? (cuotaLocal = el.cuotas.local,
                                    cuotaVisitante = el.cuotas.visitante,
                                    cuotaEmpate = el.cuotas.empate)
                                    : (cuotaLocal, cuotaVisitante, cuotaEmpate);
            el.fecha !== undefined? fecha = el.fecha: fecha;
            el.hora!== undefined? hora = el.hora: hora;
            
            if(deporte && liga&& local&&visitante&& cuotaLocal&& cuotaVisitante){
                const Data = new SportModel(deporte,liga,fecha,hora,local,visitante,cuotaLocal,cuotaVisitante,cuotaEmpate);
                // deporte = undefined;
                //  local = undefined;
                //  liga = undefined;
                 fecha = undefined
                 hora= undefined;
                 visitante= undefined; 
                 cuotaLocal= undefined;
                 cuotaVisitante= undefined;
                 cuotaEmpate = undefined;
                // console.log(Data);
                return Data;
            }
         })
    }).filter( filter => filter !== undefined && filter !== null );
    
        
    return json.flat();
}
module.exports= {ExtrarData}