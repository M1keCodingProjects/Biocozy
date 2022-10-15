// Hooray! (derogatory)
const titleAnchor     = document.getElementById('title');
const titleAnchorRect = titleAnchor.getBoundingClientRect();
const rotationCenter  = {
    x : titleAnchorRect.left + 45.6,
    y : titleAnchorRect.top  + titleAnchorRect.height / 2,
};

onmousemove = e => {
    const mousePos = {
        x : e.clientX,
        y : e.clientY,
    };

    const angle_rad = Math.atan2(mousePos.y - rotationCenter.y, mousePos.x - rotationCenter.x);
    const angle_deg = angle_rad * 180 / Math.PI;
    
    titleAnchor.style.setProperty('--angle', `${angle_deg}deg`);
}