//Improta o service pra consultar o ViaCEP
const cepService = require('../services/cepService');


//Busca CEP
async function buscarCep(req, res) {
    
//replace(/\D/g, '') remove tudo que não for número
    const cep = req.params.cep.replace(/\D/g, '');


//Valida o CEP
//Condição para o CEP ter 8 números
    if (cep.length !== 8) {
        return res.status(400).json({
            erro: true,
            mensagem: 'CEP inválido. Digite 8 números.'
        });
    }

    try {


//O controller não consulta o ViaCEP diretamente
//Ele pede pro service fazer isso

        const endereco = await cepService.consultarViaCep(cep);

//O ViaCEP devolve {errp: true} quando o Ceo tem 8 números
//Mas não existe
        if (endereco.erro) {
            return res.status(404).json({
                erro: true,
                mensagem: 'CEP não encontrado.'
            });
        }

        //Resposta da API
        //A API decide quais dados vão para o Frontend

        return res.status(200).json({
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf,
            ddd: endereco.ddd
        })
    } catch(erro) {

        console.error(erro);

        if (erro.message === 'ERRO_VIACEP') {
            return res.status(502).json({
                erro: true,
                mensagem: 'Não foi possível consultar o ViaCep.'
            });
        }


        return res.status(500).json({
            erro: true,
            mensagem: 'Erro interno ao consultar o CEP.'
        });
    }
}


//Exporta a função para ser usada em routes/cepRoutes.js
module.exports = {
    buscarCep
};