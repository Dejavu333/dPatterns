//GLOBAL VARIABLES
G.alreadyAskedQuestionIndecies = [];
G.givenAnswers = [];
G.currentQuestion = null;
G.correctAnswerCount = 0;

G.score = document.querySelector("#score");
G.resultBoard = document.querySelector("#result-board");
G.hintBtn = document.querySelector("#hint-btn");
G.code = document.querySelector("code");
G.patternContainer = document.querySelector("#pattern-container");
G.solDescriptionContainer = document.querySelector("#sol-description-container")
G.answerInput = document.querySelector("#answer-input");
G.submitBtn = document.querySelector("#submit-btn");


class Question {
    content = "";
    answer = "";
    hintLevel = 0;
    hints = [];
    constructor(content, answer, ...hints) {
        this.content = content;
        this.answer = answer;
        this.hints = hints;
    }

    show() {
        G.code.innerHTML = this.content;
        EaseIn(G.code);
    }

    removeHints() {
        this.hints.forEach((hint) => {
            hint.dissmiss();
        });
    }

    revealHint() {
        if (this.hintLevel >= this.hints.length) { console.log("No more hints"); return; }
        this.hints[this.hintLevel].reveal(this.answer);
        this.hintLevel++;
        scrollToBottom(500);
    }
}

class level1Hint {
    reveal(p_answer) {
        this.addPatternCardsToDOM(G.patterns);
        G.hintBtn.innerText = "Hint: 2";
    }

    dissmiss() {
        if (document.querySelectorAll(".pattern-card")) {
            document.querySelectorAll(".pattern-card").forEach((card) => {
                card.remove();
            });
        }
    }

    addPatternCardsToDOM(p_data, p_answer) {
        const d = G.patternContainer
        d.style.opacity = 0;
        p_data.forEach((pattern) => {
            const cardHTML = `
            <div class="pattern-card ${pattern.category.toLowerCase()}">
            <div class="inner-pattern-card">
                <span class="card-title">${pattern.name}</span>
            </div>
        </div>
            `;
            if (pattern.name === p_answer) {
                card.classList.add("answer");
            }
            d.innerHTML += cardHTML;
        });//forEach

       EaseIn(d);

        document.querySelectorAll(".pattern-card").forEach((card) => {
            card.addEventListener("click", (e) => {
                G.answerInput.value = card.querySelector(".card-title").innerText;
            });
        });
    }
}

class level2Hint {
    reveal(p_answer) {
        this.dismissPatternCardWithInproperCategory(G.patterns, p_answer);
        G.hintBtn.innerText = "Hint: 1";
    }

    dismissPatternCardWithInproperCategory(p_data, p_answer) {
        let solCategory = "";
        p_data.forEach((pattern) => {
            if (pattern.name === p_answer) {
                solCategory = pattern.category;
            }
        });
        let patternCards = document.querySelectorAll(`.creational, .structural, .behavioral`);
      //remove all cards that are not the correct category
        patternCards.forEach((card) => {
            if (!card.classList.contains(solCategory.toLowerCase())) {
                card.style.opacity = "0.3";
                card.style.pointerEvents = "none";
            }
        });
    }

    dissmiss() {
        if (document.querySelectorAll(".pattern-card")) {
            document.querySelectorAll(".pattern-card").forEach((card) => {
                card.remove();
            });
        }
    }
}

class level3Hint {
    reveal(p_answer) {
        this.addAnswerPatternDescriptionToDOM(G.patterns, p_answer);
        G.hintBtn.style.opacity = "0.3";
        G.hintBtn.innerText = "Hint: 0";
        G.hintBtn.style.pointerEvents = "none";
    }

    addAnswerPatternDescriptionToDOM(p_data, p_answer) {
        let solDescription = "";
        p_data.forEach((pattern) => {
            if (pattern.name === p_answer) {
                solDescription = pattern.description;
            }
        });
        let description = document.createElement("div");
        description.id = "pattern-description";
        description.innerHTML = `
        <div class="pattern-description">
            <span class="description-content">${solDescription}</span>
        </div>
        `;
        const d = G.solDescriptionContainer;
        d.style.opacity = 0;
        d.appendChild(description);
        EaseIn(d);
    }

    dissmiss() {
        if (document.querySelector("#pattern-description")) {
            document.querySelector("#pattern-description").remove();
        }
    }
}


//======================================================
//main

askQestion();

G.hintBtn.addEventListener("click", () => {
    G.currentQuestion.revealHint();
});

document.querySelector("#submit-btn").addEventListener("click", () => {
    // G.submitBtn.disabled = true;
    storeAnswer(G.answerInput.value);
    evaluateResult();
    if (G.alreadyAskedQuestionIndecies.length === G.questionsJSONRepres.length) {
        console.log("No more questions");
        showResultBoard();
        return;
    }
    setTimeout(() => {
        askQestion();
    }, 500);
});


