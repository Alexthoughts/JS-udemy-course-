'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//querySelectorAll -> for all 3 buttons
const btnsOpenModal = document.querySelectorAll('.show-modal');

function openModal() {
  modal.classList.remove('hidden'); //make modal visible, removing class hidden
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden'); //make modal not visible, adding class "hidden"
  overlay.classList.add('hidden');
}

for (let i = 0; i < btnsOpenModal.length; i++) {
  //console.log(btnsOpenModal[i].textContent); //return text content of all 3 btns
  btnsOpenModal[i].addEventListener('click', openModal); //openModal = created function
}

//close modal clicking on X
btnCloseModal.addEventListener('click', closeModal); //closeModal = created function
//close modal clicking on overlay...мимо модала
overlay.addEventListener('click', closeModal);

//close modal using "Esc"
document.addEventListener('keydown', function (e) {
  console.log(e.key); //return the name of clicked button
  if (e.key === 'Escape') {
    //check if class "hidden" is on the page
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  }
});
