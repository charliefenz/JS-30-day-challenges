function getUniqueStyleSheet(styleSheetTitle) {
    const styleSheet = Array.from(document.styleSheets).filter(item => item.title === styleSheetTitle);
    const styleSheetUnit = styleSheet[0];
    return styleSheetUnit;
}

function findCSSRuleIndex(styleSheetCSSRules, cssSelector) {
    return Array.from(styleSheetCSSRules).findIndex(item => item.selectorText === cssSelector);
}

function changeRotation(styleSheet, cssSelector, unit) {
    const styleSheetCSSRules = styleSheet.cssRules;
    const cssRuleIndex = findCSSRuleIndex(styleSheetCSSRules, cssSelector);
    styleSheet.deleteRule(cssRuleIndex);
    styleSheet.insertRule(`
        ${cssSelector} {
            transform: rotate(${unit});
        }
    `)
}

function findCSSRuleIndex(styleSheetCSSRules, cssSelector) {
    return Array.from(styleSheetCSSRules).findIndex(item => item.selectorText === cssSelector);
}

const styleSheet = getUniqueStyleSheet('clockCSS');
changeRotation(styleSheet, '.seconds-rotation', '0deg');


