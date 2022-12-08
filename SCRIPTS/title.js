class Vector2D {
    constructor(x, y, degMode = true) {
        this.x = x;
        this.y = y;
        this.degMode = degMode;
    }

    convertToDeg(angleRad) {
        return angleRad * 180 / Math.PI;
    }

    angleBetween(vec) {
        const angleRad = Math.atan2(this.y - vec.y, this.x - vec.x);
        return this.degMode ? this.convertToDeg(angleRad) : angleRad;
    }
}

export default class AnimatedTitle {
    constructor() {
        this.DOMEl = document.getElementById("title");
        this.init();
    }

    init() {
        const clientRect     = this.DOMEl.getBoundingClientRect();
        this.rotationCenter  = new Vector2D(clientRect.left + 45.6, clientRect.top + clientRect.height / 2);
        document.onmousemove = this.updateAnimation.bind(this);
    }

    updateAnimation(event) {
        const mousePos     = new Vector2D(event.clientX, event.clientY);
        const angleBetween = mousePos.angleBetween(this.rotationCenter);
        this.DOMEl.style.setProperty('--angle', `${angleBetween}deg`);
    }
}