// Hooray! (derogatory)
// ciao
//hello world
//disabile
const submitBtn = document.getElementById('btn-submit');
const rollBtn   = document.getElementById('btn-rollNew');
const giveUpBtn = document.getElementById('btn-giveUp');
const inputs    = [...document.getElementsByClassName('input-text')];
const image     = document.getElementById('image');

const nameOptions = [
    ["serina", "ser", "s"],
    ["alanina", "ala", "a"],
    [["glutammato","acido glutammico"], "glu", "e"],
    ["arginina", "arg", "r"],
    ["asparagina", "asn", "n"],
    [["acido aspartico", "aspartato"], "asp", "d"],
    ["cisteina", "cys", "c"],
    ["glutammina", "gln", "q"],
    ["glicina", "gly", "g"],
    ["istidina", "his", "h"],
    ["isoleucina", "ile", "i"],
    ["leucina", "leu", "l"],
    ["lisina", "lys", "k"],
    ["metionina", "met", "m"],
    ["fenilalanina", "phe", "f"],
    ["prolina", "pro", "p"],
    ["treonina", "thr", "t"],
    ["triptofano", "trp", "w"],
    ["tirosina", "tyr", "y"],
    ["valina", "val", "v"],
];

const roundOptions = [];

const loadNames =_=> {
    roundOptions.push(...nameOptions);
}

const getName =_=> roundOptions.splice(Math.floor(Math.random() * roundOptions.length), 1)[0];
// -Martino

let currentCorrectName;
let canSubmit = false;
let canRoll   = false;

const titleAnchor     = document.getElementById('title');
const titleAnchorRect = titleAnchor.getBoundingClientRect();
const rotationCenter  = {
    x : titleAnchorRect.left + 45.6,
    y : titleAnchorRect.top  + titleAnchorRect.height / 2,
};

const scoreSetter = document.getElementById("score");
const highscoreSetter = document.getElementById("highscore");

onmousemove = e => {
    const mousePos = {
        x : e.clientX,
        y : e.clientY,
    };

    const angle_rad = Math.atan2(mousePos.y - rotationCenter.y, mousePos.x - rotationCenter.x);
    const angle_deg = angle_rad * 180 / Math.PI;
    
    titleAnchor.style.setProperty('--angle', `${angle_deg}deg`);
};

const submitName =_=> {
    if(!canSubmit) return;
    let points = 0;
    inputs.forEach((el, id) => {
        const lowerName = el.value.toLowerCase();
        const isCorrect = currentCorrectName[id] instanceof Array ? currentCorrectName[id].includes(lowerName) : currentCorrectName[id] == lowerName;
        el.parentElement.setAttribute("correct",  isCorrect);
        points += isCorrect;
    });
    if(points == 3) {
        scoreSetter.innerHTML = parseFloat(scoreSetter.innerHTML) + 1;
        submitBtn.setAttribute("locked", "true");
        canSubmit = false;
    }
    else scoreSetter.innerHTML = parseFloat(scoreSetter.innerHTML) - .25 * (3 - points);
};

const rollNew =_=> {
    if(!canRoll) return;
    canSubmit = true;
    currentCorrectName = getName();
    if(!currentCorrectName) return roundOver();
    image.src = `./ASSETS/${currentCorrectName[0] instanceof Array ? currentCorrectName[0][0] : currentCorrectName[0]}.jpg`;
    inputs.forEach(el => {
        el.parentElement.removeAttribute("correct");
        el.value = "";
    });
    submitBtn.removeAttribute("locked");
};

const roundOverSpan = document.getElementById("round-over-span");
const roundsButton = document.getElementById("btn-rounds");

const startRound =_=> {
    scoreSetter.innerHTML = "0";
    image.removeAttribute("hidden");
    inputs.forEach(input => input.parentElement.removeAttribute("hidden"));
    roundsButton.setAttribute("hidden", "true");
    roundOverSpan.setAttribute("hidden", "true");
    loadNames();
    canSubmit = true;
    canRoll   = true;
    rollBtn.removeAttribute("locked");
    giveUpBtn.removeAttribute("locked");
    rollNew();
    timer.start();
};

const roundOver =_=> {
    image.setAttribute("hidden", "true");
    inputs.forEach(input => input.parentElement.setAttribute("hidden", "true"));
    roundsButton.removeAttribute("hidden");
    roundOverSpan.removeAttribute("hidden");
    canSubmit = false;
    canRoll   = false;
    if(parseFloat(scoreSetter.innerHTML) > parseFloat(highscoreSetter.innerHTML)) highscoreSetter.innerHTML = scoreSetter.innerHTML;
    rollBtn.setAttribute("locked", "true");
    submitBtn.setAttribute("locked", "true");
    giveUpBtn.setAttribute("locked", "true");
    timer.stop();
};

const giveUp =_=> {
    if(!roundOptions.length) return;
    canSubmit = false;
    submitBtn.setAttribute("locked", "true");
    inputs.forEach((input, id) => input.value = currentCorrectName[id]);
};

class Timer {
    constructor() {
        this.DOMelement = document.getElementById("timer");
        this.init();
    }

    init() {
        this.secs = 0;
        this.mins = 0;
        this.updateDOM();
    }

    start() {
        this.init();
        this.activeTimer = setInterval(this.update.bind(this), 1000);
    }

    stop() {
        clearInterval(this.activeTimer);
        this.DOMelement.style.setProperty("scale", "1.1");
    }

    updateDOM() {
        const secs_str = (this.secs > 9 ? "" : "0") + this.secs;
        const mins_str = (this.mins > 9 ? "" : "0") + this.mins;
        this.DOMelement.innerHTML = `${mins_str}:${secs_str}`;
    }

    update() {
        this.secs++;
        if(this.secs >= 60) {
            this.mins++;
            this.secs = 0;
        }
        this.updateDOM();
    }
}

const timer = new Timer();