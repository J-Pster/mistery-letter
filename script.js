// Definindo atalhos de funções
const query = document.querySelector.bind(document);

// Definindo variáveis globais
const inputCarta = query('#carta-texto');
const paiCarta = query('#carta-gerada');
const botaoCarta = query('#criar-carta');
const contadorCarta = query('#carta-contador');

// -- Criando a carta
// Limpa a área de cartas
function limparPaiCarta() {
  paiCarta.innerHTML = '';
}

// Corta as palavras e uma string passada
function cortarAsPalavras(carta) {
  const cartaCortada = carta.split(' ');
  return cartaCortada;
}

// -- Adicionando classes nas palavras
const grupoEstilo = ['newspaper', 'magazine1', 'magazine2'];
const grupoTamanho = ['medium', 'big', 'reallybig'];
const grupoRotacao = ['rotateleft', 'rotateright'];
const grupoInclinacao = ['skewleft', 'skewright'];

// Escolhendo um classe aleatória
function escolherClasseAletoria(array) {
  const numeroAleatorio = Math.floor(Math.random() * array.length);
  return array[numeroAleatorio];
}

// Colocando a classe aleatoria escolhida
function colocarClasseAletoria(elemento, grupo) {
  elemento.classList.add(escolherClasseAletoria(grupo));
}

// Executando as duas funções de cima para todas as classes no span
function colocarClassesNosSpan() {
  const palavras = paiCarta.children;
  for (let i = 0; i < palavras.length; i += 1) {
    colocarClasseAletoria(palavras[i], grupoEstilo);
    colocarClasseAletoria(palavras[i], grupoTamanho);
    colocarClasseAletoria(palavras[i], grupoRotacao);
    colocarClasseAletoria(palavras[i], grupoInclinacao);
  }
}

// Adicionando novas classes em um elemento clicado
function alterarClasses(event) {
  const origem = event.target;
  origem.className = '';
  colocarClasseAletoria(origem, grupoEstilo);
  colocarClasseAletoria(origem, grupoTamanho);
  colocarClasseAletoria(origem, grupoRotacao);
  colocarClasseAletoria(origem, grupoInclinacao);
}

// ----- Cria uma carta -----
function criarCarta(cartaCortada) {
  limparPaiCarta();
  for (let i = 0; i < cartaCortada.length; i += 1) {
    const span = document.createElement('span');
    span.innerText = cartaCortada[i];
    span.addEventListener('click', alterarClasses);
    paiCarta.appendChild(span);
  }
}

// Função feita para criar a carta escrita no input ou escrever um texto caso não seja identificado nenhum texto no input.
function cartaDoInput() {
  if (inputCarta.value === '' || inputCarta.value === ' ') {
    paiCarta.innerText = 'Por favor, digite o conteúdo da carta.';
    return;
  }
  const palavrasCortadas = cortarAsPalavras(inputCarta.value);
  contadorCarta.innerText = palavrasCortadas.length;
  criarCarta(palavrasCortadas);
  colocarClassesNosSpan();
}

botaoCarta.addEventListener('click', cartaDoInput);
