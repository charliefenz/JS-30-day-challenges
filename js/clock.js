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
        const hourlyDegrees = hourFactor + (value - 1) * hourFactor;
        return fixDegreesToFitClockPosition(hourlyDegrees);
    } else {
        const notHourlyDegrees = notHourFactor + (value - 1) * notHourFactor;
        return fixDegreesToFitClockPosition(notHourlyDegrees);
    }
}

function fixDegreesToFitClockPosition(degrees) {
    return degrees -90;
}

setInterval(() => {
    const dateNow = new Date();
    const secondsNow = dateNow.getSeconds();
    const minutesNow = dateNow.getMinutes();
    const hoursNow = dateNow.getHours();

    console.log(`${hoursNow}:${minutesNow}:${secondsNow}`);

    changeRotation(secondsCSSSelector, turnTimeIntoDegrees(notHourly, secondsNow));
    changeRotation(minutesCSSSelector, turnTimeIntoDegrees(notHourly, minutesNow));
    changeRotation(hoursCSSSelector, turnTimeIntoDegrees(hourly, hoursNow));

}, 1000);