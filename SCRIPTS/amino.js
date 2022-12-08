// Answers
const gameRoundManager = new GameRoundManager([
    ["serina", "ser", "s"],
    ["alanina", "ala", "a"],
    [/glutammato|acido glutammico/, "glu", "e"],
    ["arginina", "arg", "r"],
    ["asparagina", "asn", "n"],
    [/aspartato|acido aspartico/, "asp", "d"],
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
]);


// Buttons


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
    inputs[0].focus();
};

const giveUp =_=> {
    if(!canSubmit) return;
    canSubmit = false;
    submitBtn.setAttribute("locked", "true");
    inputs.forEach((input, id) => input.value = currentCorrectName[id]);
};