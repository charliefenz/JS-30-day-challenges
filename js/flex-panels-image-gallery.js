function hover(element) {
    const children = element.children;

    children[0].classList.remove('top-exit');
    children[2].classList.remove('bottom-exit');
    children[0].classList.add('top-entrance');
    children[2].classList.add('bottom-entrance');
    element.classList.add('selected');
}

function dehover(element) {
    const children = element.children;

    children[0].classList.remove('top-entrance');
    children[2].classList.remove('bottom-entrance');
    children[0].classList.add('top-exit');
    children[2].classList.add('bottom-exit');
    element.classList.remove('selected');
}