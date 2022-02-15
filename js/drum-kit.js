const className = 'keyboard-letter';
const dataKeyAttName = 'data-key-code';

function handleKeyPress(e) {
    const eventKeyCode = e.keyCode;
    const drumItemKeyBoardLetterList = document.getElementsByClassName(className);
    const matchedDrumKey = findDrumItemMatch(eventKeyCode, drumItemKeyBoardLetterList);
}

function findDrumItemMatch(eventKeyCode, drumItemKeyBoardLetterList) {
    let drumItemFoundMatch = false;
    Array.from(drumItemKeyBoardLetterList).forEach(element => {
        let elementDataKeyCode = element.getAttribute(dataKeyAttName);
        if (eventKeyCode == elementDataKeyCode) {
            return drumItemFoundMatch = true;
        }
    });
    return drumItemFoundMatch;
}

window.addEventListener('keydown', handleKeyPress);
