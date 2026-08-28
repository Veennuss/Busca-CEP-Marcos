const express = require('express');

//CORS: Por causa dele, o Front pode fzr requisições
//Para o Backend
const cors = require('cors');

//importa as rotas
const cepRoutes = require('./routes/cepRoutes');


const app = express();
const PORT = 3000;

//Libera requisições que vem do Frontend
app.use(cors());

//Permite q a API trabalhe com dados em JSON
app.use(express.json());


//ROTAS da API
app.use('/api/ceps', cepRoutes);

//
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});