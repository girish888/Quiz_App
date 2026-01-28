let questions = [
    {
        q: "2 + 1 = ?",
        options: ["1", "2", "3", "4"],
        answer: "3"
    },
    {
        q: "5 * 2 = ?",
        options: ["10", "8", "6", "12"],
        answer: "10"
    }
];

let index = 0;
let score = 0;
let timer;
let timeSpent = [];
let startTime;
let answered = false;

function startQuiz() {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    resetTimer();
    startTime = new Date();

    let q = questions[index];
    document.getElementById("question").innerText = q.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;

        btn.onclick = () => selectAnswer(opt, btn);

        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(selected, btn) {
    if (answered) return; // prevent multiple clicks
    answered = true;

    clearInterval(timer);

    let endTime = new Date();
    timeSpent.push((endTime - startTime) / 1000);

    if (selected === questions[index].answer) {
        score++;
        btn.style.backgroundColor = "green";
    } else {
        btn.style.backgroundColor = "red";
    }

    // auto move to next question
    setTimeout(nextQuestion, 800);
}

function nextQuestion() {
    clearInterval(timer);
    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function resetTimer() {
    let timeLeft = 10;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);

            // record time even if unanswered
            timeSpent.push(10);

            answered = true;
            nextQuestion();
        }
    }, 1000);
}

function showResults() {
    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("timeSpent", JSON.stringify(timeSpent));

    window.location.href = "results.html";
}
