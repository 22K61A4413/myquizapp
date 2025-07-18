const quizQuestions = [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], correctAnswer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
    { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Shark", "Giraffe"], correctAnswer: "Blue Whale" },
    { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "NaCl"], correctAnswer: "H2O" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"], correctAnswer: "William Shakespeare" },
    { question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], correctAnswer: "2" },
    { question: "What is the currency of Japan?", options: ["Yuan", "Dollar", "Yen", "Won"], correctAnswer: "Yen" },
    { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: "Nile" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "250,000 km/s", "200,000 km/s"], correctAnswer: "300,000 km/s" },
    { question: "Who painted the Mona Lisa?", options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet"], correctAnswer: "Leonardo da Vinci" }
]; 

let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null); // To track user answers

function startQuiz() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = `Q${currentQuestionIndex + 1}. ${question.question}`;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = option;

        // Add "selected" class if the answer matches the saved answer
        if (userAnswers[currentQuestionIndex] === option) {
            button.classList.add('selected');
        }

        button.onclick = () => selectAnswer(option);
        listItem.appendChild(button);
        optionsContainer.appendChild(listItem);
    });

    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'inline-block' : 'none';
    updateQuestionPalette();
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;

    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = Array.from(buttons).find(button => button.textContent === answer);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
    updateQuestionPalette();
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function prevQuestion() {
    currentQuestionIndex--;
    loadQuestion();
}

function submitQuiz() {
    const score = userAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length;
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('end-page').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-marks').textContent = quizQuestions.length;
}
function updateQuestionPalette() {
    const paletteContainer = document.getElementById('question-palette');
    paletteContainer.innerHTML = '';

    quizQuestions.forEach((_, index) => {
      const paletteItem = document.createElement('div');
      paletteItem.classList.add('palette-item');

      if (userAnswers[index]) {
        paletteItem.classList.add('answered');
      } else if (reviewedQuestions[index]) {
        paletteItem.classList.add('reviewed');
      } else {
        paletteItem.classList.add('unanswered');
      }

      paletteItem.textContent = index + 1;
      paletteItem.onclick = () => {
        currentQuestionIndex = index;
        loadQuestion();
      };

      paletteContainer.appendChild(paletteItem);
    });
  }

  let reviewedQuestions = Array(quizQuestions.length).fill(false);  // Track reviewed questions

function updateQuestionPalette() {
    const paletteContainer = document.getElementById('question-palette');
    paletteContainer.innerHTML = ''; // Clear the existing palette

    quizQuestions.forEach((_, index) => {
        const paletteItem = document.createElement('div');
        paletteItem.classList.add('palette-item');

        // Highlight palette item based on the user's answer or review status
        if (userAnswers[index]) {
            paletteItem.classList.add('answered');  // Highlight as answered
        } else if (reviewedQuestions[index]) {
            paletteItem.classList.add('reviewed');  // Highlight as reviewed
        } else {
            paletteItem.classList.add('unanswered');  // Highlight as unanswered
        }

        // Display the question number in the palette
        paletteItem.textContent = index + 1;

        // When a palette item is clicked, navigate to that question
        paletteItem.onclick = () => {
            currentQuestionIndex = index;
            loadQuestion();
        };

        // Append the palette item to the container
        paletteContainer.appendChild(paletteItem);
    });
}

// Function to mark a question as reviewed (can be added with a separate button or logic)
function markAsReviewed() {
    reviewedQuestions[currentQuestionIndex] = true;
    updateQuestionPalette();
}
