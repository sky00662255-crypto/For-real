const players = [
  { ko: "마이클 조던", en: "Michael Jordan", nationality: "미국", height: "198", team: "시카고 불스", hand: "오른손" },
  { ko: "코비 브라이언트", en: "Kobe Bryant", nationality: "미국", height: "198", team: "LA 레이커스", hand: "오른손" },
  { ko: "샤킬 오닐", en: "Shaquille O'Neal", nationality: "미국", height: "216", team: "LA 레이커스", hand: "오른손" },
  { ko: "팀 던컨", en: "Tim Duncan", nationality: "미국", height: "211", team: "샌안토니오 스퍼스", hand: "오른손" },
  { ko: "래리 버드", en: "Larry Bird", nationality: "미국", height: "206", team: "보스턴 셀틱스", hand: "오른손" },
  { ko: "디르크 노비츠키", en: "Dirk Nowitzki", nationality: "독일", height: "213", team: "댈러스 매버릭스", hand: "오른손" },
  { ko: "야오밍", en: "Yao Ming", nationality: "중국", height: "229", team: "휴스턴 로키츠", hand: "오른손" },
  { ko: "마누 지노빌리", en: "Manu Ginobili", nationality: "아르헨티나", height: "198", team: "샌안토니오 스퍼스", hand: "왼손" },
  { ko: "토니 파커", en: "Tony Parker", nationality: "프랑스", height: "188", team: "샌안토니오 스퍼스", hand: "오른손" },
  { ko: "스티브 내시", en: "Steve Nash", nationality: "캐나다", height: "191", team: "피닉스 선스", hand: "오른손" },
  { ko: "파우 가솔", en: "Pau Gasol", nationality: "스페인", height: "213", team: "LA 레이커스", hand: "오른손" },
  { ko: "하킴 올라주원", en: "Hakeem Olajuwon", nationality: "나이지리아", height: "213", team: "휴스턴 로키츠", hand: "오른손" }
];

const fieldNames = {
  nationality: "국적",
  height: "키",
  team: "대표 소속팀",
  hand: "주로 쓰는 손"
};
const maxAttempts = 6;

const ui = {
  playerName: document.querySelector("#playerName"),
  englishName: document.querySelector("#englishName"),
  round: document.querySelector("#roundCounter"),
  form: document.querySelector("#answerForm"),
  feedback: document.querySelector("#feedback"),
  attempts: document.querySelector("#attemptCount"),
  history: document.querySelector("#guessHistory"),
  score: document.querySelector("#score"),
  streak: document.querySelector("#streak"),
  best: document.querySelector("#best"),
  next: document.querySelector("#nextButton"),
  inputs: {
    nationality: document.querySelector("#nationalityInput"),
    height: document.querySelector("#heightInput"),
    team: document.querySelector("#teamInput"),
    hand: document.querySelector("#handInput")
  }
};

let deck = [];
let currentPlayer;
let round = 0;
let attempts = 0;
let score = 0;
let streak = 0;
let best = 0;
let roundFinished = false;
let correctFields = new Set();

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

function isFieldCorrect(field, value) {
  if (field === "height") {
    return value.replace(/\D/g, "") === currentPlayer.height;
  }

  return normalize(value) === normalize(currentPlayer[field]);
}

function setFieldState(field, isCorrect) {
  const input = ui.inputs[field];
  const card = input.closest(".clue");
  const icon = card.querySelector(".result-icon");

  card.classList.remove("is-correct", "is-wrong");
  card.classList.add(isCorrect ? "is-correct" : "is-wrong");
  icon.textContent = isCorrect ? "✓" : "✕";
  input.setAttribute(
    "aria-label",
    `${fieldNames[field]} ${isCorrect ? "정답" : "오답"}`
  );

  if (isCorrect) {
    input.disabled = true;
  }
}

function addGuessRow(results) {
  const row = document.createElement("div");
  row.className = "guess-row";
  row.setAttribute("aria-label", `${attempts}번째 도전 결과`);

  Object.keys(ui.inputs).forEach((field) => {
    const cell = document.createElement("div");
    const value = ui.inputs[field].value.trim();
    const isCorrect = results[field];
    cell.className = `guess-cell ${isCorrect ? "correct" : "wrong"}`;

    const text = document.createElement("span");
    text.textContent = field === "height" ? `${value.replace(/\D/g, "")} cm` : value;
    cell.appendChild(text);

    if (field === "height" && !isCorrect) {
      const enteredHeight = Number(value.replace(/\D/g, ""));
      const targetHeight = Number(currentPlayer.height);
      const arrow = document.createElement("strong");
      arrow.className = "height-arrow";
      arrow.textContent = enteredHeight < targetHeight ? "↑" : "↓";
      arrow.setAttribute(
        "aria-label",
        enteredHeight < targetHeight ? "정답은 더 큽니다" : "정답은 더 작습니다"
      );
      cell.appendChild(arrow);
    }

    row.appendChild(cell);
  });

  ui.history.appendChild(row);
}

