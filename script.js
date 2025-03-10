const players = ["Dalí", "Talía", "Carmen"];
let currentPairIndex = 0;
let cardCount = 0;
let selectedLevel = "random";

const cards = [
  { nivel: 1, texto: "Mantén contacto visual con [nombre] por 5 segundos con una sonrisa tímida.", tiempo: 5 },
  { nivel: 1, texto: "¿Qué te intriga de la forma en que alguien te mira? (Todos responden)." },
  { nivel: 2, texto: "Roza el brazo de [nombre] al explicarle algo.", tiempo: 5 },
  { nivel: 2, texto: "¿Qué roce casual te ha hecho sonrojar?" },
  { nivel: 3, texto: "Acércate a [nombre] hasta que tus narices casi se toquen, luego retrocede con una sonrisa.", tiempo: 5 },
  { nivel: 3, texto: "¿Qué pensamiento sutil te ha rondado sobre alguien aquí?" }
];

function getNextPair() {
  const pairs = [[0, 1], [1, 2], [0, 2]];
  const pair = pairs[currentPairIndex];
  currentPairIndex = (currentPairIndex + 1) % 3;
  return [players[pair[0]], players[pair[1]]];
}

function startTimer(duration) {
  let timeLeft = duration;
  const timer = document.getElementById("timer");
  timer.classList.remove("hidden");
  document.getElementById("timer-count").textContent = timeLeft;
  const timerBar = document.querySelector(".timer-bar");
  timerBar.style.width = "100%";
  const interval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer-count").textContent = timeLeft;
    timerBar.style.width = (timeLeft / duration * 100) + "%";
    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.classList.add("hidden");
    }
  }, 1000);
}

document.getElementById("start-config").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("config-screen").classList.remove("hidden");
});

document.getElementById("confirm-config").addEventListener("click", () => {
  selectedLevel = document.getElementById("level-select").value;
  document.getElementById("config-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
});

document.getElementById("draw-card").addEventListener("click", () => {
  const filteredCards = selectedLevel === "random" ? cards : cards.filter(card => card.nivel === parseInt(selectedLevel));
  const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
  const [player1, player2] = getNextPair();
  const cardText = randomCard.texto.replace("[nombre]", player2);
  const cardDisplay = document.getElementById("card-display");
  cardDisplay.innerHTML = `${player1} y ${player2}: ${cardText}`;
  cardDisplay.classList.remove("active");
  void cardDisplay.offsetWidth;
  cardDisplay.classList.add("active");
  cardCount++;
  document.getElementById("card-count").textContent = cardCount;
  document.getElementById("card-level").textContent = randomCard.nivel;
  if (randomCard.tiempo) startTimer(randomCard.tiempo);
});

document.getElementById("pass").addEventListener("click", () => {
  document.getElementById("card-display").innerHTML = "Turno pasado.";
  clearInterval(timerInterval);
  document.getElementById("timer").classList.add("hidden");
});
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​