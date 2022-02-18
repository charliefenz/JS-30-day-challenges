function getUniqueStyleSheet(styleSheetTitle) {
    const styleSheet = Array.from(document.styleSheets).filter(item => item.title === styleSheetTitle);
    const styleSheetUnit = styleSheet[0];
    return styleSheetUnit;
}

function findCSSRuleIndex(styleSheetCSSRules, cssSelector) {
    return Array.from(styleSheetCSSRules).findIndex(item => item.selectorText === cssSelector);
}

function changeRotation(cssSelector, unit) {
    const cssRuleIndex = findCSSRuleIndex(styleSheet.cssRules, cssSelector);
    const unitDeg = `${unit}deg`;

    styleSheet.deleteRule(cssRuleIndex);
    styleSheet.insertRule(`${cssSelector} {transform: rotate(${unitDeg});}`);
}

function turnTimeIntoDegrees(hourlyTimeFrame, value) {
    const hourFactor = 360 / 12;
    const notHourFactor = 360 / 60;
    if (hourlyTimeFrame) {
        return hourFactor + (value -1)*hourFactor;
    } else {
        return notHourFactor + (value -1)*notHourFactor;
    }
}
function fixDegreesToFitClockPosition(degrees) {
    return degrees -90;
}

