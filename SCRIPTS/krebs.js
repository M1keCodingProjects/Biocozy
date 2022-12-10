import GameRoundManager from "./gameRound.js";

const rollBehaviour = function() {
    if(this.state == "done") return;
    const getBefore = Math.random() > 0.5;
    let reaction;
    for(let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        if(option[option.length - 1] == this.currentSolution[this.currentSolution.length - 1]) {
            reaction = this.options[Math.abs(i + 1 - 2 * getBefore) - 1];
            break;
        }
    }
    this.currentSolution.splice(1, 0, reaction[0]);
    if(getBefore) this.currentSolution[2] = reaction[1];
    this.inputList[1].placeholder = `Inserisci il nome del ${getBefore ? "reagente" : "prodotto"}`;
}

const gameRoundManager = new GameRoundManager("KREBS", "png", [
    ["ossalacetato", /citrato ?sintasi/],
    ["citrato", "aconitasi"],
    ["isocitrato", /isocitrato ?deidrogenasi/],
    [/al(ph|f)a ?chetoglutarato/, /al(ph|f)a ?chetoglutarato ?deidrogenasi/, "alphachetoglutarato"],
    [/succinil ?coa/, /succinil ?coa ?sintetasi/, "succinilCoA"],
    ["succinato", /succinato ?deidrogenasi/],
    ["fumarato", "fumarasi"],
    ["malato", /malato ?deidrogenasi/],
], rollBehaviour);