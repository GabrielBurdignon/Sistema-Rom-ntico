const SENHA = "09/06/2023";

const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const galleryScreen = document.getElementById("gallery-screen");
const musicScreen = document.getElementById("music-screen");
const puzzleScreen = document.getElementById("puzzle-screen");
const memoryScreen = document.getElementById("memory-screen");

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

const toMemoryButton = document.getElementById("to-memory-button");
const memoryGrid = document.getElementById("memory-grid");
const memoryMessage = document.getElementById("memory-message");
const restartMemoryBtn = document.getElementById("restart-memory");
const backFromMemory = document.getElementById("back-from-memory");

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

// NAVEGAÇÃO QUEBRA-CABEÇA -> MEMÓRIA
toMemoryButton.onclick = () => {
  puzzleScreen.classList.add("hidden");
  memoryScreen.classList.remove("hidden");
  iniciarJogoMemoria();
};

// NAVEGAÇÃO MEMÓRIA -> QUEBRA-CABEÇA
backFromMemory.onclick = () => {
  memoryScreen.classList.add("hidden");
  puzzleScreen.classList.remove("hidden");
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

// 🧠 JOGO DA MEMÓRIA COM FOTOS
const imagensMemoria = [
  "/img/mem1.jpeg",
  "/img/mem2.jpeg",
  "/img/mem3.jpeg",
  "/img/mem4.jpeg",
  "/img/mem5.jpeg",
  "/img/mem6.jpeg"
];

let primeiraCarta = null;
let segundaCarta = null;
let travarClique = false;
let paresEncontrados = 0;

function iniciarJogoMemoria() {
  // duplica as imagens para formar os pares
  const cartas = embaralharArray([...imagensMemoria, ...imagensMemoria]);

  memoryGrid.innerHTML = "";
  primeiraCarta = null;
  segundaCarta = null;
  travarClique = false;
  paresEncontrados = 0;
  memoryMessage.textContent = "Encontre todos os pares dos nossos momentos. Clique em duas cartas por vez. 💞";
  memoryMessage.classList.remove("success");

  cartas.forEach((src, index) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.image = src;
    card.dataset.index = index.toString();

    // verso da carta (❔)
    const span = document.createElement("span");
    span.textContent = "❔";

    // imagem da carta
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Nosso momento";
    img.classList.add("memory-img");

    card.appendChild(span);
    card.appendChild(img);

    card.addEventListener("click", () => {
      if (travarClique) return;
      if (card.classList.contains("matched")) return;
      if (card === primeiraCarta) return;

      revelarCarta(card);

      if (!primeiraCarta) {
        primeiraCarta = card;
      } else {
        segundaCarta = card;
        checarParFotos();
      }
    });

    memoryGrid.appendChild(card);
  });
}

function revelarCarta(card) {
  card.classList.add("revealed");
}

function esconderCarta(card) {
  card.classList.remove("revealed");
}

function checarParFotos() {
  if (!primeiraCarta || !segundaCarta) return;

  travarClique = true;

  const ehPar = primeiraCarta.dataset.image === segundaCarta.dataset.image;

  if (ehPar) {
    primeiraCarta.classList.add("matched");
    segundaCarta.classList.add("matched");
    paresEncontrados++;

    primeiraCarta = null;
    segundaCarta = null;
    travarClique = false;

    if (paresEncontrados === imagensMemoria.length) {
      // número de pares = imagensMemoria.length
      memoryMessage.textContent = "Você encontrou todos os pares. Você sempre encontra o meu coração. 💘";
      memoryMessage.classList.add("success");
    }
  } else {
    setTimeout(() => {
      esconderCarta(primeiraCarta);
      esconderCarta(segundaCarta);
      primeiraCarta = null;
      segundaCarta = null;
      travarClique = false;
    }, 800);
  }
}

restartMemoryBtn.onclick = () => {
  iniciarJogoMemoria();
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
