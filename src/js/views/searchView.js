import {elements} from './base'


export const getInput = () => {
  return elements.searchInput.value;
}


export const clearInput = () => {
  elements.searchInput.value = '';
}


export const clearResults = () => {
  elements.searchResList.innerHTML = '';
}


const limitRecipeTitle = (title, limit=17) => {
  console.log(title)
  let recipeTitle = [];
  
  if (title.length >= limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length < limit) {
        recipeTitle.push(cur);
      }
      return acc + cur.length;
    }, 0)
    return recipeTitle.join(' ') + '...';
  }
  return title;
}


// single function for each functionality!!! This function doesn't have to be exported.
const renderRecipe = recipe => {
  const markup = `<li>
  <a class="results__link results__link--active" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
}


// 1.2.4 from index.js
export const renderResults = recipes => {
  console.log(recipes)
  recipes.forEach(el => renderRecipe(el))
};