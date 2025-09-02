'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-08-05T17:01:17.194Z',
    '2022-08-08T20:36:17.929Z',
    '2022-08-09T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0); //add 0 if day < 10
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call, print the ramaining time
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out
    if (time === 0) {
      clearInterval(timer); //stop timer
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //Decrease 1 sec
    time--;
  };

  //Set time to 2 minutes
  let time = 120;

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer; //because we can use timer in different account

// //FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //DATE Log in
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    // const local = navigator.language;
    // console.log(local); //-> ru-RU (language of your browser)
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //->As of Tuesday, 16 August 2022 at 15:57
    //currentAccount.locale = 'en-GB'

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0); //add 0 if day < 10
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //day/month/year

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Start timer
    //To prevent 2 running timers in 2 accounts
    //if no timer -> start timer, if timer exist -> clear timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset timer after the action
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);

    //Reset timer after the action
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
//Converting and Checking numbers
//Js has one data type for all numbers
console.log(23 === 23.0); //-> true

//Numbers are represented internally in 62 base 2 format
// Numbers are always stored in a binary format
// Base 10 - 0-9. 1/10 = 0.1; 3/10 = 3.33333 - we cannot represent...
// Binary base 2 - 0,1 (difficult to represent):
console.log(0.1 + 0.2); //-> 0.30000000000000004 (bad)
//->We cannot do anything against this -> just accept :)

//DON'T DO ACCOUNTING OPERATION IN JS
console.log(0.1 + 0.2 === 0.3); //->false -> ERROR in JS that we need to accept

//Convert String to a Number
console.log(Number('23')); //-> 23
console.log(+'23'); //-> 23

//Parsing
//Parse a number from the string
//STRING NEEDS TO START WITH A NUMBER!!!
console.log(Number.parseInt('30px', 10)); //->30 (10->redix - specify the base of a number (10|2))
console.log(Number.parseInt('px30')); //->Nan

//Decimal number
console.log(Number.parseFloat('2.5rem')); //->2.5
console.log(Number.parseInt('2.5rem')); //->2

//NaN
//Use to check if a number
console.log(Number.isNaN(20)); //-> false (Is it Nan - No, it is a number)
console.log(Number.isNaN('20')); //-> false
console.log(Number.isNaN(+'20C')); //->true
console.log(Number.isNaN(23 / 0)); //-> false (23/0 = Infinity, you can't devide by 0)

//BEST WAY to check if a number or not
console.log(Number.isFinite(20)); //->true (Number)
console.log(Number.isFinite('20')); //-> false (Not a Number)

console.log(Number.isInteger(23)); //->true

*/
/*
//MATH AND ROUNDING
//MATH
console.log(Math.sqrt(25)); //->5 (квадрат)
console.log(25 ** (1 / 2)); //->5 the same

console.log(Math.max(5, 18, 23, 11, 2)); //->23
console.log(Math.min(5, 18, 23, 11, 2)); //->2

//Calculate the area of a circle with 10px radius
console.log(Math.PI * Number.parseFloat('10px') ** 2);

//Random numbers
console.log(Math.floor(Math.random() * 6) + 1); //->random number from 1 to 6

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
//random() = 0...1 -> 0...(max - min) -> min...(max - min + min)

console.log(randomInt(10, 20));

//Rounding
console.log(Math.trunc(23.6)); //-> 23 -> just cut decimal
console.log(Math.round(23.6)); //-> 24 -> round

console.log(Math.ceil(23.9)); //-> 24 -> Rounded up
console.log(Math.ceil(23.3)); //-> 24 -> Rounded up

console.log(Math.floor(23.9)); //-> 23 -> Rounded down
console.log(Math.floor(23.3)); //-> 23 -> Rounded down

//Rounding decimals
//toFixed always return a Srting!
console.log((2.7).toFixed(0)); // -> 3
console.log(+(2.345).toFixed(2)); // -> 2.35

*/

/*
//REMAINDER OPERATOR
console.log(5 % 2); //-> 1 (just int part (5/2 = 2.5 -> 2 -> 2+2 = 4 -> 5-4 = 1))
console.log(5 / 2); //->2.5 (if we take just int part (2), the result will be 2)
console.log(8 % 3); //->2  (8/3 = 2.6666 -> 2 -> 2*3 = 6 -> 8-6 = 2)

//Check if number is even (2,4,6) or odd (1,3,5)
console.log(6 % 2); //->0 (even number)
console.log(7 % 2); //->1 (odd number)

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //->true
console.log(isEven(23)); //->false

//Select all movements in bankApp and color every second row after clicking the balance button
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    //0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    //0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

*/
/*
//287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); //->287460000000 (don't show underscore)
*/

