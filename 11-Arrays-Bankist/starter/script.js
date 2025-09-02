'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//get the transaction and display it
const displayMovements = function (movements, sort = false) {
  //depends of sort parametr we will sort or not (default = false)
  //when we click the sort button -> sort = true
  //empty the container before starting adding elements
  containerMovements.innerHTML = '';

  //Sort
  //We want just to display sorted array, not rewrite the original -> create copy
  //if sort = true -> sort an array, else -> just show movements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //template from html
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    //method insertAdjacentHTML to attach html to the page
    //1st argument = position at which attach the html
    //2nd argument = string containing the html that we want to insert
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//console.log(containerMovements.innerHTML); //-> created html

//CREATE USERNAME
const createUsernames = function (accs) {
  //take an array of accounts
  accs.forEach(function (acc) {
    //for each of the account create a new property username using owner name
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
    //['steven', 'thomas', 'willams'] and then ->
    //->create a string with the first letters of each word in array
  });
};
createUsernames(accounts); //->stw
//console.log(accounts);

//CALCULATE BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); //start with 0
  labelBalance.textContent = `${acc.balance}€`;
};

//Calculate summary
//calculate income
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0) //filter
    .reduce((acc, mov) => acc + mov, 0); //sum
  labelSumIn.textContent = `${incomes}€`; //show in app

  //calculate out
  const out = acc.movements
    .filter(mov => mov < 0) //filter
    .reduce((acc, mov) => acc + mov, 0); //sum
  labelSumOut.textContent = `${Math.abs(out)}€`; //show in app (remove"-")

  //interest rate depends on the account
  //pay interest only if the interest of transfer > 1€
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      //console.log(arr);
      return interest >= 1;
    })
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
};

//LOGIN
//Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form from submitting
  //get the value from the input and search it in object accounts
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount); //-> object with username from the input

  //check if the pin is correct
  //optional chaining:
  //thanks to "?" it read "pin" property only, if current account exist
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //dispalay UI and welcome message with 1 word of the whole name
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`; //->Welcome Back Jonas
    containerApp.style.opacity = 100; //change opacity in css

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = ' '; //"=" operator works from right to left
    //remove focus from pin field
    inputLoginPin.blur();
    //Show UI (balance, transactions)
    updateUI(currentAccount);
  }
});

//Implementing transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //without this, page will be reloaded after clicking
  const amount = Number(inputTransferAmount.value);
  //looking the account with the same username
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  //Checking if transfer amount < balance, amount > 0, receiver is not current acc
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount); //take money from account
    receiverAcc.movements.push(amount); //and money to receiver amount

    //Update UI
    updateUI(currentAccount);
  }
});

//REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//CLOSE ACCOUNT (findIndex method)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //find index of selected account
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1); //delete account form an array

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// CALL SORT
//create variable that check if array actually sorted
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(sorted);
  //sort after click the button if it not sorted and unsort if it sorted
  displayMovements(currentAccount.movements, !sorted); //sort = true/false (opposite of sorted)
  sorted = !sorted; //after click change sorted value to opposite
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE method -> return new array
//start extracting at position 2
console.log(arr.slice(2)); //-> [c, d, e]
console.log(arr.slice(2, 4)); //-> [c, d] -> not include 4
//if you choose negative start, it will start from the end of array
console.log(arr.slice(-2)); //last 2 elements -> [d, e]
//negative as the end parametr
console.log(arr.slice(0, -2)); //extract everything except last 2 -> [a, b, c]
console.log(arr.slice()); //copy the same array
console.log([...arr]); //copy the same array

//SPLICE -> change the original array
//use to delete elements in an array
console.log(arr.splice(2)); //->[c, d, e]
console.log(arr); //-> [a, b]
console.log(arr.splice(-1)); //delete the last element

//REVERSE (обратный)
//reverse the original array too
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //->[f, g, h, i, j]

//CONCAT
//concatanate two arrays
const letters = arr.concat(arr2);
console.log(letters); //['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); //concatanate using spread operator

//JOIN
console.log(arr.join('-')); //->a-b-c-d-e

*/
/*
//AT

const arr = [23, 11, 64];
console.log(arr[0]); //->23
console.log(arr.at(0)); //->23

//get the last element
console.log(arr[arr.length - 1]); //->64
console.log(arr.slice(-1)[0]); //get the copy of array with the last element
console.log(arr.at(-1)); //->64

//'at' also works at strings
console.log('jonas'.at(-1)); //->s
*/
/*


//using for
//for (const movement of movements) {
//entries take the keys and values from an array
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: Your deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
} //->Movement 1: Your deposited 200...

//using forEach
//break doesn't work in forEach-> if you need it, than use for loop
//forEach is a higer-order function
console.log('---------FOREACH-------  ');
//order of parametrs (function(parametrs)) is important!!!
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: Your deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
//->Movement 1: Your deposited 200...
//0: function(200)
//1: function(450)
//...
*/
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//MAP
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); //->USD: United States dollar...
});

//SET
//set shows just unique values
//set doesn't have keys, so the values will be the same as the keys
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR', 'EUR']);
currenciesUnique.forEach(function (value, _, set) {
  //"_" -> unnecessary parametr
  console.log(`${value}: ${value}`); //->USD: USD...
});
*/

//Coding challenge 1
/*
Julia and Kate asked 5 dog owners about dog's age. Create one array for each.
If dog > 3 years -> adult, else -> puppy
Create a function 'checkDogs' wich accepts 2 arrays of dog's and does
following things:
*/
/*
const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

const checkDogs = function (jArray, kArray) {
  //1. Julia found out that the owners of the FIRST and the LAST TWO dogs.
  //create copy of an array and remove the cat ages
  const jArrayCopy = jArray.slice(1, jArray.length - 2); //-> [5, 2]
  //2. Create an array with both correct Julia and Kate's data
  const completeArray = jArrayCopy.concat(kateData); //-> [5, 2, 4, 1, 15...]
  //For each dog: If dog > 3 years -> adult, else -> puppy
  completeArray.forEach(function (dogAge, number) {
    if (dogAge >= 3) {
      console.log(
        `Dog number ${number + 1} is an adult, and is ${dogAge} y.o.`
      );
    } else {
      console.log(`Dog number ${number + 1} is still a puppy :)`);
    }
  });
};

checkDogs(juliaData, kateData);

*/
/*
//MAP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
//const movementsUSD = movements.map(function(mov) {
// return mov * eurToUsd
//});
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movementsUSD); //[220.00000000000003, 495.00000000000006,...]

//Using for loop
const movementsUSDFor = [];
for (const mov of movements) {
  movementsUSDFor.push(mov * eurToUsd);
}
console.log(movementsUSDFor); //looks the same as using MAP

//next map example
const movementsDesc = movements.map((mov, i) => {
  if (mov > 0) {
    return `Movement ${i + 1}: Your deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementsDesc);
