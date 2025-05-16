const questions = [
  {
    id: 1,
    class: "11",
    subject: "Math",
    topic: "Set",
    difficulty: "medium",
    type: "long",
    content: "Evaluate:  \\( \\int x^{2} \\, dx \\)",
    solution: "The integral is \\( \\frac{x^3}{3} + C \\)."
  },
  {
    id: 2,
    class: "11",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "easy",
    type: "short",
    content: "State Newton's Second Law.",
    solution: "Force equals mass times acceleration: \\( F = ma \\)."
  },
  {
    id: 3,
    class: "12",
    subject: "Chemistry",
    topic: "Organic",
    difficulty: "hard",
    type: "mcq",
    content: "Which is the functional group of alcohols?",
    solution: "The functional group of alcohols is \\(-OH\\)."
  },
  {
    id: 4,
    class: "12",
    subject: "Biology",
    topic: "Genetics",
    difficulty: "medium",
    type: "short",
    content: "Explain Mendel's law of segregation.",
    solution: "Mendel's law states that allele pairs separate during gamete formation."
  },
  { id: 1, class: "11", subject: "Math", topic: "Set", difficulty: "medium", type: "long", content: "Evaluate:  \\( \\int x^{2} \\, dx \\)" },
  { id: 2, class: "11", subject: "Physics", topic: "Mechanics", difficulty: "easy", type: "short", content: "State Newton's Second Law." },
  { id: 3, class: "12", subject: "Chemistry", topic: "Organic", difficulty: "hard", type: "mcq", content: "Which is the functional group of alcohols?" },
  { id: 4, class: "12", subject: "Biology", topic: "Genetics", difficulty: "medium", type: "short", content: "Explain Mendel's law of segregation." },
  { id: 5, class: "11", subject: "Math", topic: "Trigonometry", difficulty: "easy", type: "short", content: "\\(\\sin(\\theta) = ?\\)" },
  { id: 6, class: "12", subject: "Physics", topic: "Optics", difficulty: "medium", type: "long", content: "Derive lens formula." },
  { id: 7, class: "12", subject: "Biology", topic: "digestive", difficulty: "medium", type: "long", content: "what is food" },
  {
    id: 101,
    class: "12",
    subject: "Math",
    topic: "Integrals",
    difficulty: "medium",
    type: "mcq",
    content: "Evaluate:  \\( \\int \\sin x \\, dx \\)<br>" +
             "A. \\( -\\cos x + C \\)<br>" +
             "B. \\( \\cos x + C \\)<br>" +
             "C. \\( \\sin x + C \\)<br>" +
             "D. \\( -\\sin x + C \\)"
  },
  {
    id: 8,
    class: "12",
    subject: "Math",
    topic: "Relations and Functions",
    difficulty: "medium",
    type: "mcq",
    content: "Let  A = \{0, 1, 2, 3, 4, 5\}. Let \\( R \\) be a relation on \\( A \\) defined by\\( (x, y) \\in R \\) if and only if \\( \\max(x, y) \\in \\{3, 4\\} \\). <br>" +
             "Then among the statements:  <br>" +
             "\n(S1): The number of elements in \\( R \\) is 18\n  <br>" +
             " (S2): The relation \\( R \\) is symmetric but neither reflexive nor transitive  <br>" +
             " \nWhich of the following is correct? <br>" +
             " \n(a) Only S1 is correct <br>" +
             "\n(b) Only S2 is correct <br>" +
             "\n(c) Both S1 and S2 are correct <br>" +
             "\n(d) Neither S1 nor S2 is correct"
  },
];