function updateStats() {
  ui.score.textContent = score;
  ui.streak.textContent = `${streak} 🔥`;
  ui.best.textContent = best;
}

function resetFields() {
  Object.values(ui.inputs).forEach((input) => {
    input.value = "";
    input.disabled = false;
    input.removeAttribute("aria-label");
    input.closest(".clue").classList.remove("is-correct", "is-wrong");
    input.closest(".clue").querySelector(".result-icon").textContent = "";
  });
}

function loadRound() {
  if (deck.length === 0) {
    deck = shuffle(players);
    round = 0;
  }

  currentPlayer = deck.pop();
  round += 1;
  attempts = 0;
  roundFinished = false;
  correctFields = new Set();

  ui.playerName.textContent = currentPlayer.ko;
  ui.englishName.textContent = currentPlayer.en;
  ui.round.textContent = `ROUND ${String(round).padStart(2, "0")} / ${players.length}`;
  ui.attempts.textContent = `남은 기회 ${maxAttempts}회`;
  ui.feedback.textContent = "네 가지 정보를 모두 입력한 뒤 확인해 보세요.";
  ui.feedback.className = "feedback";
  ui.history.replaceChildren();
  ui.next.hidden = true;
  resetFields();
  ui.inputs.nationality.focus();
}

ui.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (roundFinished) return;

  const activeFields = Object.keys(ui.inputs).filter(
    (field) => !correctFields.has(field)
  );
  const hasEmptyInput = activeFields.some(
    (field) => !ui.inputs[field].value.trim()
  );

  if (hasEmptyInput) {
    ui.feedback.textContent = "아직 맞히지 않은 모든 항목을 입력해 주세요.";
    ui.feedback.className = "feedback wrong";
    return;
  }

  attempts += 1;
  let newlyCorrect = 0;
  const results = {};

  Object.keys(ui.inputs).forEach((field) => {
    const isCorrect =
      correctFields.has(field) ||
      isFieldCorrect(field, ui.inputs[field].value.trim());
    results[field] = isCorrect;
    setFieldState(field, isCorrect);
    if (isCorrect) {
      if (!correctFields.has(field)) newlyCorrect += 1;
      correctFields.add(field);
    }
  });

  addGuessRow(results);
  score += newlyCorrect * 25;
  ui.attempts.textContent = `남은 기회 ${maxAttempts - attempts}회`;

  if (correctFields.size === Object.keys(ui.inputs).length) {
    roundFinished = true;
    streak += 1;
    best = Math.max(best, streak);
    ui.feedback.textContent = `퍼펙트! ${currentPlayer.ko}의 정보를 모두 맞혔습니다.`;
    ui.feedback.className = "feedback correct";
    ui.next.textContent = deck.length === 0 ? "새 게임 시작 →" : "다음 선수 →";
    ui.next.hidden = false;
  } else if (attempts >= maxAttempts) {
    roundFinished = true;
    streak = 0;
    Object.values(ui.inputs).forEach((input) => {
      input.disabled = true;
    });
    ui.feedback.textContent =
      `아쉽네요! 정답은 ${currentPlayer.nationality} · ${currentPlayer.height} cm · ` +
      `${currentPlayer.team} · ${currentPlayer.hand}입니다.`;
    ui.feedback.className = "feedback wrong";
    ui.next.textContent = deck.length === 0 ? "새 게임 시작 →" : "다음 선수 →";
    ui.next.hidden = false;
  } else {
    const remaining = Object.keys(ui.inputs).length - correctFields.size;
    ui.feedback.textContent = `초록색은 정답입니다. 빨간색 ${remaining}개 항목을 다시 입력하세요.`;
    ui.feedback.className = "feedback wrong";
    const firstWrong = activeFields.find((field) => !correctFields.has(field));
    ui.inputs[firstWrong]?.focus();
    ui.inputs[firstWrong]?.select();
  }

  updateStats();
});

ui.next.addEventListener("click", loadRound);

deck = shuffle(players);
loadRound();
updateStats();
