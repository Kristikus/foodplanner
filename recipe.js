document.addEventListener('DOMContentLoaded', function () {
  const recipeData = JSON.parse(sessionStorage.getItem('dataUrl'));
  console.log(recipeData);

  const recipeCard = document.querySelector('#recipe-card');
  recipeCard.src = recipeData;

  const card = document.querySelector('#recipe-card');
  card.classList.add('last-card-item');
});
