/* round state enum:
    ready : can press: startBtn, cannot press: submitBtn, rollBtn, giveUpBtn
    
    from ready
    (press startBtn) -> pending : can press: submitBtn, rollBtn, giveUpBtn, cannot press: startBtn

    from pending
    (press submitBtn) -> locked : can press: rollB, giveUpBtn, cannot press: startBtn, submitBtn
    (press giveUpBtn) -> locked
    (roundAvailableOps empty) -> done : cannot press anything
*/

export default class GameRoundManager {
    constructor(options) {
        this.options   = options;
        this.image     = document.getElementById("image");
        this.submitBtn = document.getElementById("btn-submit");
        this.rollBtn   = document.getElementById("btn-rollNew");
        this.giveUpBtn = document.getElementById("btn-giveUp");

        this.inputList = [...document.getElementsByClassName("input-text")];
        
        this.highscore      = 0;
        this.scoreBoard     = document.getElementById("score");
        this.highscoreBoard = document.getElementById("highscore");

        this.init();
    }

    init() {
        this.reset();

        this.submitBtn.onclick = this.submit.bind(this);
        this.rollBtn.onclick   = this.roll.bind(this);
        this.giveUpBtn.onclick = this.giveUp.bind(this);

        document.onkeydown = this.detectKeybindings.bind(this);
        this.inputList.forEach(inp => inp.addEventListener("focus", this.selectInput.bind(this)));
    }
    
    reset() {
        this.points            = 0;
        this.currentSolution   = null;
        this.selectedInputID   = null;
        this.state             = "ready";
        this.roundAvailableOps = [...this.options];
    }

    selectInput(event) {
        this.selectedInputID = this.inputList.indexOf(event.target);
    }

    pickNext() {
        this.currentSolution = this.roundAvailableOps.splice(Math.floor(Math.random() * this.roundAvailableOps.length), 1)[0];
    }

    submit() {
        if(this.state == "locked" || this.state == "done") return;
        
        let correctInputs = 0;
        this.inputList.forEach((el, id) => {
            const lowerName = el.value.toLowerCase();
            const isCorrect = lowerName == (this.currentSolution[id] instanceof RegExp ? lowerName.match(this.currentSolution[id])[0] : currentCorrectName[id]);
            el.parentElement.setAttribute("correct",  isCorrect);
            correctInputs += isCorrect;
        });

        const gotPerfectScore = correctInputs == 3;
        this.points += gotPerfectScore ? 1 : -0.25 * (3 - correctInputs);
        this.updateScore();
        if(!gotPerfectScore) return;
        this.submitBtn.setAttribute("locked", "true");
        this.state = "locked";
    }

    updateScore() {
        this.scoreBoard.innerHTML = this.points;
        if(this.points <= this.highscore) return;
        this.highscore = this.points;
        this.highscoreBoard.innerHTML = this.highscore;
    }

    detectKeybindings(event) {
        switch(event.key) {
            case "Enter" : {
                switch(this.state) {
                    case "pending" : this.submit(); break;
                    case "locked"  : this.roll();   break;
                    case "done"    :
                    case "ready"   : return;
                }
                break;
            }

            case "ArrowUp" : {
                if(this.selectedInputID === null) return;
                this.inputList[this.selectedInputID ? this.selectedInputID - 1 : 2].focus(); break;
            }
    
            case "ArrowDown" : {
                if(this.selectedInputID === null) return;
                this.inputList[(this.selectedInputID + 1) % 3].focus(); break;
            }
        }
    }
}