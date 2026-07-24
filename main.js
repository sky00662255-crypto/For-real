const players = [
  { ko: "루카 돈치치", en: "Luka Dončić", nationality: "슬로베니아", height: "203", team: "LA 레이커스", hand: "오른손", number: "77", position: "가드·포워드", region: "유럽", conference: "서부" },
  { ko: "니콜라 요키치", en: "Nikola Jokić", nationality: "세르비아", height: "211", team: "덴버 너기츠", hand: "오른손", number: "15", position: "센터", region: "유럽", conference: "서부" },
  { ko: "샤이 길저스알렉산더", en: "Shai Gilgeous-Alexander", nationality: "캐나다", height: "198", team: "오클라호마시티 썬더", hand: "오른손", number: "2", position: "가드", region: "북아메리카", conference: "서부" },
  { ko: "빅터 웸반야마", en: "Victor Wembanyama", nationality: "프랑스", height: "224", team: "샌안토니오 스퍼스", hand: "오른손", number: "1", position: "포워드·센터", region: "유럽", conference: "서부" },
  { ko: "야니스 아데토쿤보", en: "Giannis Antetokounmpo", nationality: "그리스", height: "211", team: "마이애미 히트", hand: "오른손", number: "7", position: "포워드", region: "유럽", conference: "동부" },
  { ko: "제이슨 테이텀", en: "Jayson Tatum", nationality: "미국", height: "203", team: "보스턴 셀틱스", hand: "오른손", number: "0", position: "포워드·가드", region: "북아메리카", conference: "동부" },
  { ko: "앤서니 에드워즈", en: "Anthony Edwards", nationality: "미국", height: "193", team: "미네소타 팀버울브스", hand: "오른손", number: "5", position: "가드", region: "북아메리카", conference: "서부" },
  { ko: "케이드 커닝햄", en: "Cade Cunningham", nationality: "미국", height: "198", team: "디트로이트 피스톤스", hand: "오른손", number: "2", position: "가드", region: "북아메리카", conference: "동부" },
  { ko: "알페렌 센군", en: "Alperen Şengün", nationality: "튀르키예", height: "211", team: "휴스턴 로키츠", hand: "오른손", number: "28", position: "센터", region: "유럽", conference: "서부" },
  { ko: "파올로 반케로", en: "Paolo Banchero", nationality: "미국", height: "208", team: "올랜도 매직", hand: "오른손", number: "5", position: "포워드", region: "북아메리카", conference: "동부" },
  { ko: "데빈 부커", en: "Devin Booker", nationality: "미국", height: "196", team: "피닉스 선스", hand: "오른손", number: "1", position: "가드", region: "북아메리카", conference: "서부" },
  { ko: "제일런 브런슨", en: "Jalen Brunson", nationality: "미국", height: "188", team: "뉴욕 닉스", hand: "왼손", number: "11", position: "가드", region: "북아메리카", conference: "동부" },
  { ko: "디애런 팍스", en: "De'Aaron Fox", nationality: "미국", height: "191", team: "샌안토니오 스퍼스", hand: "왼손", number: "4", position: "가드", region: "북아메리카", conference: "서부" },
  { ko: "스테픈 커리", en: "Stephen Curry", nationality: "미국", height: "188", team: "골든스테이트 워리어스", hand: "오른손", number: "30", position: "가드", region: "북아메리카", conference: "서부" }
];

const fieldNames = {
  nationality: "국적",
  height: "키",
  team: "대표 소속팀",
  hand: "주로 쓰는 손",
  number: "등번호"
};
const maxAttempts = 6;
const acceptedAliases = {
  nationality: {
    미국: ["usa", "unitedstates", "미합중국"],
    캐나다: ["canada"],
    프랑스: ["france"],
    그리스: ["greece"],
    세르비아: ["serbia"],
    슬로베니아: ["slovenia"],
    튀르키예: ["터키", "turkey", "turkiye"]
  },
  team: {
    "LA 레이커스": ["레이커스", "lal", "losangeleslakers"],
    "덴버 너기츠": ["너기츠", "denvernuggets"],
    "오클라호마시티 썬더": ["오클라호마시티", "오클라호마 썬더", "썬더", "okc"],
    "샌안토니오 스퍼스": ["샌안토니오", "스퍼스", "sanantoniospurs"],
    "마이애미 히트": ["마이애미", "히트", "miamiheat"],
    "보스턴 셀틱스": ["보스턴", "셀틱스", "bostonceltics"],
    "미네소타 팀버울브스": ["미네소타", "팀버울브스", "minnesotatimberwolves"],
    "디트로이트 피스톤스": ["디트로이트", "피스톤스", "detroitpistons"],
    "휴스턴 로키츠": ["휴스턴", "로키츠", "houstonrockets"],
    "올랜도 매직": ["올랜도", "매직", "orlandomagic"],
    "피닉스 선스": ["피닉스", "선스", "phoenixsuns"],
    "뉴욕 닉스": ["뉴욕", "닉스", "newyorkknicks"],
    "골든스테이트 워리어스": ["골든스테이트", "워리어스", "goldenstatewarriors"]
  },
  hand: {
    오른손: ["오른", "right", "righthand"],
    왼손: ["왼", "left", "lefthand"]
  }
};

