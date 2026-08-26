// ============================================================
// MENU RESPONSIVO
// ============================================================

const menuToggle = document.querySelector('#menuToggle');
const menuPrincipal = document.querySelector('#menuPrincipal');
const linksMenu = document.querySelectorAll('#menuPrincipal a');

menuToggle.addEventListener('click', () => {
  const menuAberto = menuPrincipal.classList.toggle('aberto');

  menuToggle.classList.toggle('aberto', menuAberto);
  menuToggle.setAttribute('aria-expanded', menuAberto);
  menuToggle.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
});

linksMenu.forEach((link) => {
  link.addEventListener('click', () => {
    menuPrincipal.classList.remove('aberto');
    menuToggle.classList.remove('aberto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

// ============================================================
// ELEMENTOS DA PÁGINA
// ============================================================

const formCep = document.querySelector('#formCep');
const inputCep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botaoBuscar');
const mensagem = document.querySelector('#mensagem');
const resultado = document.querySelector('#resultado');
const estadoInicial = document.querySelector('#estadoInicial');

const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const ddd = document.querySelector('#ddd');

//******* */ Endereço do nosso BACKEND
const API = 'http://localhost:3000';

// ============================================================
// MÁSCARA DO CEP
// ============================================================

inputCep.addEventListener('input', () => {
  let cep = inputCep.value.replace(/\D/g, '');

  if (cep.length > 5) {
    cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`
  }

  inputCep.value = cep;
})

// ============================================================
// CONSULTA DO CEP
// Frontend -> Nossa API -> ViaCEP
// ============================================================

formCep.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const cep = inputCep.value.replace(/\D/g, '');

  mensagem.innerText = '';
  resultado.classList.add('oculto');
  estadoInicial.classList.remove('oculto');

  if (cep.length !== 8) {
    mensagem.innerText = 'Digite um CEP válido com 8 números';
    inputCep.focus();
    return;
  }

  try {

    botaoBuscar.disabled = true;
    botaoBuscar.innerText = 'Buscando...';
    mensagem.innerText = 'Consultado a API ViaCEP...';

    // O FRONTEND chama apenas o nosso BACKEND
    const resposta = await fetch(`${API}/api/ceps/${cep}`);

    // Converte a resposta do backend em JSON
    const dados = await resposta.json();

// Se o backend retornar erro: 400, 404, 500...
    if (!resposta.ok) {
      mensagem.innerText =
        dados.mensagem || 'Não foi possível consultar o CEP.';
     
        return;
    }


   
// Exibe os dados retornados pelo nosso backend
    logradouro.innerText = endereco.logradouro || 'Não informado'
    bairro.innerText = endereco.bairro || 'Não informado'
    cidade.innerText = endereco.localidade || 'Não informado'
    estado.innerText = endereco.uf || 'Não informado'
    ddd.innerText = endereco.ddd || 'Não informado'

    mensagem.innerText = 'Consulta realizada com sucesso!';

    resultado.classList.remove('oculto');
    estadoInicial.classList.add('oculto');

  } catch (erro) {
    
    console.error(erro);

    mensagem.innerText = 'Não foi possível conectar ao backend';


  } finally {

    botaoBuscar.disabled = false;
    botaoBuscar.innerText = 'Buscar';
    
  }
});