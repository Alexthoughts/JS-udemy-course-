'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); //convert to String and take the last 10 numbers
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setDescription() {
    //next comment say prettier to ignore next line
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

////////////////////////////////////////////////////////////////////////////
//APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const workoutList = document.querySelector('.workout__list');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteAllWorkouts = document.querySelector('.btn__deleteAll');
const btnSort = document.querySelector('.btn__sort');
const sort = document.querySelector('.sort');
const sortByType = document.querySelector('.sortByType');
const sortByDistance = document.querySelector('.sortByDistance');
const sortByDuration = document.querySelector('.sortByDuration');
const sortByCadence = document.querySelector('.sortByCadence');
const sortByElevationGain = document.querySelector('.sortByElevationGain');
let sortedDescending = false;
let sortedAscending = false;
let html = ``;
//Implement classes from architecture diagram
class App {
  //private instance properties
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  //constructor executed immediately after using the class (when the application load)
  constructor() {
    //get user's position
    this._getPosition();

    //get data from local storage
    this._getLocalStorage();

    //attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this)); //default "this" depends on form, but we want App...use bind
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    document.addEventListener('keypress', this._editWorkout.bind(this));
    document.addEventListener('click', this._deleteWorkout.bind(this));
    deleteAllWorkouts.addEventListener('click', this._deleteAll.bind(this));
    btnSort.addEventListener('click', this._btn_sort.bind(this));
    sortByType.addEventListener('click', this._sortedByType.bind(this));
    sortByDistance.addEventListener('click', this._sortedByDistance.bind(this));
    sortByDuration.addEventListener('click', this._sortedByDuration.bind(this));
    sortByCadence.addEventListener('click', this._sortedByCadence.bind(this));
    sortByElevationGain.addEventListener(
      'click',
      this._sortedByElevationGain.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation)
      //check  if browser support geolocation
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          //bind -> prevent undefined of this
          alert('Could not get your position'); //error path
        }
      );
  }

  _loadMap(position) {
    // console.log(position); //->object with geolocation
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`); //your position in google maps

    //array with your coordinates
    const coords = [latitude, longitude];

    //Leaflet library configuration
    //L namespase (like internalization) that includes some methods
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //map style (you can find new and change it)
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
    //method "on" comes from leaflet library

    //render in the list
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus(); //focus the field to start typing immediately
  }

  _hideForm() {
    //Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    //make sure that one class is always visible
    //closest select nearest parent element
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //Helping function to validate inputs (Check all numbers in an array and if all numbers returns true)
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    //Function to check positive numbers
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    //create new workout
    e.preventDefault(); //prevent form update

    //Get data from form
    const type = inputType.value;
    let distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng; // coordinates of click position
    let workout;

    //If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //Check if data is valid
      //if distance NaN
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence) //must be true
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) //must be true
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add new object to workout array
    this.#workouts.push(workout);

    //Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //Render workout on list
    this._renderWorkout(workout);

    //Hide form + clear input fields
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }

  //To make code cleaner create a separate function to display marker
  //Display marker
  //console.log(mapEvent); //contains latlng
  //marker of your location
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          //configurate marker description using docs from leaflet library web
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, //color depends on workout type
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      ) //popup text
      .openPopup();
  }

  _renderWorkout(workout) {
    //Create new HTML and insert whenever a new workout
    html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">     
    <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <input type="number" value="${
              workout.distance
            }" class="workout__value workout--input workout--distance">
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <input type="number" value="${
              workout.duration
            }" class="workout__value workout--input workout--duration">
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === 'running')
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <input type="number" value="${
        workout.cadence
      }" class="workout__value workout--input workout--cadence">
      <span class="workout__unit">spm</span>
    </div>
    <button class="buttons btn__deleteWorkout">X</button>
  </li>
    `;

    if (workout.type === 'cycling')
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <input type="number" value="${
        workout.elevationGain
      }" class="workout__value workout--input workout--elevationGain">
      <span class="workout__unit">m</span>
    </div>
    <button class="buttons btn__deleteWorkout">X</button>
    `;

    //insert html to form element
    workoutList.insertAdjacentHTML('afterbegin', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout'); //element that clicked and his parent element
    if (!workoutEl) return; //if workout doesn't exist

    //get workout id
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    //move to the marker (setView -> method from leaflet library)
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  //save workouts to local storage
  _setLocalStorage() {
    //JSON.stringify() -> convert JSON to a string
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  //get workouts to local storage
  _getLocalStorage() {
    //JSON.parse() -> convert String to a JSON
    const data = JSON.parse(localStorage.getItem('workouts'));

    //if workout doesn't exists
    if (!data) return;

    //at the beging will be empty, but if we already have data in local storage,
    //set workouts array to the data we have before.
    this.#workouts = data;

    //render in the list
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  //removes workouts from local storage -> you can start it from a console
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  _editWorkout(e) {
    //Check the element
    const element = e.target;
    if (element.classList.contains('workout--input') && e.key === 'Enter') {
      //remove focus
      element.blur();
      //Get workout id
      const workoutEl = e.target.closest('.workout');
      const workout = this.#workouts.find(
        work => work.id === workoutEl.dataset.id
      );

      if (element.classList.contains('workout--distance'))
        workout.distance = element.value;
      if (element.classList.contains('workout--duration'))
        workout.duration = element.value;
      if (element.classList.contains('workout--cadence'))
        workout.cadence = element.value;
      if (element.classList.contains('workout--elevationGain'))
        workout.elevationGain = element.value;

      this._setLocalStorage();
    }
    return;
  }

  _deleteWorkout(e) {
    const element = e.target;
    if (element.classList.contains('btn__deleteWorkout')) {
      //Get workout id
      const workoutEl = e.target.closest('.workout');
      const workout = this.#workouts.find(
        work => work.id === workoutEl.dataset.id
      );
      const index = this.#workouts.indexOf(workout);
      this.#workouts.splice(index, 1);

      //hide workout
      workoutEl.style.display = 'none';
      //update local storage
      this._setLocalStorage();
    }
    return;
  }

  _deleteAll() {
    this.reset();
  }

  _btn_sort() {
    sort.classList.remove('hidden');
  }

  _sort(e, field) {
    const element = e.target.children;
    if (sortedDescending === false && sortedAscending === false) {
      this._sortDescending(field);
      element[0].classList.remove('hidden');
    } else if (sortedDescending === true && sortedAscending === false) {
      this._sortAscending(field);
      element[0].classList.add('hidden');
      element[1].classList.remove('hidden');
    } else if (sortedDescending === false && sortedAscending === true) {
      this._removeWorkoutsFromHTML();
      this._addSortedWorkoutsToHTML(this.#workouts);
      sortedAscending = !sortedAscending;
      element[1].classList.add('hidden');
    }
  }

  _sortDescending(field) {
    const sortedArray = this.#workouts
      .slice()
      .sort((a, b) => (a[field] > b[field] ? 1 : -1));
    this._removeWorkoutsFromHTML();
    this._addSortedWorkoutsToHTML(sortedArray);
    sortedDescending = !sortedDescending;
  }

  _sortAscending(field) {
    const sortedArray = this.#workouts
      .slice()
      .sort((a, b) => (a[field] < b[field] ? 1 : -1));
    this._removeWorkoutsFromHTML();
    this._addSortedWorkoutsToHTML(sortedArray);
    sortedAscending = !sortedAscending;
    sortedDescending = !sortedDescending;
  }

  _removeWorkoutsFromHTML() {
    //remove each element from HTML with this classname
    //V1
    //const workoutsList = document.getElementsByClassName('workout'); //select by class
    // while (workoutsList[0]) {
    //   workoutsList[0].remove();
    // }
    //V2
    document.querySelectorAll('.workout').forEach(e => e.remove());
  }

  _addSortedWorkoutsToHTML(sortedArray) {
    //add sorted workouts to HTML
    sortedArray.forEach(work => {
      this._renderWorkout(work);
    });
  }

  _sortedByType(e) {
    this._sort(e, 'type');
  }

  _sortedByDistance(e) {
    this._sort(e, 'distance');
  }
  _sortedByDuration(e) {
    this._sort(e, 'duration');
  }

  _sortedByCadence(e) {
    this._sort(e, 'cadence');
  }

  _sortedByElevationGain(e) {
    this._sort(e, 'elevationGain');
  }
}

const app = new App();
