'use strict';

const Person = function (firstName, birthYear) {
  //this = object
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //NEVER DO THIS -> don't create a method inside the construction function
  //terrible for perfomance if you have 1000 objects -> use Prototype as below
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

//create new object
const jonas = new Person('Jonas', 1991);
console.log(jonas); //->Person {firstName: 'Jonas', birthYear: 1991}

//new operator functions behind the scene
//1. New {object} is created
//2. function is called, this = {}
//3. {} linked to prototype
//4. function automatically return {}

const matilda = new Person('Matilda', 2017);

console.log(jonas instanceof Person); //-> true

Person.hey = function () {
  console.log('Hey there 🙌');
};
Person.hey();

//PROTOTYPES
//All the objects created through this construction function (Person)
//will inherit all the methods and properties that defind in prototype
//calcAge - prototype
//Person - constructor (object)
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

//don't forget that jonas and matilda are connected to Person constructor
jonas.calcAge(); //->46
matilda.calcAge(); //->20

console.log(jonas.__proto__); //show prototype
console.log(jonas.__proto__ === Person.prototype); //->true

//test if prototype of another object
console.log(Person.prototype.isPrototypeOf(jonas)); //->true
console.log(Person.prototype.isPrototypeOf(Person)); //->false (object)

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); //->Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); //false - because not inside jonas object, it is prototype

console.log(jonas.__proto__); //->{species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
//prototype property of Object (top of prototype chain)
console.log(jonas.__proto__.__proto__); //->{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ,...}

console.dir(Person.prototype.constructor); //->Person(firstName, birthYear)

const arr = [2, 4, 8, 6, 8, 22, 44];
//Prototype of array
console.log(arr.__proto__); //[constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
console.log(arr.__proto__ === Array.prototype); //true

//add new method to prtotype property of array constructor
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
//Do it only on a small project...reasons:
//1. New JS version could include new method with the same name
//2. Bad idea if you work in a team of developers...multiple developers can implement the same method with different name

console.log('-------------CHALLENGE 1------------');

//Use a constructor to implement a car
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

//Accelerate method that incerease speed by 10
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`Accelerate - new ${this.make} speed  ${this.speed}`);
};

//Brake method that decrease speed by 5
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`Brake - new ${this.make} speed  ${this.speed}`);
};

//2 cars objects
const bmw = new Car('BMW', 120);
bmw.accelerate(); //130
bmw.accelerate(); //140
bmw.brake(); //135

const mercedes = new Car('Mercedes', 95);
mercedes.accelerate();
mercedes.brake();
mercedes.brake();

console.log(bmw.__proto__); //{accelerate: ƒ, brake: ƒ, constructor: ƒ}

//CLASSES
//behind the scene classes are still functions and then we have:

//class expression
//const PersonCl = class {};

//class declaration
//constructor is a method of class and you must create it, this is the rule ->
//-> properties that we want class to have
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Method will be added to .prototype property
  //create prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log('Hey' + this.fullName);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //Also setters and getters good to use for data validation
  //check if fullName contains space
  //Set a propery than already exist
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    //add "_" before the value to ptetend same values and errors -> it is a convension
    else alert(`${name} is not a full name`);
  }

  //Instance method
  get fullName() {
    return this._fullName;
  }

  //Static method
  static hey() {
    console.log('Hey there 🙌');
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica); //->PersonCl {firstName: 'Jessica', birthYear: 1996}
jessica.calcAge(); //->41

// PersonCl.prototype.greet = function() {
//     console.log('Hey' + this.firstName);
// }
jessica.greet();

//1. Classes are NOT hoisted (we can't use it before the declaration)
//2. Classes are first-class citizes (we can pass it into function and return it)
//3. Classes are executed in strict mode

//GETTERS AND SETTERS ----------------------------------------------
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  //set must have exactly one parametr
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //->300
//latest is property, not a method, so we need to set it using "="
account.latest = 50;
console.log(account.movements); //->(5) [200, 530, 120, 300, 50]

//Create the object that we want to a prototype of Person object
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //return a new object that linked to "PersonProto"
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); //35

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//CHALLENGE 2
console.log('-----------CHALLENGE 2------------------');
//Use a class to implement a car
class Cars {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  //Accelerate method that incerease speed by 10
  accelerate() {
    this.speed += 10;
    console.log(`Accelerate - new ${this.make} speed  ${this.speed}`);
  }

