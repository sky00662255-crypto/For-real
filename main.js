const resultsEl = document.getElementById("results");
const countSelect = document.getElementById("count");
const generateBtn = document.getElementById("generateBtn");

function generateLottoSet() {
  const numbers = Array.from({ length: 45 }, (_, index) => index + 1);
  const shuffled = numbers.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 6).sort((a, b) => a - b);
}

function renderResults() {
  const count = Number(countSelect.value);
  resultsEl.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `${count}세트 추천 결과`;
  resultsEl.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "set-grid";

  Array.from({ length: count }, (_, index) => {
    const set = generateLottoSet();
    const card = document.createElement("article");
    card.className = "lotto-set";

    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}세트`;

    const numbers = document.createElement("div");
    numbers.className = "numbers";

    set.forEach((number) => {
      const ball = document.createElement("span");
      ball.className = "ball";
      ball.textContent = number;
      numbers.appendChild(ball);
    });

    card.appendChild(heading);
    card.appendChild(numbers);
    grid.appendChild(card);
  });

  resultsEl.appendChild(grid);
}

generateBtn.addEventListener("click", renderResults);
countSelect.addEventListener("change", renderResults);

renderResults();
