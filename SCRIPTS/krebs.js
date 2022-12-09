import GameRoundManager from "./gameRound.js";

const gameRoundManager = new GameRoundManager("KREBS", ".png", [
    [/acetil ?coa/, /piruvato ?deidrogenasi/, "acetilCoA"],
    ["ossalacetato", /citrato ?sintasi/],
    ["citrato", "aconitasi"],
    ["isocitrato", /isocitrato ?deidrogenasi/],
    [/al(ph|f)a ?chetoglutarato/, /al(ph|f)a ?chetoglutarato ?deidrogenasi/, "alphachetoglutarato"],
    [/succinil ?coa/, /succinil ?coa ?sintetasi/, "succinilCoA"],
    ["succinato", /succinato ?deidrogenasi/],
    ["fumarato", "fumarasi"],
    ["malato", /malato ?deidrogenasi/],
]);

