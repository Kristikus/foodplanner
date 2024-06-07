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
  
    function getRecipes() {
      return fetch('data.json')
        .then((response) => response.json())
        .catch((error) => {
          console.error('Erreur lors du chargement du fichier JSON :', error);
        });
    }
  
    daysOfWeek.forEach((day) => {
      cardContainer.innerHTML += `
          <div class="card-item col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
              <div class="card text-center rounded-4">
                  <h2 class="card-header bk-secondary text-white rounded-top-4">
                      ${day}
                  </h2>
                  <ul class="cards-recipes list-group list-group-flush">
                  <h3 class="fs-5 mb-0 mt-3 fst-italic">Breakfast :</h3>
                  <li class="card-recipes list-group-item no-border"></li>
                  <a class="icon-link" href="#">
                      <img class="m-auto mb-3 mt-2 img-thumbnail" src="./img/arrow-repeat.svg"
                          alt="icon for generate a new recipe">
                      </a>
                  <hr>
                  <h3 class="fs-5 mb-0 mt-3 fst-italic">Lunch :</h3>
                  <li class="card-recipes list-group-item no-border"></li>
                  <a class="icon-link" href="#">
                      <img class="m-auto mb-3 mt-2 img-thumbnail" src="./img/arrow-repeat.svg"
                          alt="icon for generate a new recipe">
                  </a>
                  <hr>
                  <h3 class="fs-5 mb-0 mt-3 fst-italic">Diner :</h3>
                  <li class="card-recipes list-group-item no-border"></li>
                  <a class="icon-link" href="#">
                      <img class="m-auto mb-3 mt-2 img-thumbnail" src="./img/arrow-repeat.svg"
                          alt="icon for generate a new recipe">
                  </a>
              </ul>
          </div>
      </div>
      `;
    });
  
    getRecipes().then((recipes) => {
      console.log(recipes);
      const emplacements = document.querySelectorAll('.card-recipes');
      emplacements.forEach((emplacement, index) => {
        const recipe = recipes[index];
        emplacement.textContent = recipe.titre;
      });
    });
  });
  