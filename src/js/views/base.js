
// DOM elements
export const elements = {
  searchResList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search input'),
  searchResPages: document.querySelector('.results__pages'),
}


// DOM Strings
export const elementStrings = {
  loader: 'loader',
}

// AJAX Loading Spinner - reusable block of code - put in base.js
export const renderLoader = parent => {
  const loader = `
    <div class='${elementStrings.loader}'>
      <svg>
        <use href='img/icons.svg#icon-cw'></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
  const loader = document.querySelector("." + elementStrings.loader);
  if (loader) loader.parentElement.removeChild(loader);
}