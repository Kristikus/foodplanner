import { getData } from './fetchData.js';

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
            <div class="card-item col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                <div class="card text-center rounded-4">
                    <h2 class="card-header bk-secondary text-white rounded-top-4">
                        ${day}
                    </h2>
                    <ul class="list-group list-group-flush">
                    <h3 class="fs-5 mb-0 mt-3 fst-italic">Breakfast :</h3>
                    <li class="breakfast list-group-item no-border"></li>
                    <a class="icon-link" href="#">
                        <img class="m-auto mb-3 mt-2 img-thumbnail" src="./img/arrow-repeat.svg"
                            alt="icon for generate a new recipe">
                        </a>
                    <hr>
                    <h3 class="fs-5 mb-0 mt-3 fst-italic">Lunch :</h3>
                    <li class="main-course list-group-item no-border"></li>
                    <a class="icon-link" href="#">
                        <img class="m-auto mb-3 mt-2 img-thumbnail" src="./img/arrow-repeat.svg"
                            alt="icon for generate a new recipe">
                    </a>
                    <hr>
                    <h3 class="fs-5 mb-0 mt-3 fst-italic">Diner :</h3>
                    <li class="main-course list-group-item no-border"></li>
                    <a class="icon-link" href="#">
                        <img class="m-auto mb-3 mt-2 img-thumbnail" src="./img/arrow-repeat.svg"
                            alt="icon for generate a new recipe">
                    </a>
                </ul>
            </div>
        </div>
        `;
  });

  // const baseUrl ='https://api.spoonacular.com/recipes/random?apiKey=1c33e2baebbf45ce857291cce918fa18';

  function getRecipes(url, selector) {
    return getData(url)
      .then((data) => {
        data = data.recipes;

        const recipeLocations = document.querySelectorAll(selector);

        recipeLocations.forEach((recipeLocation, index) => {
          const recipe = data[index];
          recipeLocation.textContent = recipe.title;
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  getRecipes(`${baseUrl}&number=7&include-tags=breakfast`, '.breakfast');
  getRecipes(`${baseUrl}&number=14&include-tags=main%20course`, '.main-course');
});
