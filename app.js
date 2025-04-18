const quizData = {
  banking: [
    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Bangalore", "Kolkata"], correct: "Delhi" },
    { question: "What is CRR in banking?", options: ["Cash Reserve Ratio", "Credit Reserve Ratio", "Cash Risk Ratio", "None"], correct: "Cash Reserve Ratio" },
  ],
  reasoning: [
    { question: "Find the next number: 2, 4, 8, 16, ?", options: ["20", "24", "32", "40"], correct: "32" },
    { question: "If A=1, B=2, C=3, what is the sum of A, B, C?", options: ["3", "5", "6", "7"], correct: "6" },
  ],
  mathematics: [
    { question: "What is 15% of 200?", options: ["20", "25", "30", "35"], correct: "30" },
    { question: "Solve: 12 * 12", options: ["124", "144", "134", "154"], correct: "144" },
  ],
  "general-knowledge": [
    { question: "Who is the father of the Indian Constitution?", options: ["Mahatma Gandhi", "BR Ambedkar", "Nehru", "Patel"], correct: "BR Ambedkar" },
    { question: "What is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Peacock"], correct: "Tiger" },
  ],
};

let currentCategory = "";
let currentQuiz = 0;
let score = 0;
let timer;

const categorySelection = document.getElementById("category-selection");
const quizSection = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultsSection = document.getElementById("results");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time");

document.getElementById("start-btn").addEventListener("click", () => {
  currentCategory = document.getElementById("categories").value;
  categorySelection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  loadQuiz();
});

function loadQuiz() {
  const currentData = quizData[currentCategory][currentQuiz];
  questionEl.textContent = currentData.question;
  optionsEl.innerHTML = currentData.options
    .map((opt) => `<li onclick="selectOption(this)">${opt}</li>`)
    .join("");
  nextBtn.classList.add("hidden");
  startTimer();
}

function selectOption(selected) {
  const options = document.querySelectorAll("li");
  options.forEach((option) => option.classList.remove("selected"));
  selected.classList.add("selected");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector(".selected");
  const currentData = quizData[currentCategory][currentQuiz];
  if (selectedOption && selectedOption.textContent === currentData.correct) {
    score++;
  }
  currentQuiz++;
  clearInterval(timer);
  if (currentQuiz < quizData[currentCategory].length) {
    loadQuiz();
  } else {
    endQuiz();
  }
});

function startTimer() {
  let timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

function endQuiz() {
  quizSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");
  scoreEl.textContent = `${score}/${quizData[currentCategory].length}`;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});
