let questions = [];

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    updateTopicFilter();
    displayQuestions();
    renderPaperQuestions();
  })
  .catch(error => {
    console.error('Error loading questions:', error);
    document.getElementById("questionList").textContent = "Failed to load questions.";
  });
