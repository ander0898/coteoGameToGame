const express = require('express');
const app = express();
// const futbolBw = require('./Routes/BwinRoutes.js')
const cors = require('cors');
// const futbolRh = require('./Routes/rushbetRoutes');
// const RoutesError = require('./Routes/errorRoutes');
const { iniciarServices } = require('./services/iniciarServices');
// const futbolListas = require('./Routes/listaCombinadaRoutes.js');
const futbolRouter = require('./Routes/routesRoutes.js');
const tenisRoutes = require('./Routes/tenisRoutes.js');


app.use(express.json());
app.use(cors());
app.use(cors({
  origin:'*',
}))

  iniciarServices();

app.use("/api/Futbol", futbolRouter);
app.use('/api/Tenis',tenisRoutes);
// app.use('/api',RoutesError);
// app.use('/api/Futbol', futbolBw);
// app.use('/api/Futbol',futbolListas);


const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});
