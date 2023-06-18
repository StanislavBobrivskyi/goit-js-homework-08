import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

// Function to save form state to local storage
const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Function to load form state from local storage
const loadFormState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    const formData = JSON.parse(savedState);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

// Function to clear form state from local storage
const clearFormState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Throttled version of saveFormState to limit updates to local storage
const throttledSaveFormState = throttle(saveFormState, 500);

// Event listener for input events on form fields
form.addEventListener('input', () => {
  throttledSaveFormState();
});

// Event listener for form submission
form.addEventListener('submit', event => {
  event.preventDefault();

  // Clear form state and log form data
  clearFormState();
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });

  // Reset form fields
  form.reset();
});

// Load form state on page load
loadFormState();
