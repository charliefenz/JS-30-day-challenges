const drumKeyboardClass = 'keyboard-letter';
const dataKeyAttName = 'data-key-code';
const transitionClassName = 'selected';
const drumSoundClass = 'keyboard-sound';
const drumKeyboardList = document.getElementsByClassName(drumKeyboardClass);
const drumSoundList = document.getElementsByClassName(drumSoundClass);

window.addEventListener('keydown', handleKeyPress);
Array.from(drumKeyboardList).forEach(drumKeyboardElement => {
    addTransitionEndEvent(drumKeyboardElement);
})

function handleKeyPress(keyDownEvent) {
    const keyDownKeyCode = keyDownEvent.keyCode;
    const matchedDrumKeyboardElement = findDrumMatch(keyDownKeyCode, drumKeyboardList);
    const matchedDrumSoundElement = findDrumMatch(keyDownKeyCode, drumSoundList);
    highlightDrumItem(matchedDrumKeyboardElement);
    playSound(matchedDrumSoundElement);
}

function findDrumMatch(eventKeyCode, drumList) {
    let matchedDrumElement = null;
    Array.from(drumList).forEach(drumElement => {
        let drumKey = drumElement.getAttribute(dataKeyAttName);
        if (eventKeyCode == drumKey) {
            return matchedDrumElement = drumElement;
        }
    });
    return matchedDrumElement;
}

function highlightDrumItem(drumKeyboardElement) {
    getGrandParentNode(drumKeyboardElement).classList.add(transitionClassName);
}

function playSound(drumSoundElement) {
    if (!drumSoundElement.ended) {
        drumSoundElement.load();
    }
    drumSoundElement.play();
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

