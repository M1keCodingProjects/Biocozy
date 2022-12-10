import GameRoundManager from "./gameRound.js";

const rollBehaviour = function() {
    if(this.state == "done") return;
    const getBefore = this.currentSolution[0] == "glucosio" ? 0 : this.currentSolution[0] == "piruvato" ? 1 : Math.random() > 0.5;
    let reaction;
    for(let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        if(option[option.length - 1] == this.currentSolution[this.currentSolution.length - 1]) {
            reaction = this.options[i + 1 - 2 * getBefore];
            break;
        }
    }
    this.currentSolution.splice(1, 0, reaction[0]);
    if(getBefore) this.currentSolution[2] = reaction[1];
    this.inputList[1].placeholder = `Inserisci il nome del ${getBefore ? "reagente" : "prodotto"}`;
};

const gameRoundManager = new GameRoundManager("GLICOLISI", "png", [
    ["glucosio", "esochinasi"],
    [/glucosio( |-)?6( |-)?fosfato/, "fosfoglucoisomerasi", "g6p"],
    [/fruttosio( |-)?6( |-)?fosfato/, /fosfofrutto ?chinasi((-| )?1)?/, "f6p"],
    [/fruttosio( |-)?1,6( |-)?bifosfato/, "aldolasi", "f1,6bp"],
    [/gliceraldeide( |-)?3( |-)?fosfato/, /gliceraldeide( |-)?3( |-)?fosfato ?deidrogenasi/, "g3p"],
    [/1,3( |-)?bifosfoglicerato/, /fosfoglicerato ?chinasi/, "bpg"],
    [/3( |-)?fosfoglicerato/, /fosfoglicerato ?mutasi/, "3pg"],
    [/2( |-)?fosfoglicerato/, "enolasi", "2pg"],
    [/fosfoenol ?piruvato/, /piruvato ?chinasi/, "pep"],
    ["piruvato"],
], rollBehaviour);