//======================================================
//functions
function showResultBoard() {
    G.resultBoard.style.opacity = 0;
    G.resultBoard.style.position = "absolute";
    G.resultBoard.style.display = "block";
    // places it in the middle of the current viewport not the whole page
    G.resultBoard.style.top = "50%";
    G.resultBoard.style.left = "50%";
    G.resultBoard.style.transform = "translate(-50%, -50%)";

    const result = Math.round((G.correctAnswerCount / G.givenAnswers.length) * 100);
    G.resultBoard.innerHTML = `<div class="heartbeat">You reached ${result}%</div><br><button id="restart-btn">Restart</button>`;
    const elementsInBody = [...document.body.children];
    elementsInBody.forEach((child) => {
            child.style.opacity = "0.3";
            if (child.id !== "result-board"){
            child.style.pointerEvents = "none";}
    
    });
    EaseIn(G.resultBoard);
    document.querySelector("#restart-btn").addEventListener("click", () => {
        location.reload();
    });
}

function askQestion() {
    scrollToTop(500);
    if (G.currentQuestion) G.currentQuestion.removeHints();
    let questionJSONRepres = randomQuestionJSONRepres(G.questionsJSONRepres);
    G.currentQuestion = new Question(questionJSONRepres.content, questionJSONRepres.answer, new level1Hint(), new level2Hint(), new level3Hint());
    G.currentQuestion.show();
    Prism.highlightAll();

    G.hintBtn.style.opacity = "1";
    G.hintBtn.style.pointerEvents = "auto";
    G.hintBtn.innerText = "Hint: 3";
    G.answerInput.value = "";
    // G.submitBtn.disabled = false;
}

function storeAnswer(p_answer) {
    G.givenAnswers.push(p_answer);
}

function evaluateResult() {
    const lastAnswer = G.givenAnswers[G.givenAnswers.length - 1];
    const lastQuestionIndex = G.alreadyAskedQuestionIndecies[G.alreadyAskedQuestionIndecies.length - 1];
    const isCorrect = lastAnswer.toLowerCase() === G.questionsJSONRepres[lastQuestionIndex].answer.toLowerCase();
    const lastColor = G.score.style.color;
    if (isCorrect) {
        G.correctAnswerCount++;
        G.submitBtn.color = "green"; G.score.style.color = "green";
        setTimeout(() => { G.score.style.color = lastColor }, 300);
    }
    else if(!isCorrect) {
        G.submitBtn.color = "red";G.score.style.color = "red";
        setTimeout(() => { G.score.style.color = lastColor } , 300);
    }
    
    G.score.innerText = `Score: ${G.correctAnswerCount} / ${G.alreadyAskedQuestionIndecies.length}`
    console.log(`You got ${G.correctAnswerCount} out of ${G.alreadyAskedQuestionIndecies.length} correct.`);
}

function randomQuestionJSONRepres(p_data) {
    let randomIndex = Math.floor(Math.random() * p_data.length);
    while (G.alreadyAskedQuestionIndecies.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * p_data.length);
    }
    G.alreadyAskedQuestionIndecies.push(randomIndex);
    return p_data[randomIndex];
}

function EaseIn(p_div) {
    let div = p_div
    div.style.opacity = 0;

    // Define the animation
    (function ease() {
        div.style.opacity = parseFloat(div.style.opacity) + 0.01;
        if (div.style.opacity < 1) {
            requestAnimationFrame(ease);
        }
    })();
}

function scrollToTop(duration) {
    var start = window.pageYOffset;
    var startTime = performance.now();

    function scrollStep(timestamp) {
        var elapsed = timestamp - startTime;
        var scrollHeight = window.scrollY;
        var progress = Math.min(elapsed / duration, 1);
        var ease = easeInOutCubic(progress);
        window.scrollTo(0, scrollHeight * (1 - ease));
        if (elapsed < duration) {
            window.requestAnimationFrame(scrollStep);
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    window.requestAnimationFrame(scrollStep);
}

function scrollToBottom(duration) {
    var start = window.pageYOffset;
    var end = document.documentElement.scrollHeight - window.innerHeight;
    var startTime = performance.now();
    
    function scrollStep(timestamp) {
        var elapsed = timestamp - startTime;
        var scrollHeight = window.scrollY;
        var progress = Math.min(elapsed / duration, 1);
        var ease = easeInOutCubic(progress);
        window.scrollTo(0, start + (end - start) * ease);
        if (elapsed < duration) {
        window.requestAnimationFrame(scrollStep);
        }
    }
    
    function easeInOutCubic(t) {
        return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    window.requestAnimationFrame(scrollStep);
}