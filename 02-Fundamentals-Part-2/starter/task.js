/*
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} millon people and its capital city is ${capitalCity}`;
}

const ukraineDescription = describeCountry('Ukraine', 40, 'Kyiv');
const czechRepublicDescription = describeCountry('Czech Republic', 10, 'Prague');
console.log(ukraineDescription);
console.log(czechRepublicDescription);

function percentageOfWorld1(population) {
    return population * 100 / 7900;
}
const ukrainePopulation = percentageOfWorld1(40);
const czechRepublicPopulation = percentageOfWorld1(10);
console.log(ukrainePopulation, czechRepublicPopulation);

const percentageOfWorld = function percentageOfWorld2(population2) {
    return (population2 * 100 / 7900).toFixed(2); //округлить на сотые
}
console.log(percentageOfWorld(40));
console.log(percentageOfWorld(10));

//Arrow function
const worldPercantage = population3 => (population3 * 100 / 7900).toFixed(2);
console.log(worldPercantage(40));


function describePopulation(country, population) {
    const percentageOfWorld4 = percentageOfWorld1(population).toFixed(2);
    return `${country} has ${population} million people, which is about ${percentageOfWorld4}% of the world.`
}

console.log(describePopulation('Ukraine', 40))


const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    bmi: function () {
        return this.mass / this.height ** 2;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    bmi: function () {
        return this.mass / (this.height * this.height);
    }
}

console.log(`${mark.fullName}'s BMI (${mark.bmi().toFixed(2)}) is ${mark.bmi > john.bmi ? 'higher' : 'smaller'}
than ${john.fullName}'s (${john.bmi().toFixed(2)})!`);




const neighbours = ['Portugal', 'Andorra', 'France'];
neighbours.push('Utopia');
neighbours.pop();
if (!neighbours.includes('Germany')) console.log('Probably not a central European country :D');
const index = neighbours.indexOf('Andorra');
neighbours[index] = "Principat d'Andorra";
console.log(neighbours);



const myCountry = {
    country: 'Ukraine',
    capital: 'Kyiv',
    language: 'ukranian',
    population: 40,
    neighbours: ['Poland', 'Slovakia', 'Hungary', 'Roomanie', 'Moldova'],
    describe: function () {
        return `${this.country} has ${this.population} million ${this.language}-speaking people,
${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
    },
    checkIsIsland: function () {
        this.neighbours.length > 0 ? false : true;
    }
}

console.log(myCountry.describe());
console.log(myCountry);



const population = [40, 10, 60, 700];
const percantage2 = [];
function percentageOfWorld1(population) {
    return population * 100 / 7900;
}
for (let i = 0; i < population.length; i++) {
    percantage2.push(percentageOfWorld1(population[i]));
}

console.log(percantage2);





const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
    'Russia']];

console.log(listOfNeighbours); // -> 3 Arrays

for (let i = 0; i < listOfNeighbours.length; i++) {
    if (listOfNeighbours[i].length > 1) {
        for (a = 0; a < listOfNeighbours[i].length; a++) {
            console.log(`Neighbour: ${listOfNeighbours[i][a]}`);
        }
    }
}



const population = [40, 10, 60, 700];
const percantage3 = [];
function percentageOfWorld1(population) {
    return population * 100 / 7900;
}
let i = 0;
while (i < population.length) {
    percantage3.push(percentageOfWorld1(population[i]));
    i++;
}
console.log(percantage3);


*/