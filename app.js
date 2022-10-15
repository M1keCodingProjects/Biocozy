// Hooray! (derogatory)
const submitBtn = document.getElementById('submitBtn');
const inputs    = [...document.getElementsByClassName('input-text')];

const nameOptions = [
    ["serina", "ser", "s"],
    ["alanina", "ala", "a"],
    [["glutammato","acido glutammico"], "glu", "e"],
    ["arginina", "arg", "r"],
    ["asparagina", "asn", "n"],
    [["acido aspartico", "aspartato"], "asp", "d"],
    ["cisteina", "cys", "c"],
    [["acido glutammico", "glutammato"], "glu", "e"],
    ["glutammina", "gln", "q"],
    ["glicina", "gly", "g"],
    ["istidina", "his", "h"],
    ["isoleucina", "ile", "i"],
    ["leucina", "leu", "l"],
    ["lis", "lys", "k"],
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

const titleAnchor     = document.getElementById('title');
const titleAnchorRect = titleAnchor.getBoundingClientRect();
const rotationCenter  = {
    x : titleAnchorRect.left + 45.6,
    y : titleAnchorRect.top  + titleAnchorRect.height / 2,
};

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
    inputs.forEach((el, id) => {
        const lowerName = el.value.toLowerCase();
        const isCorrect = currentCorrectName[id] instanceof Array ? currentCorrectName[id].includes(lowerName) : currentCorrectName[id] == lowerName;
        el.parentElement.setAttribute("correct",  isCorrect);
    });
};

const rollNew =_=> {
    //manage image change..
    currentCorrectName = nameOptions[Math.floor(Math.random() * nameOptions.length)];
    inputs.forEach(el => el.parentElement.removeAttribute("correct"));
};

rollNew();