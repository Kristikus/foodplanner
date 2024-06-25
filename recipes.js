import { getData } from './getData.js';
import { URL_RANDOM_RECIPE } from './api_key.js';
// import for the global eventListener in the planning.js
import { openRecipeDetails } from './planning.js';

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('loggedInUser') && window.location.pathname === '/recipes.html') {
    const cardContainer = document.getElementById('recipes');
    const defaultImage =
      'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    function imgError(event) {
      event.target.src = defaultImage;
    }

    const baseUrlRandom = URL_RANDOM_RECIPE;

    function getCardRecipes(url) {
      return getData(url).then((data) => {
        for (let i = 0; i < 28; i++) {
          const title = data?.recipes[i].title;
          let image = data?.recipes[i].image;
          const recipeId = data?.recipes[i].id;

          if (image === undefined || null) {
            image = defaultImage;
          }

          const description = data?.recipes[i].summary;
          const summaryDescription =
            description.length > 150
              ? description.slice(0, 150) + '...'
              : description;

          const div = document.createElement('div');
          div.innerHTML = summaryDescription;
          let textSummaryDescription = div.textContent || div.innerText;

          cardContainer.innerHTML += `
            <div class="card-item col-12 col-sm-6 col-lg-4 col-xl-3 mb-5 " >
              <div class="card">
                <img src=${image} class="card-img object-fit-cover" alt="...">
                <div class="card-body d-flex flex-column gap-4">
                  <h2 class="card-title text-center h4">${title}</h2>
                  <p class="card-text">${textSummaryDescription}</p>
                  <div data-recipe-id=${recipeId}>
                    <a href="#" class="recipe-link btn btn-primary bk-secondary border-0" >Voir la recette</a>
                  </div>
                </div>
              </div>
            </div>
          `;
        }

        const img = document.querySelector('.card-img-top');
        if (img !== null) {
          img.onerror = imgError;
        }
      });
    }

    getCardRecipes(`${baseUrlRandom}&number=28`);

    function getFilteredRecipes(selector, url) {
      const btnFilter = document.getElementById(selector);
      btnFilter.addEventListener('click', function (e) {
        e.preventDefault();
        cardContainer.innerHTML = '';
        getCardRecipes(url);
      });
    }

    getFilteredRecipes(
      'btn-filter-breakfast',
      `${baseUrlRandom}&number=28&include-tags=breakfast`
    );
    getFilteredRecipes(
      'btn-filter-main',
      `${baseUrlRandom}&number=28&include-tags=main%20course`
    );
    getFilteredRecipes(
      'btn-filter-dessert',
      `${baseUrlRandom}&number=28&include-tags=dessert`
    );
    getFilteredRecipes('btn-filter-random', `${baseUrlRandom}&number=28`);
  }
});
