const {fetch, ProxyAgent}  = require('undici');



//Configuração de Proxy


const USAR_PROXY = true;

const proxyAgente = USAR_PROXY
? new ProxyAgent('http://172.16.0.253:3128')
: undefined;





//Service de CEP


//O service fica responsável por conversar com serviços externos
//Nesse projeto, ele faz a comunicação com a API ViaCEP

async function consultarViaCep(cep) {

    const opcoes = {};

    if (proxyAgente) {
        opcoes.dispatcher = proxyAgente;
    }


    const resposta = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`, opcoes
    );


    if (!resposta.ok) {
        throw new Error('ERRO_VIACEP');
    }

    //Converte a resposta do ViaCEP para JSON
    const endereco = await resposta.json();

//Devolve os dados pro Controller
    return endereco;
}


//Exporta a função para ser usada no Controller.
module.exports = {
    consultarViaCep
};