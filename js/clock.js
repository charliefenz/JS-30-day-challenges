const secondsCSSSelector = '.seconds-rotation';
const minutesCSSSelector = '.minutes-rotation';
const hoursCSSSelector = '.hours-rotation';
const notHourly = false;
const hourly = true;
const styleSheet = getUniqueStyleSheet('clockCSS');

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

function turnTimeIntoDegrees(hourlyTimeFrame, value) {
    const hourFactor = 360 / 12;
    const notHourFactor = 360 / 60;
    if (hourlyTimeFrame) {
        const hourlyDegrees = hourFactor + (value - 1) * hourFactor;
        const fixedHourlyDegrees = fixDegreesToFitClockPosition(hourlyDegrees);

        return fixedHourlyDegrees;
    } else {
        const notHourlyDegrees = notHourFactor + (value - 1) * notHourFactor;
        const fixedNotHourlyDegrees = fixDegreesToFitClockPosition(notHourlyDegrees);

        return fixedNotHourlyDegrees;
    }
}

function fixDegreesToFitClockPosition(degrees) {
    return degrees - 90;
}

function changeRotation(cssSelector, degrees) {
    const cssRuleIndex = findCSSRuleIndex(styleSheet.cssRules, cssSelector);
    const degreesString = `${degrees}deg`;

    styleSheet.deleteRule(cssRuleIndex);
    styleSheet.insertRule(`${cssSelector} {transform: rotate(${degreesString});}`);
}

function findCSSRuleIndex(styleSheetCSSRules, cssSelector) {
    return Array.from(styleSheetCSSRules).findIndex(item => item.selectorText === cssSelector);
}

function getUniqueStyleSheet(styleSheetTitle) {
    const styleSheet = Array.from(document.styleSheets).filter(item => item.title === styleSheetTitle);
    const styleSheetUnit = styleSheet[0];
    return styleSheetUnit;
}