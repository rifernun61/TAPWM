// ============================================================
//  ATIVIDADE 14 – Script de validação do Formulário Principal
//  Usa: document.nomeform.elements[] conforme requisito
// ============================================================

/**
 * Limpa todas as mensagens de erro e classes visuais.
 */
function limparErros() {
  const ids = ['erro-nome', 'erro-email', 'erro-comentario', 'erro-pesquisa'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  // Remove classes de estado dos inputs
  const form = document.nomeform;
  const inputs = form.elements;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove('input-error', 'input-ok');
  }
}

/**
 * Exibe mensagem de erro em um campo específico.
 * @param {string} campoId - ID do span de erro
 * @param {string} msg     - Mensagem a exibir
 * @param {HTMLElement} input - Elemento input para marcar com classe
 */
function mostrarErro(campoId, msg, input) {
  const span = document.getElementById(campoId);
  if (span) {
    span.textContent = msg;
    // Re-aciona a animação de shake
    span.style.animation = 'none';
    span.offsetHeight; // força reflow
    span.style.animation = '';
  }
  if (input) {
    input.classList.remove('input-ok');
    input.classList.add('input-error');
  }
}

/**
 * Marca campo como válido.
 * @param {HTMLElement} input
 */
function marcarOk(input) {
  if (input) {
    input.classList.remove('input-error');
    input.classList.add('input-ok');
  }
}

/**
 * Abre o modal de resultado com a mensagem desejada.
 * @param {string} mensagem - Texto a exibir no modal
 */
function abrirModal(mensagem) {
  const overlay = document.getElementById('modal-overlay');
  const msg     = document.getElementById('modal-msg');
  const titulo  = document.getElementById('modal-titulo');
  const icone   = document.getElementById('modal-icon');

  msg.textContent = mensagem;

  // Adapta ícone e título dependendo da mensagem
  if (mensagem.includes('voltou')) {
    icone.textContent  = '👋';
    titulo.textContent = 'Seja bem-vindo de volta!';
  } else {
    icone.textContent  = '✅';
    titulo.textContent = 'Obrigado!';
  }

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('ativo');
}

/**
 * Fecha o modal de resultado.
 */
function fecharModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('ativo');
  overlay.setAttribute('aria-hidden', 'true');
}

/**
 * Função principal de validação.
 * Acionada pelo evento onsubmit do formulário.
 * @returns {boolean} false – impede envio real; true – permite
 */
function validar() {
  limparErros();

  // Referência ao formulário pelo nome (document.nomeform)
  const form   = document.nomeform;
  const inputs = form.elements; // <-- uso obrigatório de elements[]

  // --------------------------------------------------
  // 1. Campo Nome – mínimo 10 caracteres
  //    Usa document.nomeform.elements['nome']
  // --------------------------------------------------
  const campoNome  = inputs['nome'];
  const valorNome  = campoNome.value.trim();

  if (valorNome === '') {
    mostrarErro('erro-nome', 'O campo Nome é obrigatório.', campoNome);
  } else if (valorNome.length < 10) {
    mostrarErro(
      'erro-nome',
      `Nome muito curto (${valorNome.length}/10 caracteres mínimos).`,
      campoNome
    );
  } else {
    marcarOk(campoNome);
  }

  // --------------------------------------------------
  // 2. Campo E-mail – validação de formato (type=email)
  //    Usa document.nomeform.elements['email']
  // --------------------------------------------------
  const campoEmail = inputs['email'];
  const valorEmail = campoEmail.value.trim();
  // Regex simples para e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valorEmail === '') {
    mostrarErro('erro-email', 'O campo E-mail é obrigatório.', campoEmail);
  } else if (!regexEmail.test(valorEmail)) {
    mostrarErro('erro-email', 'Informe um e-mail válido.', campoEmail);
  } else {
    marcarOk(campoEmail);
  }

  // --------------------------------------------------
  // 3. Campo Comentário – mínimo 20 caracteres
  //    Usa document.nomeform.elements['comentario']
  // --------------------------------------------------
  const campoComentario = inputs['comentario'];
  const valorComentario = campoComentario.value.trim();

  if (valorComentario === '') {
    mostrarErro('erro-comentario', 'O campo Comentário é obrigatório.', campoComentario);
  } else if (valorComentario.length < 20) {
    mostrarErro(
      'erro-comentario',
      `Comentário muito curto (${valorComentario.length}/20 caracteres mínimos).`,
      campoComentario
    );
  } else {
    marcarOk(campoComentario);
  }

  // --------------------------------------------------
  // 4. Pesquisa (radio) – obrigatório
  //    Ambos os radios têm name="pesquisa"
  //    Usa document.nomeform.elements['pesquisa']
  // --------------------------------------------------
  const radiosPesquisa = inputs['pesquisa']; // RadioNodeList
  let   valorPesquisa  = null;

  // Percorre a NodeList para encontrar o selecionado
  for (let i = 0; i < radiosPesquisa.length; i++) {
    if (radiosPesquisa[i].checked) {
      valorPesquisa = radiosPesquisa[i].value;
      break;
    }
  }

  if (!valorPesquisa) {
    mostrarErro('erro-pesquisa', 'Por favor, responda à pesquisa.');
  }

  // --------------------------------------------------
  // Verifica se há algum erro antes de prosseguir
  // --------------------------------------------------
  const temErro =
    valorNome.length < 10            ||
    valorNome === ''                 ||
    !regexEmail.test(valorEmail)     ||
    valorEmail === ''                ||
    valorComentario.length < 20      ||
    valorComentario === ''           ||
    !valorPesquisa;

  if (temErro) {
    return false; // Impede o envio do formulário
  }

  // --------------------------------------------------
  // 5. Define mensagem final de acordo com a pesquisa
  //    Não: "Que bom que você voltou a visitar esta página!"
  //    Sim: "Volte sempre à esta página!"
  // --------------------------------------------------
  let mensagemFinal;

  if (valorPesquisa === 'nao') {
    mensagemFinal = 'Que bom que você voltou a visitar esta página!';
  } else {
    mensagemFinal = 'Volte sempre à esta página!';
  }

  abrirModal(mensagemFinal);

  return false; // Não há back-end, então evitamos o reload
}

// Fecha modal ao clicar fora do card
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) fecharModal();
});
