const SENHA = "09/06/2023";

const loginScreen = document.getElementById("login-screen");
const mainScreen = document.getElementById("main-screen");
const galleryScreen = document.getElementById("gallery-screen");
const musicScreen = document.getElementById("music-screen");

const error = document.getElementById("error");
const daysCountSpan = document.getElementById("days-count");
const complimentText = document.getElementById("compliment-text");

const toMusicButton = document.getElementById("to-music-button");
const backFromMusic = document.getElementById("back-from-music");
const musicPlayButton = document.getElementById("music-play-button");
const loveSong = document.getElementById("love-song");

const compliments = [
  "Victória, seu sorriso ilumina meus dias.",
  "Eu te escolheria outra vez.",
  "Estar com você é meu lugar favorito.",
  "Você é o melhor pedaço da minha vida.",
  "Eu te amo infinitamente.",
  "Desde 09/06/2023, você é a minha melhor decisão."
];

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

document.getElementById("compliment-button").onclick = () => {
  const i = Math.floor(Math.random() * compliments.length);
  complimentText.textContent = compliments[i];
};

function atualizarContador() {
  const inicio = new Date(2023, 5, 9); // 09/06/2023 (mês começa em 0)
  const hoje = new Date();
  inicio.setHours(0, 0, 0, 0);
  hoje.setHours(0, 0, 0, 0);
  const diff = hoje - inicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  daysCountSpan.textContent = dias;
}

// Navegação entre telas principais
document.getElementById("next-button").onclick = () => {
  mainScreen.classList.add("hidden");
  galleryScreen.classList.remove("hidden");
};

document.getElementById("back-button").onclick = () => {
  galleryScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
};

// Navegação: galeria -> música
toMusicButton.onclick = () => {
  galleryScreen.classList.add("hidden");
  musicScreen.classList.remove("hidden");
};

// Navegação: música -> galeria
backFromMusic.onclick = () => {
  musicScreen.classList.add("hidden");
  galleryScreen.classList.remove("hidden");

  // Pausa a música se ainda estiver tocando
  if (!loveSong.paused) {
    loveSong.pause();
    loveSong.currentTime = 0;
    musicPlayButton.textContent = "▶️ Tocar nossa música";
    musicaTocando = false;
  }
};

// Controle da música
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
