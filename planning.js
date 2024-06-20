import { getData } from './getData.js';
import { API_KEY } from './api_key.js';

document.addEventListener('DOMContentLoaded', function () {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const cardContainer = document.getElementById('cards');

  daysOfWeek.forEach((day) => {
    cardContainer.innerHTML += `
      <div class="card-item col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
        <div class="card text-center rounded-4">
          <h2 class="card-header bk-secondary text-white rounded-top-4">
            ${day}
          </h2>
          <div>
          <ul class="list-group list-group-flush">
            <h3 class="fs-5 mb-0 mt-3 fw-bold">Breakfast :</h3>
            <li class="list-group-item no-border" data-category="breakfast"></li>
            <a class="icon-link" href="#" data-link="breakfast">
              <img class="m-auto mb-3 mt-2" src="./img/arrow-repeat.svg"
                alt="icon for generate a new recipe">
            </a>
            <hr>
            <h3 class="fs-5 mb-0 mt-3 fw-bold">Lunch :</h3>
            <li class="list-group-item no-border" data-category="main-course"></li>
            <a class="icon-link" href="#" data-link="main-course">
              <img class="m-auto mb-3 mt-2" src="./img/arrow-repeat.svg"
                alt="icon for generate a new recipe">
            </a>
            <hr>
            <h3 class="fs-5 mb-0 mt-3 fw-bold">Dinner :</h3>
            <li class="list-group-item no-border" data-category="main-course"></li>
            <a class="icon-link" href="#" data-link="main-course">
              <img class="m-auto mb-3 mt-2" src="./img/arrow-repeat.svg"
                alt="icon for generate a new recipe">
            </a>
          </ul>
          </div>
        </div>
      </div>
    `;
  });

  const cardItems = document.querySelectorAll('.card-item');
  cardItems[cardItems.length - 1].classList.add('last-card-item');
  

  const baseUrl = API_KEY;

  function getRecipes(url, selector, link) {
    return getData(url)
      .then((data) => {
        const recipes = data?.recipes;

        const recipeLocations = document.querySelectorAll(selector);

        recipeLocations.forEach((recipeLocation, index) => {
          const recipe = recipes[index];
          recipeLocation.textContent = recipe?.title;
        });

        // generate a new recipe by clicking on the links with icon
        const recipeGenerateButtons = document.querySelectorAll(link);
        recipeGenerateButtons.forEach((recipeGenerateButton, index) => {
          recipeGenerateButton.addEventListener('click', function (e) {
            e.preventDefault();
            generateNewRecipeByClick(url, selector, index);
          });
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function generateNewRecipeByClick(url, selector, index) {
    return getData(url)
      .then((data) => {
        data = data.recipes;

        const recipeLocations = document.querySelectorAll(selector);
        const recipeLocation = recipeLocations[index];
        recipeLocation.textContent = data[index].title;
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  getRecipes(
    `${baseUrl}&number=7&include-tags=breakfast`,
    '[data-category="breakfast"]',
    '[data-link="breakfast"]'
  );
  getRecipes(
    `${baseUrl}&number=14&include-tags=main%20course`,
    '[data-category="main-course"]',
    '[data-link="main-course"]'
  );
});
