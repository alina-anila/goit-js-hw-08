import throttle from 'lodash.throttle';

const formElem = document.querySelector('.feedback-form');
const FORM_INPUT_DATA = 'feedback-form-state';

const currentData = {};

formInitialization();

formElem.addEventListener('input', throttle(saveCurrentData, 500));

formElem.addEventListener('submit', clearForm);

function saveCurrentData(event) {
  if (event.target.name === 'email') {
    currentData.email = event.target.value;
  }
  if (event.target.name === 'message') {
    currentData.message = event.target.value;
  }
  localStorage.setItem(FORM_INPUT_DATA, JSON.stringify(currentData));
}

function formInitialization() {
  if (localStorage.getItem(FORM_INPUT_DATA)) {
    const savedData = JSON.parse(localStorage.getItem(FORM_INPUT_DATA));
    if (savedData.email !== undefined) {
      formElem.email.value = savedData.email;
    }
    if (savedData.message !== undefined) {
      formElem.message.value = savedData.message;
    }
  }
}

function clearForm(event) {
  event.preventDefault();
  localStorage.removeItem(FORM_INPUT_DATA);
  console.log('User email is: ', formElem.email.value);
  console.log('User message is: ', formElem.message.value);
  event.currentTarget.reset();
  currentData.email = '';
  currentData.message = '';
}
