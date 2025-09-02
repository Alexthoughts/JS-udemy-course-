'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
<p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //AJAX call
//   //oldschool way
//   const request = new XMLHttpRequest();
//   //create request
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   //send request
//   request.send();

//   //First callback function
//   //wait until the response arrived and call the function
//   request.addEventListener('load', function () {
//     // console.log(this.responseText); //return JSON with data
//     //convert JSON string to an object and destructure it "[data]" (get an object)
//     const [data] = JSON.parse(this.responseText);

//     //Render country 1
//     renderCountry(data);

//     //Get neighbour country (2)
//     const neighbour = data.borders?.[0]; //if borders doesn't exist -> empty;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     //Inside - second callback function
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour'); //add second country
//     });
//   });
// };

//getCountryAndNeighbour('spain');

//modern way using fetch API
const request = fetch(`https://restcountries.com/v2/name/spain`); //-> return promise

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`) //return a promise
//     .then(function (response) {
//       console.log(response);
//       //to read data from response, we need json() method
//       return response.json(); //=data; return a new promise
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    //check if contry exist
    if (!response.ok)
      //if "ok" in response = false
      //throw -> immediately terminate the current function
      //promise become automatically rejected
      throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

//simplify the code
const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');

      //Country 2
      //return promises, because then method always return promises
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))

    //if a user lose internet connections (catch an error)
    .catch(err => {
      console.error(`⛔⛔⛔ ${err}`);
      renderError(`Something went wrong ⛔⛔⛔. Try again! ${err}`);
    })
    //finally method always will be called at the end
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Coding Challenge 1
/*
Build a function 'whereAmI', which render a country based on GPS coordinates.
For that you will use API.

1. Function 'whereAmI' takes as inputs lat and lng.
2. Do 'reverse geocoding' -> convert coordinates to city and country name using API
https://geocode.xyz/api.
AJAX call example: https://geocode.xyz/52.508, 13.381?geoit=json
3. Print a message to console with your location.
4. Use .chain methods and log erros to the console.
5. API allows to make only 3 requests per second. If you reload fast, you will get an error 403.
fetch() doesn't reject the promise in this case, create an error to reject promise yourself.
6.Render a country -> take relevant attribute from geocoding API result and put it into countries API.
*/

const whereAmI = function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longtitude = position.coords.longitude;
        convertCoordinates(latitude, longtitude);
      },
      () => alert('Could not get your position')
    );
};

let countryCode;

const convertCoordinates = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => response.json())
    .then(data => {
      countryCode = data.countryCode;
      const country = data.countryName;
      const city = data.city;
      console.log(`You are located in ${country}, ${city}`);

      return fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
    })
    .then(respnse => respnse.json())
    .then(data => {
      countriesContainer.style.opacity = 1;
      return renderCountry(data);
    })
    .catch(err => console.log(`Something went wrong ${err}`));
};

//btn.addEventListener('click', whereAmI);

///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//Execution order
// console.log('Test start'); //1 -> synchronous
// setTimeout(() => console.log('0 sec timer'), 0); //5 -> in Callback queue (0 seconds is not a garantee, will be executed after promises)
// Promise.resolve('Resolved promise 1') //allows build a promise, that is immediately resolved
//   .then(res => console.log(res)); //3 -> in Microtask queue

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {} //simulate task that takes a long time
//   console.log(res); //4
// });

// console.log('Test end'); //2 -> synchronous

/////////////////////////////////////////////////////////
//Building a promises
//executor function
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     //if number >= 0.5 -> resolve function -> resolve promise -> go to '.then'
//     if (Math.random() >= 0.5) {
//       resolve('You win!');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });
// //res = 'You win!'
// //err = 'You lost your money'
// //consume promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(4)
//   .then(() => {
//     console.log('I waited for 4 seconds');
//     return wait(1); //return new promise
//   })
//   .then(() => console.log('I waited for 1 second'));

// //will resolved immediately
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.error(x));

//////////////////////////////////////////////////////////////////
//Promisifying the geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    //Simplify
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI1 = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(response => response.json())
    .then(data => {
      console.log(`You are located in ${data.countryName}, ${data.city}`);

      return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
    })
    .then(response => response.json())
    .then(data => {
      countriesContainer.style.opacity = 1;
      return renderCountry(data);
    })
    .catch(err => console.log(`Something went wrong ${err}`));
};

//btn.addEventListener('click', whereAmI1);

/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//Challenge 2
/*
Build the image loading funcionality

PART 1
1. Create a function 'createImage' wich recieves imgPath as an input.
This function returns a promise which created a new image (use document.createElement('img'))
and sets the .src attribute to the provided image path.
When the image is done loading, append it to the DOM element with the 'images' class,
and resolve the promise. 
In case an error -> reject the promise.

PART 2
2. Consume the promise using .then and also add an error handler.
3. After the image has loaded, pause execution for 2 seconds.
4. After the 2 seconds have passed, hide the cuurent image (set display to 'none')
and load a second image(HINT: Use the image element returned by the createImage promise to hide the current image).
You wiil need a global variable.)
5. Pause execution for 2 sec.
6. After 2 sec, hide the current image.
*/
const images = document.querySelector('.images');
//1.
const createImage = imgPath =>
  new Promise((resolve, reject) => {
    //create HTML element with tagName img
    const img = document.createElement('img');
    //image path
    img.src = imgPath;

    //add to DOM after the image has loaded
    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });

// //2.
// createImage('img/img-1.jpg')
//   .then(() => {
//     console.log('First image loaded');
//     //3.
//     return wait(2);
//   })
//   .then(() => {
//     //4.
//     img.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(() => {
//     console.log('Second image loaded');
//     //5.
//     return wait(2);
//   })
//   //6.
//   .then(() => (img.style.display = 'none'))
//   .catch(err => console.error(err));

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//Async/Await
//Recreate Where am I function
//async function -> perfoming at the background and return a promise
const whereAmI2 = async function () {
  //Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  //Reverse geocoding
  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  const dataGeo = await resGeo.json();

  //Country data
  //the same
  // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
  //   console.log(res)
  // );

  //await stop the code execution until the promise is fulfilled(до выполнения)
  const res = await fetch(
    `https://restcountries.com/v2/alpha/${dataGeo.countryCode}`
  );

  const data = await res.json();
  countriesContainer.style.opacity = 1;
  renderCountry(data);

  return `You are in ${dataGeo.city}`;
};

