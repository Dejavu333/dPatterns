//======================================================
// global variables
//======================================================
G.alreadyAskedQuestionIndecies = [];
G.givenAnswers = [];
G.currentQuestion = null;
G.correctAnswerCount = 0;
G.currentScore = 0;
G.totalScore = null;
G.usedHintTotalCount = 0;
G.usedHintThisTurnCount = 0;
G.currentSuggesitons = [];

G.score = document.querySelector("#score");
G.progressBar = document.querySelector("#progress-bar");
G.resultBoard = document.querySelector("#result-board");
G.hintBtn = document.querySelector("#hint-btn");
G.code = document.querySelector("code");
G.patternContainer = document.querySelector("#pattern-container");
G.solDescriptionContainer = document.querySelector("#sol-description-container")
G.answerInput = document.querySelector("#answer-input");
G.submitBtn = document.querySelector("#submit-btn");
G.infoBoard = document.querySelector("#info-board");

const DEFAULT_DELAY = 500;

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
        G.usedHintTotalCount++;
        G.usedHintThisTurnCount++;
        scrollToBottom(DEFAULT_DELAY);
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
populateProgressBar(G.questionsJSONRepres.length);
G.hintBtn.addEventListener("click", () => functionWarden(()=>G.currentQuestion.revealHint(),DEFAULT_DELAY*4));
document.addEventListener("scroll", () => blurElementOutsideViewport(G.answerInput));


//======================================================
// functions
//======================================================
function submitAnswer() {
    tabInd = 0;
    storeAnswer(G.answerInput.value);
    evaluateResult();
    if (G.alreadyAskedQuestionIndecies.length === G.questionsJSONRepres.length) {
        console.log("no more questions");
        showResultBoard();
        return;
    }
    setTimeout(() => {
        askQestion();
    }, 1000);

    this.removeEventListener("click", submitAnswer);
}

function populateProgressBar(p_questionsNum) {
    for (let i = 0; i < p_questionsNum; i++) {
        const c = document.createElement("div");
        c.opacity = 0;
        c.classList.add("circle");
        if (i === 0) { c.classList.add("pulse"); }
        G.progressBar.appendChild(c);
    }
}

function addProgress(p_isAnswerCorrect, currentQuestionIndex=G.alreadyAskedQuestionIndecies.length-1) {

        G.progressBar.children[currentQuestionIndex].classList.remove("pulse"); 

    p_isAnswerCorrect==true?
        G.progressBar.children[currentQuestionIndex].classList.add("greencirc"):
        G.progressBar.children[currentQuestionIndex].classList.add("redcirc");
    setTimeout(() => {
    G.progressBar.children[currentQuestionIndex+1].classList.add("pulse");
    }, DEFAULT_DELAY*2);
}

function showResultBoard() {
    G.resultBoard.style.opacity = 0;
    G.resultBoard.style.display = "inline-block";
    const result = Math.round((G.currentScore/ G.totalScore) * 100);
    G.resultBoard.innerHTML = `<div class="heartbeat">You Reached ${result}%</div><br><button id="restart-btn">Restart</button>`;
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
    scrollToTop(DEFAULT_DELAY);
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
    }, DEFAULT_DELAY);
}

function storeAnswer(p_answer) {
    G.givenAnswers.push(p_answer);
}

function evaluateResult() {
    const lastAnswer = G.givenAnswers[G.givenAnswers.length - 1];
    const lastQuestionIndex = G.alreadyAskedQuestionIndecies[G.alreadyAskedQuestionIndecies.length - 1];
    const isCorrect = lastAnswer.toLowerCase().trim() === G.questionsJSONRepres[lastQuestionIndex].answer.toLowerCase().trim();
    let delta = 0;
    isCorrect ? (delta=4-G.usedHintThisTurnCount, G.correctAnswerCount++) : delta = 0;
    G.usedHintThisTurnCount = 0;
    G.currentScore += delta;
    G.totalScore = G.alreadyAskedQuestionIndecies.length*4
    addProgress(isCorrect);
    G.score.innerText = `Score: ${G.currentScore} / ${G.totalScore}`
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
    var start = window.scrollY;
    var end = document.documentElement.scrollHeight - window.innerHeight;
    var startTime = performance.now();
    
    function scrollStep(timestamp) {
        var elapsed = timestamp - startTime;
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

function handleInput() {
    const inputText = G.answerInput.value.toLowerCase().trim();
    if (inputText.length >= 2) { 
        const matchingPatternDataObjs = G.patterns.filter(patternDataObj => patternDataObj.name.toLowerCase().startsWith(inputText))
        if (matchingPatternDataObjs.length==0) return;

        matchingPatternDataObjs.forEach(patternDataObj => {
            let alreadInSuggestions = G.currentSuggesitons[patternDataObj.name];
            if (!alreadInSuggestions) {
                addPatternCardToDOM(patternDataObj,true);
                G.currentSuggesitons[patternDataObj.name] = true;
            }
        });
        // removes suggestions that are no longer valid
        Object.keys(G.currentSuggesitons).forEach(key => {
            if (!matchingPatternDataObjs.find(patternDataObj => patternDataObj.name === key)|| G.currentSuggesitons[key]===false) {
                removePatternCardFromDOM(key);
                G.currentSuggesitons[key] = false;
            }
        });
        functionWarden(()=>scrollToBottom(DEFAULT_DELAY),DEFAULT_DELAY+300);
    
    } else {
        G.currentSuggesitons = {};
        removeAllPatternCardsFromDOM();
    }
}

let isTemporalLock = true;
function functionWarden(p_function,p_lockingTime) {
    if (isTemporalLock==true) {
        setTimeout(()=>{isTemporalLock=true;},p_lockingTime)
        p_function();
        isTemporalLock=false;
    }
}

function isElementInViewport(p_inputElement) {
    const rect = p_inputElement.getBoundingClientRect();
    const breathingRoom = 30;
    return (
      rect.top >= 0-breathingRoom&&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + breathingRoom &&   
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
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

function blurElementOutsideViewport(p_element) {
    if (!isElementInViewport(p_element)) {
        p_element.blur();
    }
}