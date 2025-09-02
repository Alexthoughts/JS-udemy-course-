/*
let js = "amazing";
if (js === "amazing") alert("It's amazing");

console.log(40 + 5 * 2);

//comment

let javascript = true;

console.log(typeof javascript)

javascript = "YES";
console.log(typeof javascript)
console.log(javascript)


const inputYear = '1991';
console.log(inputYear + 18);  //return 199118, add 18 like a string
console.log(Number(inputYear) + 18); //convert string to a number
console.log(Number('jonas')); //return Nan - not a number

console.log(String(23)); //number to string

//type coercion
console.log('I am ' + 23 + ' years old'); //+ operator convert number to string
console.log('23' - '10' - 3); //- convert string to number (return 10)
console.log('23' * '2') //* and / convert string to number 


//5 falsy values 0, '', undefined, null, Nan
console.log(Boolean(0));            //false
console.log(Boolean(undefined));    //false   
console.log(Boolean('jonas'));      //true  
console.log(Boolean({}));           //true

const money = 0;
if (money) { //convert to boolean -> 0 it is falsy value
    console.log('Do not spend it all')
} else {
    console.log('You should have a job');
}


const age = 18;
if (age === 18) console.log('You are adult :D');  //exactly 18, must be the same type of variables
// "==" - loose equality operator, "===" - strict 
// '18' == 18 -> true
// '18' === 18 -> false. because of different type of variables
// !!! for clear code, use strict operator !!!

//prompt -> small window on the page, where you can input a string
const favourite = prompt("What's your favourite number"); //add Number() before "prompt", to change type
console.log(typeof favourite); //string

if (favourite == 23) { //if you write "===" it doesn't work, because string != number
    console.log('Cool! your favourit number 23')
} else if (favourite == 88) {
    console.log("number 7")
} else {
    console.log("number not 7 or 23")
}

if (favourite !== 23) console.log('Why not 23');


const hasDriversLicense = true;
const hasGoodVision = false;

console.log(hasDriversLicense && hasGoodVision); //-> false
console.log(hasDriversLicense || hasGoodVision); //-> true
console.log(!hasDriversLicense); //-> false

const shouldDrive = hasDriversLicense && hasGoodVision;
if (shouldDrive) {
    console.log("Sarah is able to drive");
} else {
    console.log("Someone else should drive");
}


const day = 'wednesday';

switch (day) {
    case 'monday':
        console.log('Monday: Plan course structure');
        break;
    case 'tuesday':
        console.log('Tuesday: prepare videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('The same job on wednesday and thursday');
        break;
    default:
        console.log('Not a valid day');  //using like "else" in if-else  
}



const age = 18;
age >= 18 ? console.log('Execute this, if age >= 18') :
    console.log("after :, it is like else in else-if statement");

const drink = age >= 18 ? 'wine' : 'water';
console.log(drink);

console.log(`I would like to drink ${age >= 18 ? 'wine' : 'water'}`);
*/