'use strict';
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 way to create default value
  //numPassengers = numPassengers || 1; //if numPassenger is falthy value -> 1
  //price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); //->{flightNum: 'LH123', numPassengers: 1, price: 199}
createBooking('LH123', 2); //{flightNum: 'LH123', numPassengers: 2, price: 398}
//way to skipp the parametr
createBooking('LH123', undefined, 5); //{flightNum: 'LH123', numPassengers: 1, price: 5}

*/

/*

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schemedtman',
  passport: 2876975657,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 2876975657) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight); //still the same, because flightNum is another variable-> LH234
console.log(jonas); //changed, because passenger it is just a reference to an object jonas
//-> {name: 'Mr. Jonas Schemedtman', passport: 2876975657}

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() + 100000000);
};

newPassport(jonas); //change passport number
checkIn(flight, jonas); //return 'Wrong password' because password was changed

*/

/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase(); //replace all g to ''
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' '); //destructuring
  console.log(others); //->(3) ['is', 'the', 'best!']
  return [first.toUpperCase(), ...others].join(' '); //join to one array
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`); //->Original string: JavaScript is the best!
  //calling another function
  console.log(`Transformed string: ${fn(str)}`); //->Transformed string: JAVASCRIPT is the best!

  console.log(`Transformed by ${fn.name}`); //->Transformed by upperFirstWord
};

transformer('JavaScript is the best!', upperFirstWord);
//we are not calling the function "upperFirstWord",
//we are only passing it in and "trasformer" function call it
transformer('JavaScript is the best!', oneWord); //->
/*
->:
Original string: JavaScript is the best!
script.js:75 Transformed string: javascriptisthebest!
script.js:77 Transformed by oneWord
*/
/*
//JS uses callbacks all the time
const high5 = function () {
  console.log('👍');
};
document.body.addEventListener('click', high5);
//addEventListener -> higher-order function
//high5 - callback function

['Jonas', 'Martha', 'Adam'].forEach(high5); //for each call function high5

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//stored greet function to the variable greeterHey
const greeterHey = greet('Hey');
greeterHey('Jonas'); //call function with "name" -> Hey Jonas

//all in one line
greet('Hello')('Jonas'); //->Hello Jonas

//The same greet function using Arrow function
const arrowGreet = arrowGreeting => arrowName =>
  console.log(`${arrowGreeting} ${arrowName}`);

arrowGreet('Hi')('Deadpool'); //->Hi Deadpool


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function() {}
  book(flightNum, name) {
    //new function
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    //add new values to an array
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann'); //->Jonas Schmedtmann booked a seat on Lufthansa flight LH239
console.log(lufthansa);

//new object must have the same format as original object
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //stored function to a new variable

//book it is JUST copy of a FUNCTION -> it doesn't understand "this" keyword from lufthansa.book
//book(23, 'Sarah Willams'); //Does NOT work

//solution:create a value for "this" keyword
//this = eurowings (bookings array inside eurowings object)
book.call(eurowings, 23, 'Sarah Willams'); //->Sarah Willams booked a seat on Eurowings flight EW23
book.call(lufthansa, 34, 'Merry Poipins'); //->Merry Poipins booked a seat on Lufthansa flight LH34

const swiss = {
  airline: 'Swiss Air',
  iataCode: 'LX',
  bookings: [],
};

//Apply method
// It take elements from an array and put it into the function
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); //->George Cooper booked a seat on Swiss Air flight LX583
console.log(swiss); //->{airline: 'Swiss Air', iataCode: 'LX', bookings: Array(1)}

//same as book.apply
book.call(swiss, ...flightData); //->George Cooper booked a seat on Swiss Air flight LX583

///////////////////////
//Bind method
//Bind does not immediately call the function, instead it returns a new function
//where the "this" keyword is bound...it set the value with we put into the bind

//book.call(eurowings, 23, 'Sarah Willams');
//not call the book function, instead create a new function where the "this" keyword
//will also set to eurowings
//instead of using call all the time, we can use bind once
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Willams'); //->Steven Willams booked a seat on Eurowings flight EW23
//just for fly 23
const bookEW23 = book.bind(eurowings, 23);
//now function "book", just need the name
bookEW23('Jonas Schmedt'); //Jonas Schmedt booked a seat on Eurowings flight EW23

//bind method when we using object together with EventListeners
lufthansa.planes = 300; //new variable
lufthansa.buyPlain = function () {
  console.log(this); //without bind: -> <button class="buy">Buy new plane</button>
  //with bind: -> return object lufthansa
  this.planes++; //buy new plain clicking the button
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlain.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //->220

const addVAT = addTax.bind(null, 0.23); //we have not got this keyword, so we use null
console.log(addVAT(100)); //->123

//same example with higher-order function
const addTax2 = function (rate2) {
  return function (value2) {
    return value2 + value2 * rate2;
  };
};
const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));

*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  //This generates [0, 0, 0, 0]. More in the next section :)
  answers: new Array(4).fill(0),
  //1. Display a prompt with a question (poll.question) and answers (poll.options)
  registerNewAnswer() {
    let propmtText = this.question;
    for (const o of this.options) {
      propmtText += `\n ${o}`;
    }
    let answer = Number(prompt(propmtText)); //generate prompt and get the answer
    //1.2. Based on the input number, update the answers array.
    //If the option is 3, increase the value at position 3 by 1. [0,0,0,1]
    //Check if input number make sense
    if (answer >= 0 && answer < poll.answers.length) {
      this.answers[answer]++;
    } else {
      alert('Incorrect answer! :( Answer must be a number from 0 to 3');
    }
    this.displayResults('string');
    return propmtText;
  },
  //3. Display results in array or srting
  displayResults(type = 'array') {
    //default = string
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results ${this.answers.join(' , ')}`);
    } else {
      console.log('Type must be string or array');
    }
  },
};

