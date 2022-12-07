const exerciseElement = document.querySelector('#exercise');
const answerBlocks = document.querySelectorAll('.answer-block');
const disabledButtonClass = 'disabled';

const people = [
    {name: 'Wes', year: 1988},
    {name: 'Kait', year: 1986},
    {name: 'Irv', year: 1970},
    {name: 'Lux', year: 2015},
];

const comments = [
    {text: 'Love this!', id: 523423},
    {text: 'Super good', id: 823423},
    {text: 'You are the best', id: 2039842},
    {text: 'Ramen is my fav food ever', id: 123523},
    {text: 'Nice Nice Nice!', id: 543238},
];

(function transferArraysToHTMl() {
    let prePeopleElement = document.createElement('pre');
    prePeopleElement.setAttribute('class', 'exercise');
    let preCommentElement = prePeopleElement.cloneNode();
    let peopleBlock = document.createTextNode(`people = ${JSON.stringify(people, null, '\t')}`)
    let commentsBlock = document.createTextNode(`comments = ${JSON.stringify(comments, null, '\t')}`);
    prePeopleElement.append(peopleBlock);
    preCommentElement.append(commentsBlock);
    exerciseElement.append(prePeopleElement, preCommentElement);
})();

(function onePerson19() {
    let onePerson19 = false;
    const today = new Date();
    let yearToday = today.getFullYear();
    const answerPosition = 0;

    onePerson19 = people.some(person => (yearToday - person.year === 19))

    printAnswer(answerPosition, onePerson19);
})();

(function allPeople19() {
    let allPeople19 = false;
    const today = new Date();
    let yearToday = today.getFullYear();
    const answerPosition = 1;

    allPeople19 = people.every(person => (yearToday - person.year === 19))

    printAnswer(answerPosition, allPeople19);
})();

(function findTheComment() {
    const booleanAnswer = false;
    const commentId = 823423;
    const answerPosition = 2;
    let comment;
    
    
    comment = findComment(commentId);
    printAnswer(answerPosition, comment, booleanAnswer);
})();

function findComment(commentId, indexResponse = false) {
    let commentFound;

    if (indexResponse) {
        commentFound = comments.findIndex(comment => comment.id === commentId);
    } else {
        commentFound = comments.find(comment => comment.id === commentId);
    }

    return commentFound;
};

function deleteComment(commentId, element) {
    const indexResponse = true;
    let commentIndex;
    const answerPosition = 3;
    const booleanAnswer = false;

    commentIndex = findComment(commentId, indexResponse);
    comments.splice(commentIndex, 1);
    printAnswer(answerPosition, comments, booleanAnswer);
    hideButton(element);
}


function printAnswer(position, answer, booleanAnswer = true) {
    let answerText;

    if (booleanAnswer) {
        answerText = document.createTextNode(answer.toString());
    } else {
        answerText = document.createTextNode(JSON.stringify(answer));
    }
    answerBlocks[position].append(answerText);
}

function hideButton(element) {
    element.setAttribute('class', disabledButtonClass);
}