const quizForm = document.getElementById("quiz");

let choiceArr = [];

function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function getRanQuestion() {
  window.filteredQuiz = quiz.filter((item) => !item.checked);
  if (window.filteredQuiz.length === 0) {
    console.log('All questions answered');
    return -1; 
  }

  const index = Math.floor(Math.random() * window.filteredQuiz.length);
  return index;
}

function checked(index) {
  const originalIndex = quiz.findIndex(item => item.question === window.filteredQuiz[index].question);
  quiz[originalIndex].checked = true;
}

function renderQuestion() {
  const ranIndex = getRanQuestion();

  if (ranIndex === -1) return;

  const questionElement = document.getElementById("question");
  questionElement.innerHTML = window.filteredQuiz[ranIndex].question;
  renderOptions(ranIndex);
  checked(ranIndex);
}

function renderOptions(index) {
  const options = document.querySelectorAll('.option');

  if (!window.filteredQuiz[index]) {
    console.error("No valid question at this index.");
    return;
  }

  for (let i = 0; i < options.length; i++) {
    const optionId = window.filteredQuiz[index].id;
    const decodedOption = decodeHTMLEntities(window.filteredQuiz[index].options[i]);
    options[i].innerHTML = `<p>${decodedOption}</p>`;
    const newOption = options[i].cloneNode(true);
    options[i].parentNode.replaceChild(newOption, options[i]);
    newOption.addEventListener('click', () => userChoice(decodedOption, optionId));
  }
}

function userChoice(choice, id) {
  console.log(choice);
  console.log(id);
  choiceArr.push({choice, id});
  console.log(choiceArr);
  if (choiceArr.length === quiz.length) {
    console.log('All questions answered, no choice remaining.');
    sendResult(choiceArr);
  } else {
    renderQuestion();
  }
}

function sendResult(choiceArr) {
  const quizReultInput = document.querySelector('[data-value="quiz-result"]');
  quizReultInput.value = JSON.stringify(choiceArr);
  quizForm.submit();
}

renderQuestion();