//2. Call method whenever the user clicks the "Answer poll" button
document.querySelector('.poll').addEventListener('click', function () {
  poll.registerNewAnswer();
});

//4. Use "displayResults" to display this two arrays:
//[5, 2, 3];
//[1, 5, 3, 9, 6, 1];

//use call method...create a new object and set new answers
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

*/
/*
//IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
//runOnce();

//IIFE
(function () {
  console.log('This will never run again');
})(); //will be executed..()call it immediately

//way 2
(() => console.log('This will never run again'))();
*/

/*
//CLOSURES
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

//1.create a function booker that exist in global scope
//2.when you call booker -> function secureBooking gone from call stack
//3.booker still have access to the variables in secureBooking!!!
//4.booker remember the variables from the birth of function secureBooking
//5.that exactly what the closure does
const booker = secureBooking(); //save pessenger count

//function increase the passenger value with the execution of booker();
//however this variable not in current scope -> JS immediately look to the closure and try to found variable there
//after 1 calling passenger = 1 -> execution context gone of the stack
//closure still attached to the function and the value is still 1
//execute the function and increase the passenger
booker(); //->1 passenger
booker(); //->2 passenger
booker(); //->3 passenger

//Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 50;
  f = function () {
    console.log(b * 2);
  };
};

g(); //->nothing
//g finish execution, but f remember that a = 23
f(); //->46
console.dir(f); //closure: a = 23
//
h();
f(); //f was re-assigned by h - it is differen function ->100
console.dir(f); //closure: b = 50

//Example 2 - Timer
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; //group usually is 3
  //this function will be executed after wait * 1000 milleseconds
  setTimeout(function () {
    //this function will be executed comletely independetly from the boardPassengers function,
    //but still be able to use all variables from environment in which it was created (n, perGroup)
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  //will be executed immediately
  console.log(`Will start boarding in ${wait} seconds`);
};

//Closure have priority of scope chain
const perGroup = 1000; //not use it, it is in global scope, but closure has priority
boardPassengers(180, 3);

*/

//Challenge 2
//At the end of IIFE attach an event listener that changes the color of h1 element
//each time the BODY element is clicked. Do NOT select the h1 element again
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
//How does it work? How is function has access to header?
//new function has an access and remember all values at the time of birth,
//because it was created from the function which contain 'header'
//and it just wait for an action 'click'
