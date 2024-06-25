import { getData } from './getData.js';
import { URL_RANDOM_RECIPE, API_KEY } from './api_key.js';

document.addEventListener('DOMContentLoaded', function () {
  const cardContainer = document.getElementById('recipes');
  const defaultImage = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  function imgError(event) {
    event.target.src = defaultImage;
  }

  const baseUrlRandom = URL_RANDOM_RECIPE;

  function getCardRecipes(url) {
    console.log('Fetching data from URL:', url); // Vérifier l'URL de la requête //
    return getData(url).then((data) => {
      console.log('Données reçues:', data); // Vérifier les données reçues //
      if (!data || !data.results || data.results.length === 0) {
        console.error('No data or recipes found:', data); // Vérifier les données reçues //
        cardContainer.innerHTML = '<p>No recipes found. Please try a different search or filter.</p>';
        return;
      }

      // Nettoyer avant d'afficher nouvelles recettes //
      cardContainer.innerHTML = '';
      for (let i = 0; i < data.results.length; i++) {
        const title = data.results[i].title;
        let image = data.results[i].image || defaultImage;
        const description = data.results[i].summary || '';
        const summaryDescription = description.length > 150
          ? description.slice(0, 150) + '...'
          : description;

        const div = document.createElement('div');
        div.innerHTML = summaryDescription;
        const textSummaryDescription = div.textContent || div.innerText;

        cardContainer.innerHTML += `
          <div class="card-item col-12 col-sm-6 col-lg-4 col-xl-3 mb-5">
            <div class="card">
              <img src="${image}" class="card-img object-fit-cover" alt="...">
              <div class="card-body d-flex flex-column gap-4">
                <h2 class="card-title text-center h4">${title}</h2>
                <p class="card-text">${textSummaryDescription}</p>
                <a href="#" class="btn btn-primary bk-secondary border-0">Voir la recette</a>
              </div>
            </div>
          </div>
        `;
      }

      document.querySelectorAll('.card-img').forEach(img => {
        img.onerror = imgError;
      });

      const cardItems = document.querySelectorAll('.card-item');
      if (cardItems.length > 0) {
        cardItems[cardItems.length - 1].classList.add('last-card-item');
      }
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // Barre de recherche //
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    console.log('Recherche pour:', query); // Vérifier la recherche
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&number=28`;
    console.log('URL de recherche:', searchUrl); // Vérifier l'URL générée
    getCardRecipes(searchUrl);
  }

  // Ajout écouteur d'événements //
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);

  // Récupérer les recettes initiales //
  getCardRecipes(`${baseUrlRandom}&number=28`);

  // Filtrage par catégories //
  function getFilteredRecipes(selector, url) {
    const btnFilter = document.getElementById(selector);
    btnFilter.addEventListener('click', function (e) {
      e.preventDefault();
      cardContainer.innerHTML = '';
      getCardRecipes(url);
    });
  }

  getFilteredRecipes('btn-filter-breakfast', `${baseUrlRandom}&number=28&tags=breakfast`);
  getFilteredRecipes('btn-filter-main', `${baseUrlRandom}&number=28&tags=main%20course`);
  getFilteredRecipes('btn-filter-dessert', `${baseUrlRandom}&number=28&tags=dessert`);
  getFilteredRecipes('btn-filter-random', `${baseUrlRandom}&number=28`);
});
