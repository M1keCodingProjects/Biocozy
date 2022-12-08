export default class Timer {
    constructor() {
        this.DOMelement = document.getElementById("timer");
        this.init();
    }

    init() {
        this.secs = 0;
        this.mins = 0;
        this.updateDOM();
    }

    start() {
        this.init();
        this.activeTimer = setInterval(this.update.bind(this), 1000);
    }

    stop() {
        clearInterval(this.activeTimer);
        this.DOMelement.style.setProperty("scale", "1.1");
    }

    updateDOM() {
        const secs_str = (this.secs > 9 ? "" : "0") + this.secs;
        const mins_str = (this.mins > 9 ? "" : "0") + this.mins;
        this.DOMelement.innerHTML = `${mins_str}:${secs_str}`;
    }

    update() {
        this.secs++;
        if(this.secs >= 60) {
            this.mins++;
            this.secs = 0;
        }
        this.updateDOM();
    }
}