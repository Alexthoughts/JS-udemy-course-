'use strict';

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
//Example
//😡Delayed Departure from FAD to TXL (11h25)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';'); //destructuring to get variables

  const output = `${type.startsWith('_Delayed') ? '😡' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(44);
  console.log(output);
}

/*  
const weekDays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekDays1[0]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, //open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enchanced object literals
  openingHours,

  //take an elements from an array using index
  //ES5 -> order: function()
  //ES6-> order ()
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(`Order received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
    will be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value; //get text value
  const lowerCaseText = text.toLowerCase().split('\n'); //low case text splited to an array
  let i = 1;
  for (const t of lowerCaseText) {
    if (t.includes('_')) {
      const slicedSecondPart = t.slice(t.indexOf('_') + 1); //slice part after "_"
      const secondPart =
        slicedSecondPart[0].toUpperCase() + slicedSecondPart.slice(1); //second part with first big letter
      const firstPart = t.slice(0, t.indexOf('_')); //firstPart
      const finalCamelCase = `${firstPart}${secondPart}`.trim(); //text with deleted white-spaces
      const fullText = finalCamelCase.padEnd(30, ' ') + '❤️'.repeat(i);
      console.log(fullText);
      i++;
    } else {
      console.log('Text must contain "_"');
    }
  }
});
/*
Test Data
underscore_case
 first_name
Some_Variable
  calculate_AGE
  dkfdkfdkfjdkfj
delayed_departure   
*/