*/
/*
//FILTER METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(mov => mov > 0);
//filter only positive values
console.log(deposits); //->(5) [200, 450, 3000, 70, 1300]

//The same result using for loop
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);
*/
/*
//REDUCE METHOD
//accumulator -> SNOWBALL
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log('acc = ' + acc, ', cur = ' + cur);
//   return acc + cur;
// }, 0); //-> 0 = anition value of accumulator (start)

const balance = movements.reduce((acc, cur) => acc + cur, 0);
//console.log(balance);

//The same using For Loop
let acc = 0;
for (const mov of movements) {
  acc += mov;
}
//console.log(acc);

//Maximum value
const max = movements.reduce((acc, mov) => {
  console.log(`acc = ${acc}, mov = ${mov}`);
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]); //start at position 0
console.log(max); //3000
*/
/*
//CHALLANGE 2 (Map, Filter, Reduce)
//Convert dog ages to human ages and calculate the average age.
//1. Create a function 'calcAverageHumanAge', which accepts an array of dog's ages
//2. Calculate the dog age using formula:
//if the dog <= 2 y.o. -> humanAge = 2 * dogAge.
//if the dog > 2 y.o. -> humanAge = 16 + dogAge * 4.
//3. Exclude all dogs that are less 18 human years
//4. Calculate the average human age of all adult dogs
const ages = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = dogsAges => {
  const humanAges = dogsAges.map(dogAge => {
    if (dogAge <= 2) {
      return dogAge * 2;
    } else {
      return 16 + dogAge * 4;
    }
  });
  console.log(humanAges); //all human ages for dogs ((7) [36, 4, 32, 2, 76, 48, 28])
  const adultDogs = humanAges.filter(dogAge => dogAge > 18);
  console.log(adultDogs); //just adult Age > 18 ((5) [36, 32, 76, 48, 28])

  const averageAge = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  console.log(averageAge); //44
  return averageAge;
};

calcAverageHumanAge(ages);

*/
/*
//The Magic of Chaining Methods
//Convert all deposits from EUR to USD and count a sum
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const totalDepositsToUSD = movements
  .filter(mov => mov > 0) //filter only positive values
  .map(mov => mov * eurToUsd) //convert EUR to USD
  //how to see the result of filter:
  // .map((mov, i, arr) => {
  //   console.log(arr);
  //   return mov * eurToUsd;
  // })
  .reduce((acc, mov) => acc + mov, 0); //SUM
console.log(totalDepositsToUSD);

*/
/*
//CHALLENGE 3
//Rewrite the 'calcAverageHumanAge' from challenge 2 as an arrow function and using chaining

//Convert dog ages to human ages and calculate the average age.
//1. Create a function 'calcAverageHumanAge', which accepts an array of dog's ages
//2. Calculate the dog age using formula:
//if the dog <= 2 y.o. -> humanAge = 2 * dogAge.
//if the dog > 2 y.o. -> humanAge = 16 + dogAge * 4.
//3. Exclude all dogs that are less 18 human years
//4. Calculate the average human age of all adult dogs
const ages = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = dogsAges => {
  const averageAge = dogsAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(dogAge => dogAge >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(averageAge); //44
  return averageAge;
};

calcAverageHumanAge(ages);
*/
/*
//FIND METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal); //-> -400

console.log(accounts); //-> object with 4 accounts
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); //-> 1 account(object) with owner 'Jessica Davis'

//the same using for of loop
for (const mov of accounts) {
  if (mov.owner === 'Jessica Davis') {
    console.log(mov);
  }
}
*/
/*
//SOME AND EVERY METHODS
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Equality
console.log(movements.includes(-130)); //->true

//Some
//check if an array contains positive values
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); //->true

//Every
//returns true if all elements satisfy condition that we passed in
console.log(movements.every(mov => mov > 0)); //-> false

//Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
*/
/*
//flat and flatMap
//flat by default goes JUST TO ONE LEVEL DEEP
//separate arrays to one big array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //->(8) [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //(6) [Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); //(8) [1, 2, 3, 4, 5, 6, 7, 8]

//Calculate overal balance of all accounts (flat)
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); //->(4) [Array(8), Array(8), Array(8), Array(5)]
const allMovements = accountMovements.flat();
console.log(allMovements); //->(29) [200, 450, -400, 3000, -650, -130,...]
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); //->17840

//Calculate overal balance of all accounts (flatMap)
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); //->17840
*/
/*
//SORT
//Sort method change original array
//Sort method convert everything to string and than sort it
//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //->(4) ['Adam', 'Jonas', 'Martha', 'Zach']

//Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//Sort numbers like strings (-1, -4, -6, 1, 2, 3, 4, 7)
//console.log(movements.sort()); //->(8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

//Fix numbers sort (compare nubmers a and b)
//a = current value(450), b = next value (-400)
//if a - b < 0 -> value a will be sorted before b
//if a - b > 0 -> value a will be sorted after b

//ascending order (go from small to large numbers)
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1; //if a < b the result is always smth negative
});
//the same result:
movements.sort((a, b) => a - b);
console.log(movements); //(8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

//descending order
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
//the same result:
movements.sort((a, b) => b - a);
console.log(movements); //(8) [3000, 1300, 450, 200, 70, -130, -400, -650]
*/
/*
//CREATING AND FILLING ARRAYS
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array([1, 2, 3, 4, 5, 6, 7]));

//Empty array
const x = new Array(7); //array with 7 empty elements
console.log(x); //->(7) [пусто × 7]
//console.log(x.map(() => 5)); //->(7) [пусто × 7]

//FILL METHOD
x.fill(1);
console.log(x); //->(7) [1, 1, 1, 1, 1, 1, 1]
x.fill(1, 3, 5); //feel in 1 from 3 to 5 position
console.log(x); //->(7) [пусто × 3, 1, 1, пусто × 2]

//Array.from method
const y = Array.from({ length: 7 }, () => 1);
console.log(y); //->(7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); //->(7) [1, 2, 3, 4, 5, 6, 7]

//Get values from the UI and calculate the sum ->
//->we need to get values and convert it to array
labelBalance.addEventListener('click', function () {
  //1.We use Array.from to create an array from the results of querySelectorAll
  //which is a noteless, not actually the array, but have the same structure
  //than converted to array, using Array.from
  //2.using map, extract to array exactly what we wanted (convert to number and replace '€')
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI); //->(8) [1300, 70, -130, -650, 3000, -400, 450, 200]

  //the same
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2); //(8) [div.movements__value, div.movements__value,...]
  const movUI3 = movementsUI2.map(el => el.textContent.replace('€', ''));
  console.log(movementsUI2[0].textContent.replace('€', '')); //->1300
  console.log(movUI3);//->(8) ['1300', '70', '-130', '-650', '3000', '-400', '450', '200']
});
*/
/*
//ARRAY METHODS PRACTICE

//1. Calculate overall amount in all accounts in a bank
//create a new array of arrays with all the amounts -> filter -> count the sum
//(if you need to use flat and map, use flatMap) accounts.flatMap...
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum); //25180

//2. How many deposits in bank with at least 1000$
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000); //->6

//The same using reduce method
const num2Deposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(num2Deposits1000); //->6

//3. Next example
let a = 10;
console.log(++a); //->11

//4. Create an object which contains some of the deposits and the withdrawals
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals); //->25180 -7340

//5. Function that convert any string to a titleCase
//this is a nice TITLE -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ') //->(5) ['this', 'is', 'a', 'nice', 'title']
    .map(
      word =>
        exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1) //->(5) ['This', 'Is', 'a', 'Nice', 'Title']
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice TITLE')); //This Is a Nice Title
*/

