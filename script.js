const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Display success outline
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Display error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Check requried fields
const checkRequired = inputArray => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      if (input.id === 'password2') {
        showError(input, `Password confirmation is required`);
      } else {
        showError(input, `${getFieldName(input)} is required`);
      }
    } else {
      showSuccess(input);
    }
  });
};

// Check length of inputs
const checkInputLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must at least have ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} cannot be more than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check valid email
const checkValidEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(input.value.trim())) {
    showError(input, `Email is not valid`);
  } else {
    showSuccess(input);
  }
};

// Check for passwords match
const checkPasswordMatch = (input1, input2) => {
  if (input1.value.trim() !== input2.value.trim()) {
    showError(input2, 'Passwords do not match');
  }
};

// Capitalizing field names
const getFieldName = input =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

// Event listner
form.addEventListener('submit', event => {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkInputLength(username, 4, 15);
  checkInputLength(password, 8, 20);
  checkValidEmail(email);
  checkPasswordMatch(password, password2);
});
