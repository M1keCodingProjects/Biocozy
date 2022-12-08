// Imports
import Timer from "./timer.js";
import AnimatedTitle from "./title.js";



// Rounds
const roundOverSpan = document.getElementById("round-over-span");
const roundsButton  = document.getElementById("btn-rounds");

const startRound =_=> {
    scoreSetter.innerHTML = "0";
    image.removeAttribute("hidden");
    inputs.forEach(input => input.parentElement.removeAttribute("hidden"));
    roundsButton.setAttribute("hidden", "true");
    roundOverSpan.setAttribute("hidden", "true");
    roundOverSpan.parentElement.style.setProperty("display", "none");
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
    roundOverSpan.parentElement.style.removeProperty("display");
    canSubmit = false;
    canRoll   = false;
    if(parseFloat(scoreSetter.innerHTML) > parseFloat(highscoreSetter.innerHTML)) highscoreSetter.innerHTML = scoreSetter.innerHTML;
    rollBtn.setAttribute("locked", "true");
    submitBtn.setAttribute("locked", "true");
    giveUpBtn.setAttribute("locked", "true");
    timer.stop();
};

// Menu
const menu           = document.getElementById("menu");
const openMenuBtn    = document.querySelector("#menu-container > #btn-menu");
const closeMenuBtn   = document.querySelector("#menu > #menu-header > #btn-closemenu");
openMenuBtn.onclick  =_=> menu.style.setProperty("width", "30%");
closeMenuBtn.onclick =_=> menu.style.setProperty("width", "0");


// Main
const timer = new Timer();
const title = new AnimatedTitle();