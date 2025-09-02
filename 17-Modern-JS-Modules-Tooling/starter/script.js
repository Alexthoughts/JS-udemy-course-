/*

//Importing module
// "./" -> current location
//all imports locate at the top of file

//import function "addToCart" and variables from the module "shoppingCart" to use them
import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; //executed first

console.log('Importing module');

addToCart('bread', 5);
console.log(price, tq);

//create an object contaning everything that is exported from the module shoppingCart
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

//import from default export -> named as you want
import nameWhatYouWant from './shoppingCart.js';
nameWhatYouWant('pizza', 2);
nameWhatYouWant('bread', 5);
nameWhatYouWant('burger', 4);

//!!! import are not copies of export, they are like a live connection (same point at the memory)
import { cart } from './shoppingCart.js';
//cart is not empty like in module because of live connection
console.log(cart); //pizza, bread, burger...

///////////////////////////////////////////////////////
//async function x (){} -> no need in module

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  //get the las post
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

//Not very clean
// lastPost.then(last => console.log(last));

//Clean
const lastPost2 = await getLastPost();
console.log(lastPost2);

///////////////////////////////////////////////////////////
//The module pattern

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  //return object with data which you want to make public
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

//Then you can manipulate with returned data
ShoppingCart2.addToCart('apple', 4);

// //Export -> works in Node.js
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

// //Import -> works in Node.js
// const {addToCart} = require('./shoppingCart.js')

*/

//import cloneDeep from 'lodash-es/cloneDeep';
import cloneDeep from 'lodash-es';
//import cloneDeep from 'lodash';

const state = {
  cart: [
    { produkt: 'bread', quantity: 5 },
    { produkt: 'pizza', quantity: 5 },
  ],
};

const stateDeepClone = cloneDeep(state);

if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

import 'core-js/stable';

import 'regenerator-runtime/runtime';