//const city = whereAmI2();
//console.log(city); //-> Promise

//In case of using try..catch, even if the error appears return doesn't go
//from 'catch', because promise still fulfilled, but we can reject it manually
//in the end of catch (in function - promise) using "throw err"
// whereAmI2()
//   .then(city => console.log(city))
//   .catch(err => console.error(err));

//Rewrite using Async Await
// (async function () {
//   try {
//     const city = await whereAmI2();
//     console.log(city);
//   } catch (err) {
//     console.error(err);
//   }
// })();
btn.addEventListener('click', whereAmI2);

/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//try..catch
try {
  let y = 1;
  const x = 2;
  //Assignment to const -> error
  y = 3;
} catch (error) {
  alert(error.message);
}

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//Parallel Promises
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data4] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//     //take an array of promises and return a new promise,
//     //all the promises running at the same time
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'ukraine');

/////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//Promise combinators
//Promise.race
//return the first settled promise
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);
//   console.log(res[0]); //-> returns country which faster has recieved (fulfilled or rejected)
// });

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'), sec * 1000);
//     });
//   });
// };

// //automatically reject promise after certain time
// Promise.race([getJSON(`https://restcountries.com/v2/name/mexico`), timeout(1)])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// //Promise.allSettled
// //return an array of all settled promises
// //difference between Promise.all -> never short circuits
// //(Promise.all will circuit as soon as one promise rejects)
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res)); //-> return all 3 promises

// //Promise.any[ES2021]
// //takes an array of promises and return the first fulfilled promise
// //ignore rejected promises
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res)); //-> return all 3 promises

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, 
this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, 
and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function 
(call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

*/

//Recreate this:
// //2.
// createImage('img/img-1.jpg')
//   .then(() => {
//     console.log('First image loaded');
//     //3.
//     return wait(2);
//   })
//   .then(() => {
//     //4.
//     img.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(() => {
//     console.log('Second image loaded');
//     //5.
//     return wait(2);
//   })
//   //6.
//   .then(() => (img.style.display = 'none'))
//   .catch(err => console.error(err));

const loadNPause = async function () {
  try {
    const image1 = await createImage('img/img-1.jpg');
    console.log('First image loaded');
    await wait(2);
    image1.style.display = 'none';
    const image2 = await createImage('img/img-2.jpg');
    console.log('Second image loaded');
    await wait(2);
    image2.style.display = 'none';
  } catch (err) {
    console.error('PROBLEM: ' + err);
  }
};
//loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs); //-> (3) [Promise, Promise, Promise]

    //Promise.all expected promises an an input
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl); //->(3) [img, img, img]

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
