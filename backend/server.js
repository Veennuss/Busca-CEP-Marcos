const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permite que o frontend, que roda em outra porta,
// faça requisições para este backend.
app.use(cors());
app.use(express.json());


// ROTA DA NOSSA API

app.get('/api/ceps/:cep', async (req, res) => {
  const cep = req.params.cep.replace(/\D/g, '');

  if (cep.length !== 8) {
    return res.status(400).json({
      erro: true,
      mensagem: 'CEP inválido. Digite 8 números.'
    });
  }

  try {
    // Somente o BACKEND conversa com o ViaCEP.
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

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

    // Nossa API decide quais dados serão enviados ao frontend.
    return res.json({
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
      ddd: endereco.ddd
    });

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: true,
      mensagem: 'Erro interno ao consultar o CEP.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
