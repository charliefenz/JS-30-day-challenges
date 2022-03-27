function changeImgProperty(elementId, value) {
    let filteredUnit = unitFilter(elementId, value);
    document.documentElement.style.setProperty(`--${elementId}`, `${filteredUnit}`);
}

function unitFilter(elementId, value) {
    let unit = undefined;

    switch (elementId) {
        case "spacing-bar":
            unit = `${value}%`;
            break;

        case 'blur-bar':
            value /= 6;
            unit = `${value}px`  
            break;
            
        default:
            unit = value;
            break;
    }

    return unit;
}