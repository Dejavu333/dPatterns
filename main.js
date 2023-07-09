//======================================================
// global variables
//======================================================
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
G.infoBoard = document.querySelector("#info-board");
G.usedHintCount = 0;


//======================================================
// classes
//======================================================
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
        G.usedHintCount++;
        scrollToBottom(500);
    }
}

class level1Hint {
    reveal(p_answer) {
        disableInputSuggestions();
        removeAllPatternCardsFromDOM(); // if there are any
        this.addPatternCardsToDOM(G.patterns, p_answer);
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
        G.patternContainer.style.opacity = 0;
        p_data.forEach((patternDataObj) => {
            addPatternCardToDOM(patternDataObj, p_answer);
        });

       EaseIn(G.patternContainer);
    }
}

function addPatternCardToDOM(p_patternDataObj,p_easeIn=false) {
    const cardHTML = `
    <div id="${p_patternDataObj.name}" class="pattern-card ${p_patternDataObj.category.toLowerCase()}">
    <div class="inner-pattern-card">
        <span class="card-title">${p_patternDataObj.name}</span>
    </div>
    </div>
    `;
    G.patternContainer.insertAdjacentHTML('beforeend', cardHTML);

    const card = document.getElementById(p_patternDataObj.name);
    card.addEventListener("click", (e) => {
        console.log(e.target);
        G.answerInput.value = card.querySelector(".card-title").innerText;
    });
    // if (p_patternDataObj.name === p_answer) {
    //     card.classList.add("answer");
    // }
    if(p_easeIn){
        EaseIn(card);
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
        // removes all cards which are not the correct category
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
// main
//======================================================
askQestion();
G.infoBoard.style.display = "block"; // infos only show up after the question is asked, prevents flickering

G.hintBtn.addEventListener("click", () => G.currentQuestion.revealHint());


//======================================================
// functions
//======================================================
function submitAnswer() {
    tabInd = 0;
    storeAnswer(G.answerInput.value);
    evaluateResult();
    if (G.alreadyAskedQuestionIndecies.length === G.questionsJSONRepres.length) {
        console.log("No more questions");
        showResultBoard();
        return;
    }
    setTimeout(() => {
        askQestion();
    }, 1000);

    this.removeEventListener("click", submitAnswer);
}

function showResultBoard() {
    G.resultBoard.style.opacity = 0;
    G.resultBoard.style.position = "absolute";
    G.resultBoard.style.display = "block";
    // places it in the middle of the current viewport not the whole page
    G.resultBoard.style.top = `${window.scrollY + window.innerHeight / 2}px`;
    G.resultBoard.style.left = `${window.innerWidth / 2}px`;

    const result = Math.round((G.correctAnswerCount / G.givenAnswers.length) * 100);
    G.resultBoard.innerHTML = `<div class="heartbeat">You reached ${result}%</div><br><button id="restart-btn">Restart</button>`;
    // puts an opaq white background behind the result board and everything else
    const opaqueBackground = document.createElement("div");
    opaqueBackground.id = "opaque-background";
    G.resultBoard.parentElement.insertBefore(opaqueBackground, G.resultBoard);
    document.body.style.overflow = "hidden";
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
    
    setTimeout(() => {
        G.submitBtn.addEventListener("click", submitAnswer); // because submit answer removes itself after it is clicked
        G.answerInput.addEventListener('input', handleInput);
        G.answerInput.addEventListener('keydown', handleKeyDown);
    }, 500);
}

function storeAnswer(p_answer) {
    G.givenAnswers.push(p_answer);
}

let lastScore = 0;
function evaluateResult() {
    const lastAnswer = G.givenAnswers[G.givenAnswers.length - 1];
    const lastQuestionIndex = G.alreadyAskedQuestionIndecies[G.alreadyAskedQuestionIndecies.length - 1];
    const isCorrect = lastAnswer.toLowerCase().trim() === G.questionsJSONRepres[lastQuestionIndex].answer.toLowerCase().trim();
    const lastColor = G.score.style.color;
    let currentScore = 0;
    if (isCorrect) {
        G.correctAnswerCount++;
        currentScore = Math.max(0,G.correctAnswerCount*4-G.usedHintCount); // if negative returns 0
        lastScore = currentScore;
        G.submitBtn.color = "green"; G.score.style.color = "green";
        setTimeout(() => { G.score.style.color = lastColor }, 300);
    }
    else if(!isCorrect) {
        currentScore = lastScore;
        G.submitBtn.color = "red";G.score.style.color = "red";
        setTimeout(() => { G.score.style.color = lastColor } , 300);
    }
    
    const totalScore = G.alreadyAskedQuestionIndecies.length*4
    G.score.innerText = `Score: ${currentScore} / ${totalScore}`
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

    // defines the animation
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

let currentSuggestions = {};
function handleInput() {
    const inputText = G.answerInput.value.toLowerCase().trim();
    if (inputText.length >= 2) { 
        const matchingPatternDataObjs = G.patterns.filter(patternDataObj => patternDataObj.name.toLowerCase().startsWith(inputText))
        if (matchingPatternDataObjs.length==0) return;

        matchingPatternDataObjs.forEach(patternDataObj => {
            let alreadInSuggestions = currentSuggestions[patternDataObj.name];
            if (!alreadInSuggestions) {
                addPatternCardToDOM(patternDataObj,true);
                currentSuggestions[patternDataObj.name] = true;
            }
        });
        // removes suggestions that are no longer valid
        Object.keys(currentSuggestions).forEach(key => {
            if (!matchingPatternDataObjs.find(patternDataObj => patternDataObj.name === key)|| currentSuggestions[key]===false) {
                removePatternCardFromDOM(key);
                currentSuggestions[key] = false;
            }
        });
        scrollToBottom(500)

     
    } else {
        currentSuggestions = {};
        removeAllPatternCardsFromDOM();
    }
}

function removePatternCardFromDOM(p_patternName) {
    const cards = document.querySelectorAll('.pattern-card');
    cards.forEach(card => { 
        if (card.innerHTML.includes(p_patternName)) 
            {card.remove()
        } 
    });
}

let tabInd = 0;
function handleKeyDown(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        const cards = document.querySelectorAll('.pattern-card');
        if (cards.length > 0) {
        G.answerInput.value = cards[tabInd].querySelector('.card-title').textContent;
        tabInd = (tabInd + 1) % cards.length;
        }
    }
    else if (event.key === 'Enter') {
        submitAnswer();
        G.answerInput.blur();        
    }
}

function disableInputSuggestions() {
    G.answerInput.removeEventListener('input', handleInput);
}

function removeAllPatternCardsFromDOM() {
    G.patternContainer.innerHTML = '';
}