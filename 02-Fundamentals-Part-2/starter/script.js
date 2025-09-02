/*
'use strict'; //activating strict mode
// strict mode: forbids us to do certain things and creates visible errors on console

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log("I can drive");



function logger() {
    console.log('My name is Jonas');
}
// calling / running // invoking functions
logger(); //function will be execuded

function fruitProcessors(apples, oranges) { //function with defined parametrs
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`
    return juice; //juice you can use later in the code
}

//you need to create a variable (appleJuice) to return and save juice variable
const appleJuice = fruitProcessors(5, 0); //arguments: 5 - apples, 0 - oranges
console.log(appleJuice);
console.log(fruitProcessors(5, 0)) //will be work too, you can see juice var in console

const appleOrangeJuice = fruitProcessors(2, 4);
console.log(appleOrangeJuice);



//function declaration -> we can call before it defined in the code
const age1 = calcAge1(1997); // call before function -> it is work!
function calcAge1(birthYear) {
    return 2022 - birthYear;
}



//function expression (expressions produce values). We just save produced value to a variable
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}
const age2 = calcAge2(1997); //appears error if you call before function

console.log(age1, age2);


const calcAge3 = birthYear => 2022 - birthYear; //after => we are writing, what we want to return
const age = calcAge3(1997);
console.log(age);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`; //if we have more than 1 lines, we need to add return
}

console.log(yearsUntilRetirement(1997, 'Alex'));
console.log(yearsUntilRetirement(1972, 'Jonas'));


function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessors(apples, oranges) { //function with defined parametrs
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    return `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces.`;
}

console.log(fruitProcessors(4, 2));



const teamDolphins = 'Dolphins';
const teamKoalas = 'Koalas';

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
let avgDolphins = calcAverage(44, 23, 71).toFixed(2);
let avgKoalas = calcAverage(30, 54, 49).toFixed(2);
function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins > avgKoalas) {
        return `Dolphins win (${avgDolphins} vs. ${avgKoalas})`;
    } else if (avgKoalas > avgDolphins) {
        return `Koalas win (${avgKoalas} vs ${avgDolphins})`;
    } else {
        return 'Draw!'
    }
}

console.log(checkWinner(avgDolphins, avgKoalas));


const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
console.log(friends[0]); //first element -> Michael
console.log(friends.length); //amount of element
console.log(friends[friends.length - 1]); //last element -> Peter

friends[2] = 'Jay'; //replace Peter to Jay

const years = new Array(1997, 1998, 1999); //SECOND WAY TO WRITE ARRAY

const jonas = ['Jonas', 'Alex', 2022 - 1997, 'teacher', 1, friends]; //in one aaray you can add numbers, arrays and words
console.log(jonas);


function calcAge1(birthYear) {
    return 2022 - birthYear;
}
const birhYear = [1971, 1972, 1997];
const years = [];
for (let i = 0; i < birhYear.length; i++) {
    const birth = birhYear[i];
    years.push(calcAge1(birth));
}
console.log(years);


const friends = ['Michael', 'Steven', 'Peter'];
friends.push('Alex'); //add element to the end of an array
friends.unshift('Bob'); //add element at the start of an array
friends.pop(); //remove the last element of an array
friends.shift() //remove the first element and returned it

console.log(friends.indexOf('Michael')); //return the index of element
console.log(friends.includes('Michael')); //check if array includes the element and return true/false 
if (friends.includes('Michael')) {
    console.log('You have a friend called Michael.')
}

console.log(friends);



function calcTip(billValue) {
    if (billValue > 50 && billValue < 300) {
        return billValue * 0.15

    } else {
        return billValue * 0.2
    }
}
console.log(calcTip(100))

const bills = [100, 200, 300];
const tips = [];
const totalValue = [];

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totalValue.push(bills[i] + tips[i]);
    console.log(`Total amount ${i + 1}:
    Bill = ${bills[i]}
    Tips = ${tips[i]}
    Sum = ${totalValue[i]}`)
}
console.log(tips);
console.log(totalValue);



//Simplest way of creating object

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedt',
    age: 2022 - 1997,
    job: 'teacher',
    friends: ['Michael', 'Steven', 'Peter']
};

console.log(jonas);
console.log(jonas.lastName); //dot notation -> return 'Schmedt' 
console.log(jonas['lastName']); //bracket notation -> return 'Schmedt', other way

const nameKey = 'Name';
console.log(jonas['first' + nameKey]); //return Jonas (firstName)

const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lasName, age, job and friends');
console.log(jonas.interestedIn); //return undefined -> object jonas not has property interestedIn

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);// return -> Jonas/teacher/...
} else {
    console.log('Wrong request');
}

jonas.location = 'Portugal'; //add value to an object jonas

console.log(jonas.firstName + ' has ' + jonas.friends.length + ' friends and his best friend is called ' + jonas.friends[0]);



const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedt',
    birthYear: 1997,
    job: 'teacher',
    friends: ['Michael', 'Steven', 'Peter'],
    hasDriversLicense: false,

    calcAge: function () {
        //console.log(this); //-> return jonas object
        this.age = 2022 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-years old ${jonas.job}
                    and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's licence`
    }
};

console.log(jonas.getSummary());



for (let rep = 1; rep <= 1; rep++) {
    console.log(`number ${rep}`)
}


const jonasArray = [
    'Jonas',
    'Schmedt',
    2022 - 1997,
    'teacher',
    ['Michael', 'Steven', 'Peter'],
    true
];
console.log(jonasArray);

const types = [];

for (let i = 0; i <= jonasArray.length; i++) {
    //console.log(jonasArray[i], typeof jonasArray[i]);
    types.push(typeof jonasArray[i]);
}
//console.log(types);


const years = [1991, 2007, 1971, 1970];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2022 - years[i]);
}
//console.log(ages);

console.log("-----ONLY STRINGS-----")
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] !== 'string') continue;
    console.log(jonasArray[i], typeof jonasArray[i]); //don't execute this if type not a string
}

console.log("-----BREAK WITH A NUMBER-----")
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] === 'number') break;
    console.log(jonasArray[i], typeof jonasArray[i]);
}



const jonasArray = [
    'Jonas',
    'Schmedt',
    2022 - 1997,
    'teacher',
    ['Michael', 'Steven', 'Peter'],
    true
];

//Looping backwards
for (let i = jonasArray.length; i >= 0; i--) {
    console.log(jonasArray[i]);
}

//Loop in Loop
for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`------Starting exercise ${exercise}-------`);
    for (let rep = 1; rep < 6; rep++) {
        console.log(`repetition ${rep}`)
    }
}



for (let rep = 1; rep < 6; rep++) {
    console.log(`For Loop: repetition ${rep}`)
}

let rep = 1;
while (rep < 6) {
    console.log(`While Loop: repetition ${rep}`)
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) { //start if dice !== 6 and will be continued until dice !== 6
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop finished');
}



const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calcTip(billValue) {
    if (billValue > 50 && billValue < 300) {
        return billValue * 0.15

    } else {
        return billValue * 0.2;
    }
}

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(calcTip(bills[i]) + bills[i]);
}
console.log('----BILLS----')
console.log(bills);
console.log('----TIPS----')
console.log(tips);
console.log('----TOTALS----')
console.log(totals);

calcAverage = function (arr) {
    let sum = 0;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return (sum / (arr.length + 1)).toFixed(2);
}

console.log(calcAverage(tips));

*/

