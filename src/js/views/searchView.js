import {elements} from './base'

export const getInput = () => {
  return elements.searchInput.value;
}

// single function for each functionality!!! This function doesn't have to be exported.
const renderRecipe = recipe => {
  const markup = `<li>
  <a class="results__link results__link--active" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>
`;

}

// 1.2.4 index.js
export const renderResults = recipes => {
  recipes.forEach(el => renderRecipe(recipe))
}