const players = [
  { ko: "마이클 조던", en: "Michael Jordan", nationality: "미국 🇺🇸", height: "198 cm", team: "시카고 불스", hand: "오른손" },
  { ko: "코비 브라이언트", en: "Kobe Bryant", nationality: "미국 🇺🇸", height: "198 cm", team: "LA 레이커스", hand: "오른손" },
  { ko: "샤킬 오닐", en: "Shaquille O'Neal", nationality: "미국 🇺🇸", height: "216 cm", team: "LA 레이커스", hand: "오른손" },
  { ko: "팀 던컨", en: "Tim Duncan", nationality: "미국 🇺🇸", height: "211 cm", team: "샌안토니오 스퍼스", hand: "오른손" },
  { ko: "래리 버드", en: "Larry Bird", nationality: "미국 🇺🇸", height: "206 cm", team: "보스턴 셀틱스", hand: "오른손" },
  { ko: "디르크 노비츠키", en: "Dirk Nowitzki", nationality: "독일 🇩🇪", height: "213 cm", team: "댈러스 매버릭스", hand: "오른손" },
  { ko: "야오밍", en: "Yao Ming", nationality: "중국 🇨🇳", height: "229 cm", team: "휴스턴 로키츠", hand: "오른손" },
  { ko: "마누 지노빌리", en: "Manu Ginobili", nationality: "아르헨티나 🇦🇷", height: "198 cm", team: "샌안토니오 스퍼스", hand: "왼손" },
  { ko: "토니 파커", en: "Tony Parker", nationality: "프랑스 🇫🇷", height: "188 cm", team: "샌안토니오 스퍼스", hand: "오른손" },
  { ko: "스티브 내시", en: "Steve Nash", nationality: "캐나다 🇨🇦", height: "191 cm", team: "피닉스 선스", hand: "오른손" },
  { ko: "파우 가솔", en: "Pau Gasol", nationality: "스페인 🇪🇸", height: "213 cm", team: "LA 레이커스", hand: "오른손" },
  { ko: "하킴 올라주원", en: "Hakeem Olajuwon", nationality: "나이지리아 🇳🇬", height: "213 cm", team: "휴스턴 로키츠", hand: "오른손" }
];

const ui = {
  nationality: document.querySelector("#nationality"),
  height: document.querySelector("#height"),
  team: document.querySelector("#team"),
  hand: document.querySelector("#hand"),
  round: document.querySelector("#roundCounter"),
  form: document.querySelector("#answerForm"),
  input: document.querySelector("#answerInput"),
  feedback: document.querySelector("#feedback"),
  score: document.querySelector("#score"),
  streak: document.querySelector("#streak"),
  best: document.querySelector("#best"),
  next: document.querySelector("#nextButton")
};

let deck = [];
let currentPlayer;
let round = 0;
let attempts = 0;
let score = 0;
let streak = 0;
let best = 0;
let answered = false;

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function normalize(value) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9가-힣]/g, "");
}

function isCorrectAnswer(answer) {
  const guess = normalize(answer);
  return guess === normalize(currentPlayer.ko) || guess === normalize(currentPlayer.en);
}

function updateStats() {
  ui.score.textContent = score;
  ui.streak.textContent = `${streak} 🔥`;
  ui.best.textContent = best;
}

function loadRound() {
  if (deck.length === 0) {
    deck = shuffle(players);
    round = 0;
  }

  currentPlayer = deck.pop();
  round += 1;
  attempts = 0;
  answered = false;

  ui.nationality.textContent = currentPlayer.nationality;
  ui.height.textContent = currentPlayer.height;
  ui.team.textContent = currentPlayer.team;
  ui.hand.textContent = currentPlayer.hand;
  ui.round.textContent = `ROUND ${String(round).padStart(2, "0")} / ${players.length}`;
  ui.feedback.textContent = "";
  ui.feedback.className = "feedback";
  ui.input.value = "";
  ui.input.disabled = false;
  ui.next.hidden = true;
  ui.input.focus();
}

function finishRound(message, wasCorrect) {
  answered = true;
  ui.input.disabled = true;
  ui.feedback.textContent = message;
  ui.feedback.className = `feedback ${wasCorrect ? "correct" : "wrong"}`;
  ui.next.textContent = deck.length === 0 ? "새 게임 시작 →" : "다음 선수 →";
  ui.next.hidden = false;
  updateStats();
}

ui.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (answered) return;

  const answer = ui.input.value.trim();
  if (!answer) {
    ui.feedback.textContent = "선수 이름을 먼저 입력해 주세요.";
    ui.feedback.className = "feedback wrong";
    ui.input.focus();
    return;
  }

  attempts += 1;
  if (isCorrectAnswer(answer)) {
    const earned = attempts === 1 ? 100 : 50;
    score += earned;
    streak += 1;
    best = Math.max(best, streak);
    finishRound(`정답! ${currentPlayer.ko}입니다. +${earned}점`, true);
  } else if (attempts < 2) {
    ui.feedback.textContent = "아쉽네요! 한 번 더 생각해 보세요. (남은 기회 1번)";
    ui.feedback.className = "feedback wrong";
    ui.input.select();
  } else {
    streak = 0;
    finishRound(`정답은 ${currentPlayer.ko} (${currentPlayer.en})였습니다.`, false);
  }
});

ui.next.addEventListener("click", loadRound);

deck = shuffle(players);
loadRound();
updateStats();
