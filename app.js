window.onload = function () {
  const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
  const allPlacesArr = [];

  (function getAllPlaces(arr) {
    fetch(url) // get data asynchronously
      .then(promise => promise.json())
      .then(data => arr.push(...data)); // data === array with objects
  })(allPlacesArr); // IIFE to get the needed data

  function findMatched(word, searchInArr) {
    const regex = new RegExp(word, "g");
    return searchInArr.filter(place => place.city.match(regex) || place.state.match(regex));
  }

  const resultsContainer = document.getElementById("results");
  function renderResult() {
    if (this.value.length < 3) return (resultsContainer.innerHTML = "");

    const html = findMatched(this.value, allPlacesArr) // returns an array
      .map(place => {
        const city = place.city.replace(this.value, `<span class="highLight">${this.value}</span>`)
        // add span to highlight user typed letters in the result
        const state = place.state.replace(this.value, `<span class="highLight">${this.value}</span>`)

        return `<li>${city}, ${state} <span class="right">${place.population}</span></li>`;
      })
      .join(""); // make html a string

    resultsContainer.innerHTML = html; // insert the result in the DOM
  }

  const userInput = document.getElementById("input");
  userInput.addEventListener("keyup", renderResult);
}