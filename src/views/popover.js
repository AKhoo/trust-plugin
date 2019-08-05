import html from './popover.html';
import './popover.css';

const axios = require('axios');

export function show(id) {
  // Convert plain HTML string into DOM elements
  let temporary = document.createElement('div');
  temporary.innerHTML = html;

  // Append elements to body
  const element = document.getElementById('trust-observer');
  while (temporary.children.length > 0) {
    element.appendChild(temporary.children[0]);
  }

  fetchCustomer(id, element)
}

function fetchCustomer(id, element) {
  return axios.get(`https://trust-observer-api.herokuapp.com/customers/${id}`)
    .then(function (response) {
      const { attributes } = response.data.data;

      Object.keys(attributes).forEach(key => {
        let value = attributes[key];

        if (key === 'email_frequency') {
          value = renderEmailFrequency(value);
        }

        if (key === 'ease_of_unsubscribe') {
          value = renderEaseOfUnsubscribe(value);
        }

        if (key === 'email_kept_private') {
          value = renderEmailKeptPrivate(value);
        }

        element.getElementsByClassName(key)[0].innerHTML = value;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderEmailFrequency(frequency) {
  if (frequency === 'LOW') {
    return 'Low email frequency';
  }

  if (frequency === 'MEDIUM') {
    return 'Medium email frequency';
  }

  return 'High email frequency';
}

function renderEaseOfUnsubscribe(difficulty) {
  if (difficulty === 'EASY') {
    return 'Easy unsubscribe';
  }

  if (difficulty === 'MODERATE') {
    return 'Standard unsubscribe';
  }

  return 'Hard unsubscribe';
}

function renderEmailKeptPrivate(bool) {
  return bool ? 'Email kept private' : 'Email not kept private';
}
