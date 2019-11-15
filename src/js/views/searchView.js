import {elements} from './base'


export const getInput = () => {
  return elements.searchInput.value;
}


export const clearInput = () => {
  elements.searchInput.value = '';
}


export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
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


// type = prev or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
  `;

const renderButtons = (page, numResults, resPerPage) => {
  const maxPages = Math.ceil(numResults / resPerPage); // max no of pages
  let button;

  if (page === 1 && maxPages > 1) {
    // Btn next page
    // a lot of repeated code (next, previous), so we use outside function for that
    button = createButton(page, 'next');
  } else if (page === maxPages && maxPages > 1) {
    // Btn previous 
    button = createButton(page, 'prev');
  } else if (page < maxPages) {
    // btn previous and next
    button = `
    ${createButton(page, 'next')}
    ${createButton(page, 'prev')}
    `;
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}


// 1.2.4 from index.js
export const renderResults = ( recipes, page = 1, resPerPage = 10 ) => {
  // render results of current page
  let tens = [];   
  for (let i = (page - 1)*resPerPage; i < resPerPage * page; i++) {
    tens.push(recipes[i])
  }
  console.log( 'TENS', tens )
  tens.forEach(el => renderRecipe(el));
  
  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};