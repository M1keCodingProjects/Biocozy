// Hooray! (derogatory)
// ciao
const submitBtn = document.getElementById('btn-submit');
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
    [["glutammato", "acido glutammico"], "glu", "e"],
    ["glutammina", "gln", "q"],
    ["glicina", "gly", "g"],
    ["istidina", "his", "h"],
    ["isoleucina", "ile", "i"],
    ["leucina", "leu", "l"],
    ["lisina", "lys", "k"],
    ["metionina", "met", "m"],
    ["fenilalanina", "phe", "f"],
    ["prolina", "pro", "p"],
    ["serina", "ser", "s"],
    ["treonina", "thr", "t"],
    ["triptofano", "trp", "w"],
    ["tirosina", "tyr", "y"],
    ["valina", "val", "v"],
];
// -Martino

let currentCorrectName;
let canSubmit = true;

const titleAnchor     = document.getElementById('title');
const titleAnchorRect = titleAnchor.getBoundingClientRect();
const rotationCenter  = {
    x : titleAnchorRect.left + 45.6,
    y : titleAnchorRect.top  + titleAnchorRect.height / 2,
};

const scoreSetter = document.getElementById("score");

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
    if(!nameOptions.length) return;
    canSubmit = true;
    currentCorrectName = nameOptions.splice(Math.floor(Math.random() * nameOptions.length), 1)[0];
    image.src = `./ASSETS/${currentCorrectName[0] instanceof Array ? currentCorrectName[0][0] : currentCorrectName[0]}.png`;
    inputs.forEach(el => {
        el.parentElement.removeAttribute("correct");
        el.value = "";
    });
    submitBtn.removeAttribute("locked");
};

rollNew();