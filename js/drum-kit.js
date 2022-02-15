const className = 'keyboard-letter';
const dataKeyAttName = 'data-key-code';
const transitionClassName = 'selected';
const drumKeyboardList = document.getElementsByClassName(className);

window.addEventListener('keydown', handleKeyPress);
Array.from(drumKeyboardList).forEach(drumKeyboardElement => {
    addTransitionEndEvent(drumKeyboardElement);
})

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
    getGrandParentNode(drumKeyboardElement).classList.add('selected');
}
function addTransitionEndEvent(drumKeyboardElement) {
    getGrandParentNode(drumKeyboardElement).addEventListener('transitionend', removeClass)
}
function removeClass() {
    this.classList.remove(transitionClassName);
}
function getGrandParentNode(grandsonElement) {
    return grandsonElement.parentNode.parentNode;
}