const classFilter = document.getElementById("classFilter");
const subjectFilter = document.getElementById("subjectFilter");
const topicFilter = document.getElementById("topicFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const typeFilter = document.getElementById("typeFilter");
const questionList = document.getElementById("questionList");
const previewBtn = document.getElementById("previewBtn");
const previewModal = document.getElementById("previewModal");
const closeModal = previewModal.querySelector(".close");
const paperPreview = document.getElementById("paperPreview");
const printBtn = document.getElementById("printBtn");
const addToPaperBtn = document.getElementById("addToPaperBtn");
const paperQuestionList = document.getElementById("paperQuestionList");

const manualQuestionForm = document.getElementById("manualQuestionForm");
const questionContentInput = document.getElementById("questionContent");
const manualClass = document.getElementById("manualClass");
const manualSubject = document.getElementById("manualSubject");
const manualTopic = document.getElementById("manualTopic");
const manualDifficulty = document.getElementById("manualDifficulty");
const manualType = document.getElementById("manualType");
const manualSolution = document.getElementById("manualSolution");
const questionPreview = document.getElementById("questionPreview");

const selectedPaperQuestions = [];
let nextManualQuestionId = 10000;

function getTopicsForSubject(subject) {
  if (subject === "all") return [];
  const topics = questions.filter(q => q.subject === subject).map(q => q.topic);
  return [...new Set(topics)].sort();
}

function updateTopicFilter() {
  const subject = subjectFilter.value;
  const topics = getTopicsForSubject(subject);
  topicFilter.innerHTML = '<option value="all">All Topics</option>';
  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicFilter.appendChild(option);
  });
}

function filterQuestions() {
  const selectedClass = classFilter.value;
  const subject = subjectFilter.value;
  const topic = topicFilter.value;
  const difficulty = difficultyFilter.value;
  const type = typeFilter.value;
  const searchQuery = document.getElementById("questionSearch").value.toLowerCase();

  return questions.filter(q =>
    (selectedClass === "all" || q.class === selectedClass) &&
    (subject === "all" || q.subject === subject) &&
    (topic === "all" || q.topic === topic) &&
    (difficulty === "all" || q.difficulty === difficulty) &&
    (type === "all" || q.type === type) &&
    (q.content.toLowerCase().includes(searchQuery) || q.solution?.toLowerCase().includes(searchQuery))
  );
}

function displayQuestions() {
  const filtered = filterQuestions();
  questionList.innerHTML = "";
  if (filtered.length === 0) {
    questionList.textContent = "No questions found for selected filters.";
    return;
  }
  filtered.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <label>
        <input type="checkbox" value="${q.id}" />
        <span>${q.content}</span>
      </label>
    `;
    questionList.appendChild(div);
  });
  MathJax.typesetPromise();
}

function getSelectedQuestions() {
  return questions.filter(q =>
    Array.from(questionList.querySelectorAll("input[type=checkbox]:checked"))
      .map(cb => parseInt(cb.value))
      .includes(q.id)
  );
}

function renderPaperQuestions() {
  paperQuestionList.innerHTML = "";
  if (selectedPaperQuestions.length === 0) {
    paperQuestionList.textContent = "No questions added yet.";
    return;
  }
  selectedPaperQuestions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>${i + 1}. ${q.content}</span>
        <button class="remove-btn" data-id="${q.id}" aria-label="Remove question ${i + 1} from paper">✕</button>
      </div>
      <div class="solution" style="display:none; margin-left:20px; color:#444; margin-top:5px;">
        <em>${q.solution || "Solution not available."}</em>
      </div>
      <button class="toggle-solution btn-secondary" style="margin-left:20px; margin-top:5px;">Show Solution</button>
    `;
    paperQuestionList.appendChild(div);
  });
  MathJax.typesetPromise();
}

paperQuestionList.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove-btn");
  if (removeBtn && paperQuestionList.contains(removeBtn)) {
    e.stopPropagation();
    const idToRemove = parseInt(removeBtn.getAttribute("data-id"));
    const index = selectedPaperQuestions.findIndex(q => q.id === idToRemove);
    if (index > -1) {
      selectedPaperQuestions.splice(index, 1);
      renderPaperQuestions();
    }
    return;
  }
  const toggleBtn = e.target.closest(".toggle-solution");
  if (toggleBtn && paperQuestionList.contains(toggleBtn)) {
    e.stopPropagation();
    const solutionDiv = toggleBtn.previousElementSibling;
    if (solutionDiv) {
      const isVisible = solutionDiv.style.display === "block";
      solutionDiv.style.display = isVisible ? "none" : "block";
      toggleBtn.textContent = isVisible ? "Show Solution" : "Hide Solution";
      MathJax.typesetPromise();
    }
  }
});

