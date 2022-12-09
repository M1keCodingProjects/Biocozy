// Imports
import AnimatedTitle from "./title.js";

// Menu
const menu           = document.getElementById("menu");
const openMenuBtn    = document.querySelector("#menu-container > #btn-menu");
const closeMenuBtn   = document.querySelector("#menu > #menu-header > #btn-closemenu");
openMenuBtn.onclick  =_=> menu.style.setProperty("width", "30%");
closeMenuBtn.onclick =_=> menu.style.setProperty("width", "0");

const title = new AnimatedTitle();