///////////////////////
//Challenge 4

/*
Check if dogs are eatinf too much or too little.
Too much means, the dog's current portion is larger than the recommended
and eating too little is the opposite.
Eating an okay means that the portion is within a range 10% above or below the recommended.
*/
/*
//Test data:
const dogs = [
  { weight: 22, curFood: 280, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 190, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1. Loop over the array and calculate the recommended portion,
//then add it to the object as a new property
//Formula: recommendedFood = weight ** 0.75 * 28 (Result in grams, weight need to be in kg)
const recommendedFood = dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

//2. Find Sarah's dog and log to the console whether it's eating too much or too little.
//V.1
const SarahsDog1 = dogs.find(desc => desc.owners.includes('Sarah'));
if (SarahsDog1.curFood > SarahsDog1.recommendedFood) {
  console.log("Sarah's dog eats too much");
} else if (SarahsDog1.curFood < SarahsDog1.recommendedFood) {
  console.log("Sarah's dog eats too little");
}

//V.2
// const checkDogsPortionByOwnerName = function (ownerName) {
//   //get index of the object wich contains the name of the owner
//   const DogIndex = dogs
//     .map(dog => dog.owners.includes(ownerName))
//     .indexOf(true);
//   //get the object
//   const dogObject = dogs[DogIndex];
//   //check the portion
//   if (dogObject.curFood > dogObject.recommendedFood * 1.1) {
//     //console.log(`Dog's current portion is too big (${dogObject.curFood} grams), it must be lower than ${dogObject.recommendedFood} grams`);
//     return 1;
//   } else if (dogObject.curFood < dogObject.recommendedFood * 0.9) {
//     //console.log(`Dog's current portion is too little (${dogObject.curFood} grams), it must be bigger than ${dogObject.recommendedFood} grams`);
//     return -1;
//   } else {
//     // console.log(`Dog's current potrion is okay: current portions = ${dogObject.curFood} grams, recommended = ${dogObject.recommendedFood} grams`);
//     return 0;
//   }
// };
// checkDogsPortionByOwnerName('Sarah');

//3. Create an array containing all owners of dogs who eat too much and who eat too little.
//V.1
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
const kk = dogs.map(dog =>
  dog.curFood > dog.recommendedFood
    ? ownersEatTooMuch.push(dog.owners)
    : ownersEatTooLittle.push(dog.owners)
);
console.log(ownersEatTooMuch.flat());
console.log(ownersEatTooLittle.flat());

//V.3
const Much = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(Much);

//V.2

// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];

// const ownersBadPortions = function (array) {
//   //get names of all owners to one array
//   let allOwnersArray = [];
//   const createOwnersArray = array.map(owner =>
//     allOwnersArray.push(owner.owners)
//   );
//   allOwnersArray = allOwnersArray.flat();

//   //check portion and add the name to the array
//   const checkDogsPortion = allOwnersArray.map(function (owner) {
//     if (checkDogsPortionByOwnerName(owner) === 1) {
//       ownersEatTooMuch.push(owner);
//     } else if (checkDogsPortionByOwnerName(owner) === -1) {
//       ownersEatTooLittle.push(owner);
//     }
//   });
// };
// ownersBadPortions(dogs);

//4. Log a string to the console for each array created in 3.
//Like this: Matilda and Alice and Bob's dogs eat too much/little
const ownersEatTooMuchString = `${ownersEatTooMuch.join(
  ' and '
)}'s dogs eat too much`;
const ownersEatTooLittleString = `${ownersEatTooLittle.join(
  ' and '
)}'s dogs eat too little`;
console.log(ownersEatTooMuchString);
console.log(ownersEatTooLittleString);

//5. Log to the console wheather there is any dog EXACTLY the amount of food
//that is recommended (just true or false)
const checkIdealPortion = arr =>
  arr.some(dog => dog.curFood === dog.recommendedFood);
console.log(checkIdealPortion(dogs));

//6. Log to the console wheather there is any dog eating an OKAY amount of food
//that is recommended (just true or false)
const checkOkayPortion = dog =>
  dog.recommendedFood >= dog.curFood * 0.9 &&
  dog.recommendedFood <= dog.curFood * 1.1;

console.log(dogs.some(checkOkayPortion));

//7. Array of dogs that eating OKAY amount of food
//const okayDogs = dogs.filter(checkOkayPortion);
console.log(dogs.filter(checkOkayPortion));

//8. Create a shallow copy of the dogs array and sort it by recommended food portion
//in an ascending order
const sort = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sort);
*/
