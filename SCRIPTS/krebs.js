import GameRoundManager from "./gameRound.js";

const rollBehaviour = function() {
    if(this.state == "done") return;
    const getBefore = Math.random() > 0.5;
    let reaction;
    for(let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        const nameIsRegExp = option[0] instanceof RegExp;
        if(option[(option.length - 1) * nameIsRegExp] == this.currentSolution[(this.currentSolution.length - 1) * nameIsRegExp]) {
            reaction = this.options[(i + 1 - 2 * getBefore + 8) % 8];
            break;
        }
    }
    this.currentSolution.splice(1, 0, reaction[0]);
    if(getBefore) this.currentSolution[2] = reaction[1];
    this.inputList[1].placeholder = `Inserisci composto ${getBefore ? "precedente" : "successivo"}`;
}

const gameRoundManager = new GameRoundManager("KREBS", "jpg", [
    ["ossalacetato", /citrato ?sintasi/],
    ["citrato", "aconitasi"],
    ["isocitrato", /isocitrato ?deidrogenasi/],
    [/al(ph|f)a ?chetoglutarato/, /al(ph|f)a ?chetoglutarato ?deidrogenasi/, "alphachetoglutarato"],
    [/succinil ?coa/, /succinil ?coa ?sintetasi/, "succinilCoA"],
    ["succinato", /succinato ?deidrogenasi/],
    ["fumarato", "fumarasi"],
    ["malato", /malato ?deidrogenasi/],
], rollBehaviour);