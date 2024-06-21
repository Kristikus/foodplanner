import { getData } from './getData.js';
import { API_KEY } from './api_key.js';

document.addEventListener('DOMContentLoaded', function () {
  const cardContainer = document.getElementById('recipes');
  const defaultImage =
    'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  function imgError(event) {
    event.target.src = defaultImage;
  }

  const baseUrl = API_KEY;

  function getCardRecipes(url) {
    return getData(url).then((data) => {
      for (let i = 0; i < 28; i++) {

        const title = data?.recipes[i].title;
        let image = data?.recipes[i].image;

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
            <div class="card-item col-12 col-sm-6 col-lg-4 col-xl-3 mb-4" >
                <div class="card">
                    <img src=${image} class="card-img object-fit-cover" alt="...">
                    <div class="card-body d-flex flex-column gap-4">
                        <h2 class="card-title text-center">${title}</h2>
                        <p class="card-text">${textSummaryDescription}</p>
                        <div>
                            <a href="#" class="btn btn-primary bk-secondary border-0" >Voir la recette</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
      }

      const img = document.querySelector('.card-img-top');
      if(img !== null) {
        img.onerror = imgError;
      } 

      const cardItem = document.querySelectorAll('.card-item');
      cardItem[cardItem.length - 1].classList.add('last-card-item');
    });
  }

  getCardRecipes(`${baseUrl}&number=28`);

});
