const express = require('express');
const cors = require('cors');
const { fetch, ProxyAgent } = require('undici');

const app = express();
const PORT = 3000;


// ============================================================
// PROXY DA ESCOLA
// ============================================================

const proxyAgent = new ProxyAgent(
  'http://172.16.0.253:3128'
);


// ============================================================
// MIDDLEWARES
// ============================================================

app.use(cors());
app.use(express.json());


// ============================================================
// ROTA DA NOSSA API
// ============================================================

app.get('/api/ceps/:cep', async (req, res) => {

  const cep = req.params.cep.replace(/\D/g, '');

  if (cep.length !== 8) {

    return res.status(400).json({
      erro: true,
      mensagem: 'CEP inválido. Digite 8 números.'
    });

  }

  try {

    console.log(`Consultando CEP ${cep}...`);

    // Somente o BACKEND conversa com o ViaCEP.
    // Na rede da escola, a requisição passa pelo proxy.
    const resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`,
      {
        dispatcher: proxyAgent
      }
    );


    if (!resposta.ok) {

      return res.status(502).json({
        erro: true,
        mensagem: 'Não foi possível consultar o ViaCEP.'
      });

    }


    const endereco = await resposta.json();


    if (endereco.erro) {

      return res.status(404).json({
        erro: true,
        mensagem: 'CEP não encontrado.'
      });

    }


    return res.json({
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
      ddd: endereco.ddd
    });


  } catch (erro) {

    console.error('Erro ao consultar ViaCEP:');
    console.error(erro);

    return res.status(500).json({
      erro: true,
      mensagem: 'Erro interno ao consultar o CEP.',
      detalhe: erro.message
    });

  }

});


// ============================================================
// SERVIDOR
// ============================================================

app.listen(PORT, () => {

  console.log(`Backend rodando em http://localhost:${PORT}`);

});