  //Brake method that decrease speed by 5
  brake() {
    this.speed -= 5;
    console.log(`Brake - new ${this.make} speed  ${this.speed}`);
    return this;
  }

  //getter speedUS returns speed in mi/h
  get speedUS() {
    return (this.speed /= 1.6);
  }

  //setter called speedUS, whic convert speed to km/h before storing the value
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Cars('Ford', 120);
console.log(ford);
ford.accelerate();
ford.accelerate();
ford.brake();

ford.speedUS = 50;
console.log(ford); //->Cars {make: 'Ford', speed: 80 (50*1.6) }
ford.accelerate(); //->90 (50*1.6 + 10)

/////////////////////////////////////////////////////////////////////
//Inheritance between classes
const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  //call method: create new object, and we can specify this keyword
  //and then throw "this" object define firstName and birthYear
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

//Student inherits from Person (Linking prototypes)
//without this you can't use Person methods (calcAge)
//Object.create return an empty object -> in this point Student obj is empty
Student.prototype = Object.create(Person1.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'IT');

console.log(mike);
mike.introduce();
mike.calcAge();

//////////////////////////////////////////////////////////
//Challenge 3
//1. Use a constructor function to implement an Electric Cae (EV) as a child of Car.
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//Link to Car object
EV.prototype = Object.create(Car.prototype);

//2. chargeBattery method which sets the battery charge.
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

//3. accelarate method that will increase speed by 20, and decrease charge by 1.
//this accelerate method override accelarate from parent class.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

//4. Create an electic car and experiment.
const tesla = new EV('Tesla', 100, 90);

tesla.chargeBattery(100);
tesla.brake();
tesla.accelerate();
tesla.accelerate();

////////////////////////////////////////////////////////////////////
//Inheritance - classes
class PersonCl1 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log('Hey' + this.fullName);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    //add "_" before the value to ptetend same values and errors -> it is a convension
    else alert(`${name} is not a full name`);
  }

  //Instance method
  get fullName() {
    return this._fullName;
  }

  //Static method
  static hey() {
    console.log('Hey there 🙌');
  }
}

//creating inheritance between the classes
class Student1 extends PersonCl1 {
  constructor(fullName, birthYear, course) {
    //super -> construction function of a parent class
    //Always needs to happen first! -> get access to this keyword
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new Student1('Martha Jones', 1990, 'IT');
martha.introduce();
martha.calcAge();

////////////////////////////////////////////////////////////////////
//Inheritance - Object.create
const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const bob = Object.create(PersonProto1);

const StudenProto1 = Object.create(PersonProto1);

StudenProto1.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

StudenProto1.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudenProto1);
jay.init('Jay', 2020, 'IT');
jay.introduce();
jay.calcAge();

/////////////////////////////////////////////////////
//Another class example
//Public fields/methods
//Private fields/methods
class Account {
  //1) Public fields (instances)
  locale = navigator.language;
  _movements = [];

  //2) Private fields (#)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; //redefined the private property
    //ptotected property - this is convension not to use directly  ("_")
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening account, ${owner}`);
  }

  //Public interface for object (API)

  //3) Public methods
  getMovements() {
    //this is the correct wat to get movements
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; //current object
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  //static methods will NOT be available on all the instances, but only in class
  static helper() {
    console.log('static');
  }
  //4) Private methods (#)
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1.movements.push(250);
// acc1.movements(-140);
acc1.deposit(250);
acc1.withdraw(150);
acc1.requestLoan(1000);

console.log(acc1);

Account.helper();

//Chaining
//this doesnt work before adding return to the methods, because deposit return nothing (undefined)
//in the next deposit call we try to call undefined.deposit(500)
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(400);
console.log(acc1.getMovements()); //->(8) [250, -150, 1000, 300, 500, -35, 2500, -400]

//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//Challenge 4

//1.Re-create challenge 3 using ES6 classes.
class EVCl extends Cars {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    //2.Make the 'charge' property private
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    //3.Implement the ability to chain the 'changeBattery';
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    //3.Implement the ability to chain the 'accelarate';
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.chargeBattery(100).brake().accelerate().brake();
console.log(rivian.speedUS);
