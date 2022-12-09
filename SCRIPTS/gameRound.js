import Timer from "./timer.js";

export default class GameRoundManager {
    constructor(options) {
        this.options   = options;
        this.timer     = new Timer();
        this.image     = document.getElementById("image");
        this.submitBtn = document.getElementById("btn-submit");
        this.rollBtn   = document.getElementById("btn-rollNew");
        this.giveUpBtn = document.getElementById("btn-giveUp");
        this.startBtn  = document.getElementById("btn-rounds");
        
        this.endRoundLabel = document.getElementById("round-over-span");
        this.inputList = [...document.getElementsByClassName("input-text")];
        
        this.highscore      = 0;
        this.scoreBoard     = document.getElementById("score");
        this.highscoreBoard = document.getElementById("highscore");

        this.init();
    }

    init() {
        this.changeState("done");
        this.reset();
        this.startBtn.onclick  = this.startRound.bind(this);
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
        this.roundAvailableOps = [...this.options];
    }

    selectInput(event) {
        this.selectedInputID = this.inputList.indexOf(event.target);
    }

    pickNext() {
        this.currentSolution = this.roundAvailableOps.splice(Math.floor(Math.random() * this.roundAvailableOps.length), 1)[0];
        return this.currentSolution === undefined;
    }

    startRound() {
        this.reset();
        this.changeState("ready");
        this.scoreBoard.innerHTML = "0";
        this.roll();
        this.timer.start();
    };

    endRound() {
        this.changeState("done");
        this.timer.stop();
    };

    submit() {
        if(this.state == "locked" || this.state == "done") return;
        
        let correctInputs = 0;
        this.inputList.forEach((el, id) => {
            const lowerName = el.value.toLowerCase();
            const isCorrect = lowerName == (this.currentSolution[id] instanceof RegExp ? lowerName.match(this.currentSolution[id])[0] : this.currentSolution[id]);
            el.parentElement.setAttribute("correct",  isCorrect);
            correctInputs += isCorrect;
        });

        const gotPerfectScore = correctInputs == 3;
        this.points += gotPerfectScore ? 1 : -0.25 * (3 - correctInputs);
        this.updateScore();
        if(!gotPerfectScore) return;
        this.changeState("locked");
    }

    roll() {
        if(this.state == "done") return;
        if(this.pickNext()) return this.endRound(); // this.pickNext returns true when there are no more available roundOps.
        
        this.updateImage();
        this.inputList.forEach(el => {
            el.parentElement.removeAttribute("correct");
            el.value = "";
        });
        
        this.changeState("pending");
    };

    giveUp() {
        if(this.state == "locked" || this.state == "done") return;
        this.changeState("locked");
        this.inputList.forEach((input, id) => input.value = this.currentSolution[id]);
    };

    updateImage() {
        const imgName = this.currentSolution.length == 4 ? this.currentSolution[3] : this.currentSolution[0];
        this.image.src = `./ASSETS/${imgName}.jpg`;
    }

    updateScore() {
        this.scoreBoard.innerHTML = this.points;
        if(this.points <= this.highscore) return;
        this.highscore = this.points;
        this.highscoreBoard.innerHTML = this.highscore;
    }

    changeState(newState) {
        this.state = newState;
        switch(newState) {
            case "ready"   :
                this.image.removeAttribute("hidden");
                this.startBtn.setAttribute("hidden", "true");
                this.endRoundLabel.setAttribute("hidden", "true");
                
                this.endRoundLabel.parentElement.style.setProperty("display", "none");
                this.inputList.forEach(input => input.parentElement.removeAttribute("hidden"));

                this.rollBtn.removeAttribute("locked");
                this.giveUpBtn.removeAttribute("locked"); break;
            
            case "pending" :
                this.submitBtn.removeAttribute("locked");
                this.inputList[0].focus(); break;
            
            case "locked"  : this.submitBtn.setAttribute("locked", "true"); break;
            
            case "done"    :
                this.image.setAttribute("hidden", "true");
                this.startBtn.removeAttribute("hidden");
                this.endRoundLabel.removeAttribute("hidden");

                this.endRoundLabel.parentElement.style.removeProperty("display");
                this.inputList.forEach(input => input.parentElement.setAttribute("hidden", "true"));
                
                this.submitBtn.setAttribute("locked", "true");
                this.rollBtn.setAttribute("locked", "true");
                this.giveUpBtn.setAttribute("locked", "true"); break;
        }
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