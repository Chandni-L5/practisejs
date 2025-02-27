const quizData = [
    {
        question: "Do you enjoy social gatherings?",
        answers: { "Yes": "extrovert", "No": "introvert" }
    },
    {
        question: "Do you prefer working alone or in a team?",
        answers: { "Alone": "introvert", "Team": "extrovert" }
    },
    {
        question: "Do you like trying new things?",
        answers: { "Yes": "adventurous", "No": "cautious" }
    }
];

let scores = { extrovert: 0, introvert: 0, adventurous: 0, cautious: 0 };
let currentQuestion = 0;

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Clear previous content

    if (currentQuestion < quizData.length) {
        const questionObj = quizData[currentQuestion];
        const questionElem = document.createElement("div");
        questionElem.classList.add("question");
        questionElem.innerHTML = `<p>${questionObj.question}</p>`;

        Object.keys(questionObj.answers).forEach(answer => {
            const btn = document.createElement("button");
            btn.innerText = answer;
            btn.onclick = () => {
                scores[questionObj.answers[answer]]++;
                currentQuestion++;
                loadQuiz(); // Load next question
            };
            btn.style.display = "block";
            btn.style.margin = "10px auto";
            questionElem.appendChild(btn);
        });

        quizContainer.appendChild(questionElem);
    } else {
        calculateResult(); // Show results after last question
    }
}

function calculateResult() {
    let highestScore = 0;
    let personalityType = "";

    for (let type in scores) {
        if (scores[type] > highestScore) {
            highestScore = scores[type];
            personalityType = type;
        }
    }

    document.getElementById("quiz").innerHTML = `<p class="result">Your personality type is: <strong>${personalityType}</strong></p>`;
}

window.onload = loadQuiz;
