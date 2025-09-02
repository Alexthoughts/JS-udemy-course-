
let country = "Ukraine";
//let continent = "Europe";
let population = 40000000;

//console.log(country);
//console.log(continent);
//console.log(population);

const island = false;



let language;
//console.log(typeof island);
//console.log(typeof language);

language = "ukranian"
/*
console.log(population / 2 + 1)
let finlandPopulation = 6000000;
if (population > finlandPopulation) {
    console.log("Population is bigger in Ukraine");
} else {
    console.log("Population is bigger in Finland");
}
const description = country + " is in " + continent + ", and its population " + population;
console.log(description);

const description2 = `${country} is in ${continent}`;
console.log(description2);


const numNeighbours = Number(prompt("How many neighbour countries does your country have?"));
if (numNeighbours === 1) {
    console.log("Only 1 border");
} else if (numNeighbours > 1) {
    console.log("More than 1 border");
} else {
    console.log("No borders");
}

if (language === 'ukranian' && population < 50000000 && !island) {
    console.log(`You should live in ${country} :)`);
} else {
    console.log(`${country} does not meet your criteria :(`);
}


const teamDolphin = 'Dolphins';
const dolphinsScore1 = 100;
const dolphinsScore2 = 100;
const dolphinsScore3 = 100;

const teamKoalas = 'Koalas';
const koalasScore1 = 100;
const koalasScore2 = 100;
const koalasScore3 = 100;

const minScore = 100;

const dolphinsAverageScore = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
const koalasAverageScore = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

if (dolphinsAverageScore > koalasAverageScore && dolphinsAverageScore >= minScore) {
    console.log(`Dolphins win! Result: ${dolphinsAverageScore}`);
} else if (koalasAverageScore > dolphinsAverageScore && koalasAverageScore >= minScore) {
    console.log(`Koalas win! Result: ${koalasAverageScore}`);
} else if (dolphinsAverageScore === koalasAverageScore && dolphinsAverageScore >= minScore && koalasAverageScore >= minScore) {
    console.log(`It is a draw! Both team have ${koalasAverageScore} points`);
} else {
    console.log(`We have not got a winner :( 
        Dolpnins: ${dolphinsAverageScore}, 
        Koalas: ${koalasAverageScore}`);
}

*/

const billValue = 300;
const tip15 = 15;
const tip20 = 20;

const tip = billValue > 50 && billValue < 300 ? billValue * tip15 / 100 : billValue * tip20 / 100;

console.log(`The bill was ${billValue}, the tip was ${tip}, and the total value ${billValue + tip}`);