/*
//BigInt
console.log(2 ** 53 - 1); //->9007199254740991 ->the biggest number, that js can represent
console.log(Number.MAX_SAFE_INTEGER); //->9007199254740991

//If you need bigger number -> use bigINT -> no matter how long
console.log(454845145148878787878888899999n);
console.log(BigInt(45484)); //->45484n

//Operations
console.log(10000n + 10000n); //->20000n

//You cannot mix BigInt and other types
const huge = 5454548787878780000000n;
const num = 2;
//console.log(huge * num); //->Uncaught TypeError: Cannot mix BigInt and other types

//Division
console.log(11n / 3n); //-> 3n (cut decimal part)
*/

/*
//Creating dates and times
//Create a date
const now = new Date();
console.log(now); //->Mon Aug 08 2022 12:52:03 GMT+0200

console.log(new Date('Aug 08 2022 12:52:03')); //->Mon Aug 08 2022 12:52:03 GMT+0200
console.log(new Date('December 24, 2015')); //->Thu Dec 24 2015 00:00:00 GMT+0100

console.log(account1.movementsDates[0]); //->2019-11-18T21:31:17.178Z
console.log(new Date(account1.movementsDates[0])); //-> Mon Nov 18 2019 22:31:17 GMT+0100

//first month has index 0 -> Nov is 10, not 11
console.log(new Date(2037, 10, 19, 15, 23, 5)); //->Thu Nov 19 2037 15:23:05 GMT+0100

//Beging of UNIX time
console.log(new Date(0)); //->Thu Jan 01 1970 01:00:00 GMT+0100
//add 3 days using timestamp (3 - days, 24 - hours, 60 - minutes, 60 - seconds, 1000 - to get milleseconds)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //->Sun Jan 04 1970 01:00:00 GMT+0100
//3 * 24 * 60 * 60 * 1000 = 259200000 -> timestamp of 3 days

//Working with dates
console.log('------Working with dates----------');
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); //->Thu Nov 19 2037 15:23:00 GMT+0100
console.log(future.getFullYear()); //->2037
console.log(future.getMonth()); //->10
console.log(future.getDate()); //->19 (day of month)
console.log(future.getDay()); //->4 (day of the week)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

//Convert to a standart format
console.log(future.toISOString()); //->2037-11-19T14:23:00.000Z

//Timestamp -> millesonds since 01.1970
console.log(future.getTime()); //->2142253380000
console.log(new Date(2142253380000)); //Thu Nov 19 2037 15:23:00 GMT+0100
//now timestamp
console.log(Date.now()); //->1659957024243

//SET
future.setFullYear(2040); //change year
console.log(future); //->Mon Nov 19 2040 15:23:00 GMT+0100

*/
/*
//Operations with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); //->timestamp 2142253380000

const calcDaysPassed = (date1, date2) =>
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1); //->10

*/

/*
//Internationalization numbers
const num = 38884764.23;

const options2 = {
  style: 'unit',
  unit: 'celsius',
  currency: 'EUR', //ignore this because stile = unit
};

console.log(new Intl.NumberFormat('en-US').format(num)); //->38,884,764.23
console.log(new Intl.NumberFormat('de-DE').format(num)); //->38.884.764,23
//locale from browser
console.log(new Intl.NumberFormat(navigator.locale, options2).format(num)); //->38 884 764,23 °C

*/
/*
//Timers

const ingredients = ['olives', 'spinach'];

//setTimeout
const pizzaTimer = setTimeout(
  (ingredients1, ingredients2) =>
    console.log(
      `Here is your pizza with ${ingredients1} and ${ingredients2} 🍕`
    ),
  3000,
  'olives',
  'spinach'
); //call this function after 3 sec ->Here is your pizza with olives and spinach 🍕

console.log('Waiting...'); //at first log 'Waiting', then 'Here is your pizza'

//Delete the timer
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//setInterval
setInterval(function () {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const now = new Date();
  console.log(Intl.DateTimeFormat('en-GB', options).format(now));
}, 1000); //this function executed every second

*/
