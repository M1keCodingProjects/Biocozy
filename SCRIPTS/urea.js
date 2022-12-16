import GameRoundManager from "./gameRound.js";

const rollBehaviour = function() {
    if(this.state == "done") return;

    switch(this.currentSolution[this.currentSolution.length == 2]) {
        case "urea" :
            this.currentSolution.push("arginina");
            this.inputList[1].placeholder = "Inserisci composto precedente"; return;

        case "carbammilfosfato" :
            this.currentSolution.push("ornitina");
            this.inputList[1].placeholder = "Inserisci composto precedente"; return;
    }

    const getBefore = Math.random() > 0.5;
    let reaction;
    for(let i = 0; i < this.options.length; i++) {
        const option = this.options[i][0];
        if(option == this.currentSolution[0]) {
            reaction = this.options[(i + 1 - 2 * getBefore + 4) % 4][0];
            break;
        }
    }
    this.currentSolution.splice(1, 0, reaction);
    this.inputList[1].placeholder = `Inserisci composto ${getBefore ? "precedente" : "successivo"}`;
}

const gameRound = new GameRoundManager("UREA", "jpg", [
    ["ornitina"],
    ["citrullina"],
    ["argininsuccinato"],
    ["arginina"],
    ["urea"],
    [/carbamm?il ?fosfato/, "carbammilfosfato"],
], rollBehaviour);