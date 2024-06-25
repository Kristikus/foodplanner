import { getData } from './getData.js';
import { URL_RANDOM_RECIPE } from './api_key.js';
import { API_KEY } from './api_key.js';

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('loggedInUser') && window.location.pathname === '/planning.html') {
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
      if (cardContainer) {
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
      `;
      }
    });

    const cardItems = document.querySelectorAll('.card-item');
    cardItems[cardItems.length - 1].classList.add('last-card-item');

    const baseUrlRandomRecipes = URL_RANDOM_RECIPE;

    function getRecipes(url, selector, link) {
      return getData(url)
        .then((data) => {
          const recipes = data?.recipes;

          const recipeLocations = document.querySelectorAll(selector);

          recipeLocations.forEach((recipeLocation, index) => {
            if (recipes) {
              const recipe = recipes[index];

              // Make the recipe title clickable and store the recipe ID
              recipeLocation.innerHTML = `<a href="#" class="recipe-link color-tertiary">${recipe?.title}</a>`;
              recipeLocation.dataset.recipeId = recipe?.id;
            }
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
          // Make the recipe title clickable and store the recipe ID
          recipeLocation.innerHTML = `<a href="#" class="recipe-link">${data[index].title}</a>`;
          recipeLocation.dataset.recipeId = data[index].id;
        })
        .catch((error) => {
          console.error(error.message);
        });
    }

    getRecipes(
      `${baseUrlRandomRecipes}&number=7&include-tags=breakfast`,
      '[data-category="breakfast"]',
      '[data-link="breakfast"]'
    );
    getRecipes(
      `${baseUrlRandomRecipes}&number=14&include-tags=main%20course`,
      '[data-category="main-course"]',
      '[data-link="main-course"]'
    );
  }
});

// Add a global event listener for clicks on recipe links
document.addEventListener('click', function (e) {
  // Check if the clicked element is a recipe link
  if (e.target && e.target.classList.contains('recipe-link')) {
    e.preventDefault(); // Prevent the default link attitude
    const recipeId =
      e.target.parentElement.dataset.recipeId || e.target.dataset.recipeId; // Get the recipe ID stored in the data
    openRecipeDetails(
      `https://api.spoonacular.com/recipes/${recipeId}/card?apiKey=${API_KEY}`
    );
  }
});

// Function to open the recipe details in a new page

export function openRecipeDetails(url) {
  getData(url)
    .then((data) => {
      const dataUrl = data.url;

      sessionStorage.setItem('dataUrl', JSON.stringify(dataUrl));

      location.href = 'recipe.html';
    })
    .catch((error) => {
      console.error(error.message);
    });
}
