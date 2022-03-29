const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = [
    'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
    'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
    'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
    'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
    'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];

function printResults(results, hasObjsInside) {
    let targetTitle = document.getElementById('answer-title');
    let targetBody = document.getElementById('answer-body');

    targetTitle.innerHTML = printTitle(results[0]);
    targetBody.innerHTML = printBody(results[1], hasObjsInside);
    hljs.highlightAll();
}

function printTitle(exerciseNum) {
    let title = undefined;

    switch (exerciseNum) {
        case 1:
            title = '1. Filter the list of inventors for those who were born in the 1500\'s.'
            break;
        case 2:
            title = '2. Give us an array of the inventors first and last names.'
            break;
        case 3:
            title = '3. Sort the inventors by birthdate, oldest to youngest.'
        break;
        case 4:
            title = '4. How many years did all the inventors live all together?.'
            break;
        case 5:
            title = '5. Sort the inventors by years lived.'
            break;
        case 6:
            title = '6. create a list of Boulevards in Paris that contain \'de\' anywhere in the name https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris'
            break;
        case 7:
            title = '7. Sort the people alphabetically by last name.'
            break;
        case 8:
            title = `Sum up the instances of each of these ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];`
            break;
        default:
            title = 'no title';
            break;
    }

    return title;
}

function printBody(results, hasObjsInside) {
    let formattedResult = undefined;
    
    if (hasObjsInside) {
        formattedResult = prepareArrayWithObjs(results);
    } else {
        formattedResult = prepareArray(results);
    }
    
    let body = `<pre><code class="language-javascript">${formattedResult}</code></pre>`

    return body;
}

function prepareArrayWithObjs(results) {
    let preparedArray = `[\n `;

    results.forEach((resultObj) => {
        preparedArray += "{";
        for (let property in resultObj) {
            if (typeof(resultObj[property]) == 'string') {
                preparedArray += `${property}: "${resultObj[property]}", `
            } else {
                preparedArray += `${property}: ${resultObj[property]}, `
            }
        }
        preparedArray = preparedArray.replace(/[,]\s$/, '},\n ')
    })

    preparedArray = preparedArray.replace(/[,]\n\s$/,"\n]");

    return preparedArray;
}

function prepareArray(results) {
    let preparedArray = `[\n `;

    results.forEach((resultItem) => {
        preparedArray += `"${resultItem}",\n ` 
    })

    preparedArray = preparedArray.replace(/[,]\n\s$/,"\n]");

    return preparedArray;
}

// 1. Filter the list of inventors for those who were born in the 1500's
function filterEx1() {
    let filtered = [
        1,
        inventors.filter((inventor) => inventor.year >= 1500 && inventor.year < 1600)
    ];

    printResults(filtered, true);
}

// 2. Give us an array of the inventors first and last names
function mappingEx2() {

    let filtered = [
        2,
        inventors.map((inventor) => `${inventor.first} ${inventor.last}`)
    ]

    printResults(filtered, false);
}

// 3. Sort the inventors by birthdate, oldest to youngest
function sortingEx3() {
    let sorted = [
        3,
        inventors.sort((a, b) => b.year - a.year)
    ]
    printResults(sorted, true);
}

// 4. How many years did all the inventors live all together?
function reducingEx4() {
    let targetTitle = document.getElementById('answer-title');
    let targetBody = document.getElementById('answer-body');
    let arrInventorsYearsLived = createArrInventorsYearsLived();
    let accYearsLived = arrInventorsYearsLived.reduce((acc, curr) => {return acc + curr.yearsLived}, 0);

    targetTitle.innerHTML = printTitle(4);
    targetBody.innerHTML = `Inventors lived ${accYearsLived} years all together`;
}

function createArrInventorsYearsLived() {
    let inventorsYearsLived = inventors.map((inventor) => {
        let inventorObj = {
            first: inventor.first, 
            last: inventor.last, 
            year: inventor.year, 
            passed: inventor.passed,
            yearsLived: inventor.passed - inventor.year 
        }
        return inventorObj;
    })

    return inventorsYearsLived;
}

// 5. Sort the inventors by years lived
function sortingEx5() {
    let arrInventorsYearsLived = createArrInventorsYearsLived();
    let sortedArrInvestorsYearsLived = arrInventorsYearsLived.sort((a, b) => b.yearsLived - a.yearsLived);
    let results = [
        5,
        inventorsToOriginalFormat(sortedArrInvestorsYearsLived) 
    ]
    printResults(results, true);
}

function inventorsToOriginalFormat(inventorsChangedFormat) {
    let inventorsOriginalFormat = inventorsChangedFormat.map((inventor) => {
        let inventorObj = {
            first: inventor.first, 
            last: inventor.last, 
            year: inventor.year, 
            passed: inventor.passed,
        }
        return inventorObj;
    })

    return inventorsOriginalFormat;
}

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
async function filteringEx6() {
    let searchString = 'de';
    let arrBoulevards = await getBoulevards();
    let filteredArrBoulevards = arrBoulevards.filter((boulevard) => boulevard.title.includes(searchString));
    printResults([6, filteredArrBoulevards], true);
}

async function getBoulevards() {
    try {
        let request = await fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=categorymembers&indexpageids=1&cmtitle=Category%3ABoulevards_in_Paris&cmlimit=40');
        let data = await request.json();
        return data.query.categorymembers;
    } catch (error) {
        console.error(error);
    }
} 

// 7. sort Exercise
    // Sort the people alphabetically by last name

    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