addToPaperBtn.addEventListener("click", () => {
  const currentlySelected = getSelectedQuestions();
  currentlySelected.forEach(q => {
    if (!selectedPaperQuestions.some(pq => pq.id === q.id)) {
      selectedPaperQuestions.push(q);
    }
  });
  renderPaperQuestions();
  questionList.querySelectorAll("input[type=checkbox]:checked").forEach(cb => cb.checked = false);
});

previewBtn.addEventListener("click", () => {
  paperPreview.innerHTML = "";
  if (selectedPaperQuestions.length === 0) {
    paperPreview.textContent = "No questions selected.";
  } else {
    selectedPaperQuestions.forEach((q, i) => {
      const p = document.createElement("p");
      p.innerHTML = `${i + 1}. ${q.content}`;
      paperPreview.appendChild(p);
    });
  }
  MathJax.typesetPromise().then(() => {
    previewModal.style.display = "block";
    paperPreview.focus();
  });
});

closeModal.addEventListener("click", () => {
  previewModal.style.display = "none";
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && previewModal.style.display === "block") {
    previewModal.style.display = "none";
  }
});

window.addEventListener("click", e => {
  if (e.target === previewModal) previewModal.style.display = "none";
});

printBtn.addEventListener("click", () => {
  const selected = selectedPaperQuestions;
  const date = new Date().toLocaleDateString();
  let content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="margin: 0;">Question Paper</h1>
      <p>Class: ____________ &nbsp;&nbsp; Subject: ____________</p>
      <p>Date: ${date}</p>
    </div>
    <div style="font-family: 'Georgia', serif; font-size: 16px;">`;
  selected.forEach((q, i) => {
    content += `<p>${i + 1}. ${q.content}</p>`;
  });
  content += "</div>";
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Question Paper</title>
        <style>
          body { font-family: 'Georgia', serif; padding: 40px; line-height: 1.6; }
          @media print { button { display: none; } }
        </style>
        <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      </head>
      <body>${content}</body>
    </html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 1000);
});

classFilter.addEventListener("change", () => {
  updateTopicFilter();
  displayQuestions();
});
subjectFilter.addEventListener("change", () => {
  updateTopicFilter();
  displayQuestions();
});
topicFilter.addEventListener("change", displayQuestions);
difficultyFilter.addEventListener("change", displayQuestions);
typeFilter.addEventListener("change", displayQuestions);
document.getElementById("questionSearch").addEventListener("input", displayQuestions);


manualQuestionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuestion = {
    id: nextManualQuestionId++,
    class: manualClass.value,
    subject: manualSubject.value.trim(),
    topic: manualTopic.value.trim(),
    difficulty: manualDifficulty.value,
    type: manualType.value,
    content: questionContentInput.value.trim(),
    solution: manualSolution.value.trim() || null,
  };
  selectedPaperQuestions.push(newQuestion);
  renderPaperQuestions();
  manualQuestionForm.reset();
  document.getElementById("yourPaper").scrollIntoView({ behavior: "smooth" });
  MathJax.typesetPromise();
});

questionContentInput.addEventListener("input", () => {
  const content = questionContentInput.value.trim();
  if (!content) {
    questionPreview.innerHTML = "";
    return;
  }
  questionPreview.textContent = content;
  MathJax.typesetPromise([questionPreview]);
});
const solutionPreview = document.getElementById("solutionPreview");

manualSolution.addEventListener("input", () => {
  const content = manualSolution.value.trim();
  if (!content) {
    solutionPreview.innerHTML = "";
    return;
  }
  solutionPreview.textContent = content;
  MathJax.typesetPromise([solutionPreview]);
});

updateTopicFilter();
displayQuestions();
renderPaperQuestions();
manualSolution