/*

//Strings
const airline = 'TAP Air Portugal';

//Part 3
//split string to an array
console.log('a+very+nice+string'.split('+')); //-> (4) ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); //->(2) ['Jonas', 'Schmedtmann']

//split using destructuring
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName, lastName); //->Jonas Schmedtmann

//join
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); //->Mr. Jonas SCHMEDTMANN

const capitalizeName = function (name) {
  const names = name.split(' '); //split name by ' ' -> array;
  const namesUpper = []; //new array
  for (const n of names) {
    //upper case to first letter to each word in array and then add all words to one array
    //v1:
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    //v2:
    //namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    //->(4) ['Jessica', 'Ann', 'Smith', 'Davis']
  }
  console.log(namesUpper.join(' ')); //join words in array -> Jessica Ann Smith Davis
};
capitalizeName('jessica ann smith davis'); //->Jessica Ann Smith Davis
capitalizeName('jonas schmedtman'); //->Jonas Schmedtman

//Padding
const message = 'Go to gate 23';
console.log(message.length); //13
//padStart add text to the START of the string if it shorter than required
console.log(message.padStart(15, '+')); //->++Go to gate 23  (string.length = 13, add '++')
//padEnd add text to the END of the string if it shorter than required
console.log(message.padStart(15, '+').padEnd(20, '-')); //->++Go to gate 23-----

//Example: mask credit card
const maskCreditCard = function (number) {
  const str = number + ''; //string
  const last = str.slice(-4); //last 4 numbers
  return last.padStart(str.length, '*');
  //str.length = 9,last.length = 4 -> so, padStart add 5 "*", to the begining of 'last'
};
console.log(maskCreditCard(486550004327));
console.log(maskCreditCard('486550004327'));

//Example 2
const maskCC = function (number) {
  const str1 = number + '';
  const last = str1.slice(-4); //last 4 numbers
  const first = str1.slice(0, 4); //first 4 numbers
  return [first, last.padStart(str1.length - first.length, '*')].join('');
};
console.log(maskCC(486550004327)); //->4865****4327
console.log(maskCC('486550004327')); //->4865****4327

//Repeating
const message2 = 'All depatures delayed... ';
console.log(message2.repeat(3)); //->All depatures delayed... All depatures delayed... All depatures delayed...

/*
//Part 2
console.log(airline.toLowerCase()); //->tap air portugal
console.log('jonas'.toUpperCase()); //->JONAS

//Fix capitalization in name
const passenger = 'jOnAS'; //Jonas
const passengerLower = passenger.toLowerCase();
//'j'.toUpperCase + onas
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); //Jonas

//Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io \n';
//convert to lowerCase
const lowerEmail = loginEmail.toLowerCase();
//delete white-space
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail); //->hello@jonas.io

//normalized in one line
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail); //->hello@jonas.io
console.log(email === normalizedEmail); //true

//Replacing
const priceEU = '288,97€';
const priceUS = priceEU.replace('€', '$').replace(',', '.');
console.log(priceUS); //->288.97$

const announcement = 'Passenger go to door 23. Boarding door 23';
console.log(announcement.replaceAll('door', 'gate')); //replace door on both places
//replace using regular expression (g=global -> replace everywere)
console.log(announcement.replace(/door/g, 'gate'));

//Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320')); //->true
console.log(plane.startsWith('Air')); //->true

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of new Airbus family');
}

//Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop, some Food and pocket Knife');
checkBaggage('Socks and camera');
/*
Part1
const plane = 'A320';

console.log(plane[0]); //->A
console.log(plane[1]); //->3
console.log(plane[2]); //->2
console.log('B737'[0]); //->B

console.log(airline.length); //->16
console.log('B737'.length); //->4

//Methods
console.log(airline.indexOf('r')); //->6 -> position of first 'r' in array
console.log(airline.lastIndexOf('r')); //->10 -> position of last 'r' in array
console.log(airline.indexOf('Portugal')); //->8 ->where 'Portugal' begin. !Case sensetive

//Slicing
console.log(airline.slice(4)); //-> Air Portugal -> Position at which the extraction will start
console.log(airline.slice(4, 7)); //-> Air -> start at position 4 and end 7
console.log(airline.slice(0, airline.indexOf(' '))); //->TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //->Portugal (+1 to remove space)
console.log(airline.slice(-2)); //->al ->last 2 letters
console.log(airline.slice(1, -1)); //->AP Air Portuga-> start from 1 and cut the last letter

//Practise (receive airline seat and log if it is the middle seat)
const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  //check if string contain A or E
  const s = seat.slice(-1);
  const middle = s === 'B' || s === 'E' ? 'middle seat' : 'not a middle seat';
  return console.log(middle);
};
checkMiddleSeat('11B'); //->middle seat
checkMiddleSeat('23C'); //-> not a middle seat
checkMiddleSeat('3E'); //->middle seat

//String will be converted to an object behind the scenes and then we can use methods with primitive type String.
console.log(new String('jonas')); //->String {'jonas'}
console.log(typeof new String('jonas')); //object
console.log(typeof new String('jonas').slice(1)); //->string (converted bak to string)
/*

//Challenge 3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. Create an array of game events without duplicate
//Convert map to array and get the values
const events = [...new Set(gameEvents.values())]; //"[]"-> to create an array
console.log(events);

//2.Remove yellow card at 64 minute
gameEvents.delete(64);
console.log(gameEvents);

//3.Print to the console: An event happened, on average, every 9 minutes
const timeEvents = [...gameEvents.keys()]; //creat an array
console.log(
  `An event happened, on average, every ${90 / timeEvents.length} minutes`
);

//4.Loop over the events and log to console, if event was in 1 or 2 half of the game
//Ex. [FIRST HALF] 17: ⚽ GOAL
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${half} ${key}: ${event}`);
}
/*
//MAP - part 2
//Map with different array
const question = new Map([
  ['question', 'What is the best programm language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct👍'],
  [false, 'Try again🙄'],
]);
console.log(question);

//Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer'));
//Compare answer with correct answer...question.get(true/false)
console.log(question.get(answer === question.get('correct')));

//////////
console.log('---------Convert object to map (array of arrays)------');
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries.openingHours);
////////
console.log('------Convert map to array-------');
console.log(...question);
console.log(...question.keys()); //->question 1 2 3 correct true false
/*
const rest = new Map();
rest.set('name', 'Classico Italiano'); //add new value, like 'add' in sets
rest.set(1, 'Firenze, Italy'); //number as a key
rest.set(2, 'Lisbon, Portugal');
console.log(rest); //->Map(3) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal'}

rest //calling this method returns updated map
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :)')
  .set(false, 'We are closed :(');
console.log(rest);
//->Map(8) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal', 'categories' => Array(4), 'open' => 11, …}
console.log(rest.get('name')); //->Classico Italiano
console.log(rest.get(true)); //->We are open :)

const time = 23;
console.log(rest.get(time >= rest.get('open') && time < rest.get('close'))); //rest.get(true/false)

console.log(rest.has('categories'));
rest.delete(2); //delete key 2
console.log(rest.size); //size of map

//BAD
rest.get([1, 2], 'Test'); //array as a key
console.log(rest.get([1, 2])); //->undefined, it is NOT work
//GOOD
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); //->Test

rest.set(document.querySelector('h1', 'Heading')); //web page locator
console.log(rest);

/*
//SET

const orderSet = new Set(['Pasta', 'Pizza', 'Pasta', 'Risotto']);
console.log(orderSet); //->Set(3) {'Pasta', 'Pizza', 'Risotto'}
console.log(new Set('Jonas')); //->Set(5) {'J', 'o', 'n', 'a', 's'}
console.log(orderSet.has('Bread')); //similar to include methods in array, -> false
orderSet.add('Garlic bread'); //add value to a set
orderSet.delete('Risotto'); //delete value from a set
//orderSet.clear();//delete all values from a set

for (const order of orderSet) console.log(order); //->Pasta, /n Pizza...

//Example
//Remove duplicate values from an array
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Waiter'];
const staffUnique = [...new Set(staff)]; //create unique array
console.log(staffUnique);
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Waiter']).size); //->3
console.log(new Set(staff).size); //->3
console.log(new Set('OleksiiNehoi').size); //how many different letters in name ->9

/*

//Property NAMES
const properties = Object.keys(openingHours);
console.log(properties); //array with values from openingHours ->(3) ['mon', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
  //console.log(day); //thu, /n fri, /n sat (object openingHours)
}
console.log(openStr); //->We are open on 3 days: mon, fri, sat,

//Property VALUES
// return values of the selected object
const values = Object.values(openingHours);
console.log(values);

//Entire object
// return objects of the selected object
const entries = Object.entries(openingHours);
console.log(entries);

//each object on the separate line
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we are open at ${open} and close at ${close}`);
  //->On mon we are open at 12 and close at 22
}
/*
//WITHOUT optional chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//WITH optional chaining
//only if "mon" exist (not null or undefined) will read the property "open"
//if not exist, then return "undefined"
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

//Example
//Where the restaurant opened in each of the day
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  //check if "open" exists, if not add "closed"
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//Methods
//Check if method exist
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

//Arrays
//Check if array is empty
const users = [{ name: 'jonas', email: 'hello@jonas.io' }];
//ES6
console.log(users[0]?.name ?? 'User array empty'); //->jonas
//ES5
if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
//each value of an array at the separate line
for (const item of menu) console.log(item); //->print each value from menu at the separate line.

//each element in the array
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`); //->1:Frocaccia, /n 2: Bruschetta...
}
/*
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Pizza',
  owner: 'Giovani Rossi',
};

//nullish (null or undefined) assignment operator (??=)
//rest1.numGuests = rest1.numGuests ?? 10;
//rest2.numGuests = rest2.numGuests ?? 10;
//the same
rest1.numGuests ??= 10;
rest1.numGuests ??= 10;

//AND assignment operator
//rest1.owner = rest1.owner && '<ANONYMOUS>'; //owner = undefined
//rest2.owner = rest2.owner && '<ANONYMOUS>';
//the same
rest1.owner &&= '<ANONYMOUS>'; //nothing happen
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1); //->{name: 'Capri', numGuests: 20}
console.log(rest2); //->{name: 'La Pizza', owner: '<ANONYMOUS>'}

/*
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //->10

//Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //->0

/*
//Use ANY data type, return ANY data type, short-circuiting
//if the first will be TRUTHY value,then the other will not be evaluated
console.log(3 || 'Jonas'); //->3
console.log('' || 'Jonas'); //-> Jonas
console.log(true || 0); //-> true
console.log(undefined || null); //-> null, both are falsy

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //->Hello -> first truthy

//if restaurant.numGuests exist, return numGuests, if doesn't exist, return 10
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); //->10

const guests2 = restaurant.numGuests || 10;
console.log(guests2); //->10

console.log('----------AND----------');
//if the first operand will be FALSY value,then the other will not be evaluated
console.log(0 && 'Jonas'); //->0
//if the first is truthy, then will be returned the last
console.log(7 && 'Jonas'); //->Jonas

console.log('Hello' && 23 && null && 'jonas'); //->null->first falsy value

//Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach'); //->mushrooms [spinach]
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); //->mushrooms [spinach]

/*
//1) Destructuring

//SPREAD, because on RIGHT side of "="
const arr = [1, 2, ...[3, 4]];

//REST, because on LEFT side of "="
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); //-> 1 2 Array(3)

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); //not include skip element-> Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays); //->{thu: {…}, fri: {…}}

//2) Functions
const add = function (...numbers) {
  //in"()"-> rest parametrs
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3); //->5
add(5, 3, 7, 2); //->17

const x = [23, 5, 7];
add(...x); //spread operator ->35

//Restaurant example
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); //->mushrooms ['onion', 'olives', 'spinach']

/*
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredients 3?'),
];
console.log(ingredients); //->(3) ['a', 'b', 'c']

restaurant.orderPasta(...ingredients); //->Pasta with a, b, c


//Objects
//add values to the object "restaurant"
const newRestaurant = { ...restaurant, founder: 'Guiseppe', founderIn: 1998 };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); //->Ristorante Roma
console.log(restaurant.name); //->Classico Italiano

const arr = [7, 8, 9];
//create new arr based on this array with new elements at the begining
//v1. - BAD
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); //->(5) [1, 2, 7, 8, 9]
//v2. - GOOD
//it is like taking values of existing array and write it manually to the new
const newArr = [1, 2, ...arr];
console.log(newArr); //->(5) [1, 2, 7, 8, 9]
console.log(...newArr); //->1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu); //->(4) ['Pizza', 'Pasta', 'Risotto', 'Gnocci']

//Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy); //->(3) ['Pizza', 'Pasta', 'Risotto']

//Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu); //->(7) ['Pizza', 'Pasta', 'Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); //->(7) ['J', 'o', 'n', 'a', 's', ' ', 'S.']

/*
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 3,
}); //->Order received Caprese Salad and Risotto
//will be delivered to Via del Sole, 21 at 22:30

restaurant.orderDelivery({
  address: 'Via del Sole, 22',
  starterIndex: 1,
}); //->Order received Bruschetta and Pizza
//will be delivered to Via del Sole, 22 at 20:00

//create 3 new variables and destruct the object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories); //-> Classico Italiano, object opening hours, categories

// creating variables with different names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags); //-> exactly the same as preivous (classco italiano,...)

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); //added default values to menu, because it didn't exist in object restaurant

//Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //don't forget about ()
console.log(a, b); //->23 7

//Nested objects
const { fri: friday } = openingHours;
console.log(friday); //-> {open: 11, close:23}

const {
  fri: { open, close },
} = openingHours;
console.log(open, close); //->11 23
/*
const [first, , second] = restaurant.categories; //skipp the second value in the array
console.log(first, second); //Italian Vegeterian

//---------------------------------------------

//Switching variables...How to take at first second element and then first
let [main, secondary] = restaurant.categories;
console.log(main, secondary);
//V1 - Bad!
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary); //Pizzeria Italian

//V2 - Good!
[main, secondary] = [secondary, main];
console.log(main, secondary); //Pizzeria Italian

//-------------------------------------------

//Found element in array using function and then destuct an array
const [starter, mainCourse] = restaurant.order(2, 0); //destructuring
console.log(starter, mainCourse); //->garlic Bread Pizza

//---------------------------------------------
//one array inside another
const nested = [2, 4, [5, 6]];
//How to get 2 and [5,6] from an array "nested"?
const [i, , j] = nested;
console.log(i, j); //->2 [5,6]

//all individuals values -> destucturing inside the distructuring
const [s, , [o, k]] = nested;
console.log(s, o, k); //2 5 6

//------------------------------------------------

//set default values to the variables when extracting them
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); //-> 8 9 1

*/

