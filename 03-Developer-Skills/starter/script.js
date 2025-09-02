// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
const birthYear = 23;

const calcAge = birthYear => 2022 - birthYear;

console.log(calcAge(1997));



//Calculate the temperature amplitude. Might be a sensor error.
const temperatures = [3, -2, -6, -1, 9, 'error', 13, 17, 15, 14, 9, 5];
//1) Understanding the problem
//- What is amplitude? difference between max and min
//- How to find max and min temp.?
//- What I can do with sensor error?

//2) Breaking up into sub problems
//- How to ignore errors?
//- Find max value
//- Find min value
//- Substract min from max and return it

const calcTempAttitude = function (temps) {
  for (let t = 0; t < temps.length; t++) {
    if (typeof temps[t] !== 'number') {
      let nan = temps.indexOf(temps[t]); //find index of string in array
      temps.splice(nan, 1); //remove string from an array
    }
  }
  function getMaxOfArray(temps) {
    return Math.max.apply(null, temps);
  }
  function getMinOfArray(temps) {
    return Math.min.apply(null, temps);
  }
  const amplitude = getMaxOfArray(temps) - getMinOfArray(temps);
  return amplitude;
};

console.log(calcTempAttitude(temperatures));




const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    //C) FIX
    value: Number(prompt('Degrees celsius:')), //bug appears because prompt return string
  };
  //B) FIND
  console.table(measurement); //-> arrays looks like a table in console
  //console.log(measurement);
  //   console.warn(measureKelvin.value); //->yellow in console
  //   console.error(measureKelvin.value); //-> red in console

  const kelvin = measurement.value + 273;
  return kelvin;
};
//A) IDENTIFY the bug -> prompt return string
console.log(measureKelvin()); // return 27310, expected 283

*/

const temperatures = [17, 21, 23];
const temperatures2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let str = '';
  for (let a = arr.length; a > 0; a--) {
    const str2 = `... ${arr[a - 1]}C in ${a} days `;
    str = str2 + str;
  }
  console.log(str);
};

printForecast(temperatures2);
