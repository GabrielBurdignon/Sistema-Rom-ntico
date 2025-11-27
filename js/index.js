const SENHA = "09/06/2023";

const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const galleryScreen = document.getElementById("gallery-screen");
const musicScreen = document.getElementById("music-screen");
const puzzleScreen = document.getElementById("puzzle-screen");

const error = document.getElementById("error");
const daysCountSpan = document.getElementById("days-count");
const complimentText = document.getElementById("compliment-text");

const toMusicButton = document.getElementById("to-music-button");
const backFromMusic = document.getElementById("back-from-music");
const musicPlayButton = document.getElementById("music-play-button");
const loveSong = document.getElementById("love-song");

const toPuzzleButton = document.getElementById("to-puzzle-button");
const backFromPuzzle = document.getElementById("back-from-puzzle");
const shufflePuzzleBtn = document.getElementById("shuffle-puzzle");
const puzzlePieces = Array.from(document.querySelectorAll(".puzzle-piece"));
const puzzleMessage = document.getElementById("puzzle-message");

const compliments = [
  "Victória, seu sorriso ilumina meus dias.",
  "Eu te escolheria outra vez.",
  "Estar com você é meu lugar favorito.",
  "Você é o melhor pedaço da minha vida.",
  "Eu te amo infinitamente.",
  "Desde 09/06/2023, você é a minha melhor decisão."
];

// LOGIN
document.getElementById("login-button").onclick = () => {
  const value = document.getElementById("password").value.trim();

  if (value === SENHA) {
    error.textContent = "";
    loginScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");
    atualizarContador();
  } else {
    error.textContent = "Essa não é a nossa data, meu amor ❤️";
  }
};

document.getElementById("password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("login-button").click();
  }
});

// CARINHO
document.getElementById("compliment-button").onclick = () => {
  const i = Math.floor(Math.random() * compliments.length);
  complimentText.textContent = compliments[i];
};

// CONTADOR DE DIAS
function atualizarContador() {
  const inicio = new Date(2023, 5, 9); // 09/06/2023 (mês começa em 0)
  const hoje = new Date();
  inicio.setHours(0, 0, 0, 0);
  hoje.setHours(0, 0, 0, 0);
  const diff = hoje - inicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  daysCountSpan.textContent = dias;
}

// NAVEGAÇÃO PRINCIPAL
document.getElementById("next-button").onclick = () => {
  mainScreen.classList.add("hidden");
  galleryScreen.classList.remove("hidden");
};

document.getElementById("back-button").onclick = () => {
  galleryScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
};

// NAVEGAÇÃO GALERIA -> MÚSICA
toMusicButton.onclick = () => {
  galleryScreen.classList.add("hidden");
  musicScreen.classList.remove("hidden");
};

// NAVEGAÇÃO MÚSICA -> GALERIA
backFromMusic.onclick = () => {
  musicScreen.classList.add("hidden");
  galleryScreen.classList.remove("hidden");
  // pausa música
  if (!loveSong.paused) {
    loveSong.pause();
    loveSong.currentTime = 0;
    musicPlayButton.textContent = "▶️ Tocar nossa música";
    musicaTocando = false;
  }
};

// CONTROLE DA MÚSICA (AUDIO)
let musicaTocando = false;

musicPlayButton.onclick = () => {
  if (!musicaTocando) {
    loveSong.play();
    musicaTocando = true;
    musicPlayButton.textContent = "⏸ Pausar nossa música";
  } else {
    loveSong.pause();
    musicaTocando = false;
    musicPlayButton.textContent = "▶️ Tocar nossa música";
  }
};

loveSong.addEventListener("ended", () => {
  musicaTocando = false;
  musicPlayButton.textContent = "▶️ Tocar nossa música";
});

// NAVEGAÇÃO MÚSICA -> QUEBRA-CABEÇA
toPuzzleButton.onclick = () => {
  musicScreen.classList.add("hidden");
  puzzleScreen.classList.remove("hidden");
  iniciarPuzzle();
};

// NAVEGAÇÃO QUEBRA-CABEÇA -> MÚSICA
backFromPuzzle.onclick = () => {
  puzzleScreen.classList.add("hidden");
  musicScreen.classList.remove("hidden");
};

// 🧩 LÓGICA DO QUEBRA-CABEÇA
// Cada peça tem data-position (posição correta 0-3) e data-piece (qual pedaço está nela)
function definirBackgroundPorPeca(el) {
  const pieceIndex = parseInt(el.dataset.piece, 10);
  // calcula posição do background para 2x2
  const col = pieceIndex % 2;      // 0 ou 1
  const row = Math.floor(pieceIndex / 2); // 0 ou 1
  const x = -col * 80; // 80 = tamanho da peça
  const y = -row * 80;
  el.style.backgroundPosition = `${x}px ${y}px`;
}

function embaralharArray(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function iniciarPuzzle() {
  // posição correta: 0,1,2,3
  const corretas = [0, 1, 2, 3];
  const embaralhadas = embaralharArray(corretas);

  puzzlePieces.forEach((el, idx) => {
    el.dataset.position = idx.toString(); // posição fixa na grade
    el.dataset.piece = embaralhadas[idx].toString(); // pedaço atual
    definirBackgroundPorPeca(el);
    el.classList.remove("selected");
  });

  puzzleMessage.textContent = "Clique em duas peças para trocar de lugar.";
  puzzleMessage.classList.remove("success");
  pecasSelecionadas = [];
}

let pecasSelecionadas = [];

puzzlePieces.forEach((el) => {
  el.addEventListener("click", () => {
    if (pecasSelecionadas.length === 0) {
      pecasSelecionadas.push(el);
      el.classList.add("selected");
    } else if (pecasSelecionadas.length === 1 && pecasSelecionadas[0] !== el) {
      pecasSelecionadas.push(el);
      pecasSelecionadas[1].classList.add("selected");

      // troca os pedaços
      const p1 = pecasSelecionadas[0];
      const p2 = pecasSelecionadas[1];

      const tempPiece = p1.dataset.piece;
      p1.dataset.piece = p2.dataset.piece;
      p2.dataset.piece = tempPiece;

      definirBackgroundPorPeca(p1);
      definirBackgroundPorPeca(p2);

      p1.classList.remove("selected");
      p2.classList.remove("selected");
      pecasSelecionadas = [];

      verificarSeConcluiu();
    }
  });
});

function verificarSeConcluiu() {
  const completo = puzzlePieces.every((el) => el.dataset.piece === el.dataset.position);
  if (completo) {
    puzzleMessage.textContent = "Você me completa. 💘";
    puzzleMessage.classList.add("success");
  }
}

shufflePuzzleBtn.onclick = () => {
  iniciarPuzzle();
};

/* 💞 Corações flutuando */
function criarCoracao() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.textContent = "💞";

  const tamanho = Math.random() * 14 + 14; // 14 a 28px
  const left = Math.random() * 100; // porcentagem da largura
  const duracao = Math.random() * 4 + 6; // 6 a 10s

  heart.style.left = left + "vw";
  heart.style.fontSize = tamanho + "px";
  heart.style.animationDuration = duracao + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duracao * 1000);
}

// Cria corações continuamente
setInterval(criarCoracao, 800);

// inicia puzzle se a tela for aberta direto por algum motivo
// (opcional, só pra não ficar em estado vazio)
