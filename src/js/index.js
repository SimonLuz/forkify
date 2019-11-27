/* TYPES OF IMPORTS
import str from './models/Search';
// import { add as ik, multiply as ak, ID as fik } from './views/searchView';
// 3rd way of IMPORTING:
import * as searchView from './views/searchView'
console.log(`using imported function ${searchView.add(searchView.ID, 100)} and ${searchView.multiply(5, 5)}. There's also str from Search.js = ${str}`)
 */
 ////////////////////////////////////////////////////////////////////////
//   CONTROLLER MODULE // all controller functionalities in 1 file
/////////////////////////////////////////////////////////////////////////

// THE STATE: 

 import Search from './models/Search';
 import { elements, renderLoader, clearLoader } from './views/base';
 import * as searchView from './views/searchView';
 import * as recipeView from './views/recipeView';
 import * as listView from './views/listView';
 import Recipe from './models/Recipe';
 import List from './models/List';
// THE STATE: what is the state of the app in any given moment: what's current search query, or recipe, or what's currently in the shopping list? 
// All of this data is THE STATE and 

/* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object 
* - Liked recipes 
*/ 
// Each time we reload the page - the state is empty!!!
const state = {};

///////////////////// SEARCH CONTROLLER /////////////
//1.2 Separate fucntion for ev.Listener
const controlSearch = async () => {
 
  // 1) get query from the view 
  const query = searchView.getInput(); 


  if (query) {
    // 2) new search object and add query 
    state.search = new Search(query);

    // 3) Prepare UI for Results
    searchView.clearResults();
    searchView.clearInput();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes 
      await state.search.getResults();

       // 5) Render results on UI;
       clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Something wrong with the search');
      clearLoader();
    }
    
  }
};


// 1.1 Add eventListener
elements.searchForm.addEventListener("submit", event => {
  event.preventDefault();
  // console.log(document.querySelector('.search input').value)
  controlSearch();
})



elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline'); // 'closest' method returns element with a given attr
  
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
  
  searchView.clearResults();
  searchView.renderResults(state.search.result, goToPage);
  }
})



///////////////////// RECIPE CONTROLLER /////////////
///////////////////////////////////////////////////////////////
// Hash eventListener (#8439)
// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange

const controlRecipe = async () => {
  // get ID from URL, delete '#'
  const id = window.location.hash.slice(1); // Jonas: window.location.replace('#', '')
  if (id) {
    // Prepare UI for changes

    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    searchView.highlightSelected(id);

    // Create new recipe object & put it in the STATE
    state.recipe = new Recipe(id);
    
    try {

      // Get recipe Data and parse ingredients
      await state.recipe.getRecipe();// await - Rest of the code executes after recipe returns => need to add 'async' to the top of the function!!!!!!!!!
      state.recipe.parseIngredients();

      // Calc Time & Serving 
      state.recipe.calcTime()
      state.recipe.calcServings()
  
      // Render recipe in the UI
      clearLoader();

      recipeView.renderRecipe(state.recipe);

    } catch(error) {
      alert('Error Processing Recipe (controlRecipe())', error);
    }
    
  }

}
/* 
// Event Listener for URL hash tag #
window.addEventListener('hashchange', controlRecipe);
// Event Listener for clearing hash tag
window.addEventListener('load', controlRecipe);
 */
['hashchange', 'load'].forEach(el => window.addEventListener(el, controlRecipe))


// SHOPPING LIST controler
const controlList = () => {
  // Create a new list if there in none yet
  if (!state.list) state.list = new List();

  // add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })
}


// Handle delete and update item list EVENTS
elements.shopping.addEventListener("click", e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // DELETE btn
  // if (e.target.closest('.shopping__delete')) {
  if (e.target.matches('.shopping__delete *, .shopping__delete')) {
    // delete from state
    state.list.deleteItem(id);

    // delete from UI
    listView.deleteItem(id);
  }

})


// Handling recipe button clicks (+ & -) - recipe section
elements.recipe.addEventListener("click", e => {
  
  if (e.target.matches('.btn-decrease, .btn-decrease *')) { // WOOOOW!!!! '.btn-decrease *' means ALL CHILDREN OF THAT ELEMENT!!!!
  // IMPORTANT: MUST be all as 1 string, not many strings comma-separated!!!!!!!!!!!!!!
    if (state.recipe.servings > 0) {
      state.recipe.updateServings("dec");
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings("inc")
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }

  recipeView.updateServingsIngredients(state.recipe)

})




//////////////////////////////////////////////////
////////// List CONTROLLER
const l = new List();
window.list = l;




/* 
let arr = 'Pizza with avocado and potatoes';
let title = []

const splitArr = arr.split(' ')

const reduceArr = (accu, el) => {
  console.log(accu, el)
  if (accu + el.length <= 17) {
    title.push(el)
  } 
    return accu + el.length;

}  

splitArr.reduce(reduceArr, 0);
// redu();
let title2 = title.join(' ')
console.log(title2)
 */

