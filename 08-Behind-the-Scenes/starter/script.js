'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); //return Jonas -> parent scope of calcAge() is global scope

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`; //because calcAge() is parent scope and firstName in global scope

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Steven'; //scope chain firstly looking the variable in current scope, so first name return 'Steven'
      const str = `You are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      output = 'NEW OUTPUT'; // define new value to varible, output is in the same scope
    }
    //console.log(str); //not available
    console.log(millenial); //ok -> function scope, var variable not care about blocks
    //add(2, 3); //nok -> we can use function only in block (if), but if you turn off 'strict mode' it will be available
  }
  //console.log(output); //return NEW OUTPUT
  printAge();
  return age;
}

const firstName = 'Jonas';
console.log(firstName); //return Jonas, not Steven (only in block)
calcAge(1991);


//Variables
console.log(me); //undefined
console.log(job); //error (cannot access before initialization)
console.log(year); //error (cannot access before initialization)

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

//Fuctions
console.log(addDecl(2, 4)); //6
console.log(addExpr(2, 4)); //error (cannot access before initialization)
console.log(addArrow(2, 4)); //error (cannot access before initialization)

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;


if (!numProducts) deleteShoppingCart(); //return all products deleted, because of hosting...numProducts = undefined -> not falsy value

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}

//Example 2
var x = 1;
let y = 2;
const z = 3;

//in window you can check created properties (type window in console)
//in this case only var will be have properties in window

console.log(x === window.x); //check if x is a property of window object -> true
console.log(y === window.y); // -> false
console.log(z === window.z); // -> false



console.log(this); //return window properties

const calcAge = function (birthYear) {
  console.log(2037 - birthYear); //->OK
  console.log(this); //->undefined -> has own function this keyword
};
calcAge(1991); //46

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear); //->OK
  console.log(this); //->window -> use this of it parent scope
};
calcAgeArrow(1981); //56

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log('jonas ' + (2022 - this.year));
  },
};
jonas.calcAge(); //->object:{year:1991, calcAge:f}

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
console.log('-----------------');
matilda.calcAge(); //as a matilda = jonas, this method return 5 (2022 - 2017)


//var firsName = 'Matilda'; //create properties in the global object
//const firsName = 'Matilda2';

const jonas = {
  //it is not block -> just object
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); //window object
    console.log('jonas ' + (2022 - this.year));

    //Solution 1
    // const self = this; //to solve undefined this in the next function
    // const isMillenial = function () {
    //   //console.log(this); //undefined -> because inside of regular function
    //   //console.log(this.year >= 1981 && this.year <= 1996);

    //   //Now it will work, because self out of regular function
    //   console.log(self); //window object
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    //Solution 2

    const isMillenial = () => {
      console.log(this); //use this keyword from parent scope ('Jonas')
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firsName}`), //parent scope = global scope
};

//!!!never use an arrow function as a method
//if you change greet arrow function to normal regular function, jonas.greet() return "Jonas"
jonas.greet(); //-> Hey undefined, if "var firstName" exeist in global global scope -> return it value

jonas.calcAge();

//Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5); //return Arguments(2) [2,5]
addExpr(2, 5, 8, 12); //return Arguments(2) [2,5,8,12]

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b; //if we have more than one lines of code, we need "return"
};

addArrow(2, 5); //return "Arguments is not defined" -> keyword arguments works only in regular function




//Primitive types
let lastName = 'Willams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); //->Davis Willams

//Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Willams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis'; //change lastName in object jessica too
console.log('Before marrige', jessica);
console.log('Before marrige', marriedJessica);



//Copying objects

//Deep copy -> copy everything from the object -> need external library -> later in the course
//Object.assign copy only first level object properties, if you have f.e. array in object it doesn't work,
//properties of second level will be the same in jessica2 and jessicaCopy2
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Willams',
  age: 27,
  family: ['Alice', 'Bob'],
};

//merge two obects and return the new one
const jessicaCopy2 = Object.assign({}, jessica2);
jessicaCopy2.lastName = 'Davis'; //change only in jessicaCopy
jessicaCopy2.family.push('Mary'); //second level -> add to both jessica2 and jessicaCopy2
console.log('Before marrige', jessica2); //lasName: 'Willams', family: Array(3)
console.log('After marrige', jessicaCopy2); //lasName: 'Davis', family: Array(3)


*/
