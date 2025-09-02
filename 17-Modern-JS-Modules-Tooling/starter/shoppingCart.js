//Exporting module
//all variables are private in module -> if we want to use it, add export
console.log('Exporting module');

//Blocking code
//If one module imoprts a module which is a top level await,
//then the importing module will wait for the
//imported module finish the blocking code

console.log('Start fetching users');
//top level await blocking the execution everywhere
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users'); //executed after finish fetch (this function only in modules)

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//default export -> use when we want to export one thing from the module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
