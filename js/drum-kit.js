const className = 'keyboard-letter';
const dataKeyAttName = 'data-key-code';
const drumKeyboardList = document.getElementsByClassName(className);

function handleKeyPress(e) {
    const eventKeyCode = e.keyCode;
    const matchedDrumKeyboardElement = findDrumKeyboardMatch(eventKeyCode, drumKeyboardList);
    highlightDrumItem(matchedDrumKeyboardElement);
}
function findDrumKeyboardMatch(eventKeyCode, drumKeyboardList) {
    let matchedDrumKeyboardElement = null;
    Array.from(drumKeyboardList).forEach(drumKeyboardElement => {
        let drumKey = drumKeyboardElement.getAttribute(dataKeyAttName);
        if (eventKeyCode == drumKey) {
            return matchedDrumKeyboardElement = drumKeyboardElement;
        }
    });
    return matchedDrumKeyboardElement;
}
function highlightDrumItem(drumKeyboardElement) {
    const drumItemNode = drumKeyboardElement.parentNode.parentNode;
    drumItemNode.classList.add('selected');
}
function addTransitionEndEvent(drumKeyboardElement) {
    const drumItemNode = drumKeyboardElement.parentNode.parentNode;
    drumItemNode.addEventListener('transitionend', removeClass)
}
function removeClass() {
    this.classList.remove('selected');
}

window.addEventListener('keydown', handleKeyPress);
Array.from(drumKeyboardList).forEach(drumKeyboardElement => {
    addTransitionEndEvent(drumKeyboardElement);
})