/*

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 0.33,
    x: 1.25,
    team2: 1.5,
  },
};
//Challenge 2
//1.Print each player from game.scored with the goal number
for (const [i, s] of game.scored.entries()) console.log(`Goal ${i + 1}: ${s}`);
//->Goal 1: Lewandowski->Goal 2: Gnarby...

//2.Use a loop to calculate the average odd from the object
const oddsValues = Object.values(game.odds);
let sum = 0;
let avg = 0;
for (const v of oddsValues) {
  sum += v;
  avg = sum / oddsValues.length;
}
console.log('avg odd = ' + avg.toFixed(2));

//3.Print the 3 odds in a nice formatted way (Odd of victory Bayern Munich 1.33)
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

//Bonus
//Create an object 'scores' with the names of the players who scored as properties,
//and the number of goals as the value
//{Gnabry:1, Hummels:1, Lewandowski:2}
console.log('----------------------BONUS-------------');
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

/*
//////////////////////////////////////////
//Challenge 1
//1. Players array for each team
const [players1, players2] = game.players;
console.log(players1, players2);

//2. First player in array = gk, others = field players
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3. One array with players of both teams
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4. Create array - start Bayern players with 3 subtitutes
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(playersFinal);

//5. Based on the game.odds (котировки на победу), create one variable for each odd
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//6. Function that receives an arbitrary number of player names (имена игроков)
//and prints each of them, along with the number of goals who were scored.
const printGoals = function (...playerNames1) {
  let playerNames = [...new Set(playerNames1)]; //just unique player names
  for (let i = 0; i < playerNames.length; i++) {
    let goals = 0;
    for (let p = 0; p < game.scored.length; p++) {
      if (playerNames[i] == game.scored[p]) goals += 1;
    }
    console.log(playerNames[i] + ' - ' + goals);
  }
};
//printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);
//7. Based on the odds print which team is more likely to win (without if/else)
//"&&" -> if the first is truthy, then will be returned the last
team1 < team2 && team1 < draw && console.log('Team 1 more likely to win');
team2 < team1 && team2 < draw && console.log('Team 2 more likely to win');
team1 > draw && team2 > draw && console.log('More likely will be the draw');

*/