const ui = {
  playerName: document.querySelector("#playerName"),
  englishName: document.querySelector("#englishName"),
  round: document.querySelector("#roundCounter"),
  form: document.querySelector("#answerForm"),
  feedback: document.querySelector("#feedback"),
  attempts: document.querySelector("#attemptCount"),
  history: document.querySelector("#guessHistory"),
  hintButton: document.querySelector("#hintButton"),
  hintCount: document.querySelector("#hintCount"),
  hintList: document.querySelector("#hintList"),
  score: document.querySelector("#score"),
  streak: document.querySelector("#streak"),
  best: document.querySelector("#best"),
  next: document.querySelector("#nextButton"),
  inputs: {
    nationality: document.querySelector("#nationalityInput"),
    height: document.querySelector("#heightInput"),
    team: document.querySelector("#teamInput"),
    hand: document.querySelector("#handInput"),
    number: document.querySelector("#numberInput")
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
let revealedHints = 0;

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

function populateChoices() {
  Object.entries(ui.inputs).forEach(([field, input]) => {
    if (field === "height") {
      input.max = String(Math.max(...players.map((player) => Number(player.height))));
      return;
    }

    const values = [...new Set(players.map((player) => player[field]))].sort(
      (first, second) =>
        field === "number"
          ? Number(first) - Number(second)
          : first.localeCompare(second, "ko")
    );

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = field === "number" ? `#${value}` : value;
      input.appendChild(option);
    });
  });
}

function isFieldCorrect(field, value) {
  if (field === "height") {
    return value.replace(/\D/g, "") === currentPlayer.height;
  }

  const guess = normalize(value);
  const answer = currentPlayer[field];
  const aliases = acceptedAliases[field]?.[answer] ?? [];
  return guess === normalize(answer) || aliases.some((alias) => guess === normalize(alias));
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

function getHints() {
  const height = Number(currentPlayer.height);
  const rangeStart = Math.floor(height / 10) * 10;
  return [
    `포지션은 ${currentPlayer.position}입니다.`,
    `국적은 ${currentPlayer.region} 지역입니다.`,
    `키는 ${rangeStart}–${rangeStart + 9}cm 사이입니다.`,
    `소속팀은 ${currentPlayer.conference} 컨퍼런스입니다.`,
    `등번호는 ${Math.floor(Number(currentPlayer.number) / 10) * 10}번대입니다.`
  ];
}

function revealHint() {
  const hints = getHints();
  if (revealedHints >= hints.length || roundFinished) return;

  const item = document.createElement("li");
  item.textContent = hints[revealedHints];
  ui.hintList.appendChild(item);
  revealedHints += 1;
  ui.hintCount.textContent = `${revealedHints}/${hints.length}`;

  if (revealedHints === hints.length) {
    ui.hintButton.disabled = true;
    ui.hintButton.textContent = "힌트를 모두 사용했어요";
  }
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
  revealedHints = 0;

  ui.playerName.textContent = currentPlayer.ko;
  ui.englishName.textContent = currentPlayer.en;
  ui.round.textContent = `ROUND ${String(round).padStart(2, "0")} / ${players.length}`;
  ui.attempts.textContent = `남은 기회 ${maxAttempts}회`;
  ui.feedback.textContent = "키를 입력하고 나머지 네 가지 정보를 선택해 보세요.";
  ui.feedback.className = "feedback";
  ui.history.replaceChildren();
  ui.hintList.replaceChildren();
  ui.hintCount.textContent = "0/5";
  ui.hintButton.disabled = false;
  ui.hintButton.textContent = "힌트 하나 보기";
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
    ui.feedback.textContent = "키를 입력하고 아직 맞히지 않은 항목을 모두 선택해 주세요.";
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
    ui.hintButton.disabled = true;
    streak += 1;
    best = Math.max(best, streak);
    ui.feedback.textContent = `퍼펙트! ${currentPlayer.ko}의 정보를 모두 맞혔습니다.`;
    ui.feedback.className = "feedback correct";
    ui.next.textContent = deck.length === 0 ? "새 게임 시작 →" : "다음 선수 →";
    ui.next.hidden = false;
  } else if (attempts >= maxAttempts) {
    roundFinished = true;
    ui.hintButton.disabled = true;
    streak = 0;
    Object.values(ui.inputs).forEach((input) => {
      input.disabled = true;
    });
    ui.feedback.textContent =
      `아쉽네요! 정답은 ${currentPlayer.nationality} · ${currentPlayer.height} cm · ` +
      `${currentPlayer.team} · ${currentPlayer.hand} · #${currentPlayer.number}입니다.`;
    ui.feedback.className = "feedback wrong";
    ui.next.textContent = deck.length === 0 ? "새 게임 시작 →" : "다음 선수 →";
    ui.next.hidden = false;
  } else {
    const remaining = Object.keys(ui.inputs).length - correctFields.size;
    ui.feedback.textContent = `초록색은 정답입니다. 빨간색 ${remaining}개 항목을 다시 선택하세요.`;
    ui.feedback.className = "feedback wrong";
    const firstWrong = activeFields.find((field) => !correctFields.has(field));
    ui.inputs[firstWrong]?.focus();
  }

  updateStats();
});

ui.next.addEventListener("click", loadRound);
ui.hintButton.addEventListener("click", revealHint);

populateChoices();
deck = shuffle(players);
loadRound();
updateStats();
