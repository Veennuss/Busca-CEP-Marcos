const express = require('express');

//Permite separar as rotas do arquivo principal
const router = express.Router();

//Importa o controller
const cepController = require('../controllers/cepController');

//GET /api/ceps/:cep

//Aqui se define qual rota existe e qual função será executada
//o endereço completo é:
//GET http://localhost:3000/api/ceps/13484320

///api/ceps vem do server.js e :/ vem dessa rota
router.get('/:cep', cepController.buscarCep);

//importa as ritas para o server.js
module.exports = router;