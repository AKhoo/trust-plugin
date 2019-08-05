import html from './popover.html';
import './popover.css';

const axios = require('axios');

let elements = [];
let body;

export function show(id) {
  // Convert plain HTML string into DOM elements
  let temporary = document.createElement('div');
  temporary.innerHTML = html;

  // Append elements to body
  const element = document.getElementById('trust-observer');
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    element.appendChild(temporary.children[0]);
  }

  fetchDream()
}

export function fetchDream() {
  axios.get('https://send-dreams-staging.herokuapp.com/dreams/random')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
