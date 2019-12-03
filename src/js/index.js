 import Search from './models/Search';
 import { elements, renderLoader, clearLoader } from './views/base';
 import * as searchView from './views/searchView';
 import * as recipeView from './views/recipeView';
 import * as listView from './views/listView';
 import * as likesView from './views/likesView';
 import Recipe from './models/Recipe';
 import List from './models/List';
 import Likes from './models/Likes';


const state = {};

/////////////////////////////////////////////////////
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
  controlSearch();
})



elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline'); 
  
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
  
  searchView.clearResults();
  searchView.renderResults(state.search.result, goToPage);
  }
})



///////////////////// RECIPE CONTROLLER /////////////
///////////////////////////////////////////////////////////////

const controlRecipe = async () => {
  // get ID from URL, delete '#'
  const id = window.location.hash.slice(1); 
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
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calc Time & Serving 
      state.recipe.calcTime()
      state.recipe.calcServings()
  
      // Render recipe in the UI
      clearLoader();

      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

    } catch(error) {
      alert('Error Processing Recipe (controlRecipe())');
    }
    
  }

}

['hashchange', 'load'].forEach(el => window.addEventListener(el, controlRecipe))



/////////////////////////////////////////////////////
////////////////// SHOPPING LIST controler

const controlList = () => {
  // Create a new list if there in none yet
  if (!state.list) state.list = new List();

  // add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })
}


// Handle delete & update item list EVENTS
elements.shopping.addEventListener("click", e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  // DELETE btn
  if (e.target.matches('.shopping__delete *, .shopping__delete')) {
    // delete from state
    state.list.deleteItem(id);

    // delete from UI
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value); 
    state.list.updateCount(id, val)
  }

})



////////////////////////////////////////////
////////// LIKES CONTROLER /////////////////
// 'like' button is in the 'Recipe' section of UI, so we will 'listen' in the 'recipe' eventListener
const controlLike = () => {
  // if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  
  // Recipe has NOT been liked 
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
        currentID, 
        state.recipe.title,
        state.recipe.author,
        state.recipe.image
        );
    
    // Toggle the like BTN
      likesView.toggleLikeBtn(state.likes.isLiked(currentID));
    // Add like to UI
      likesView.renderLike(newLike);
      
  // Recipe has BEEN liked
  
  } else {
    // Remove like to the state
    state.likes.deleteLike(currentID);

    // Toggle the like BTN
    likesView.toggleLikeBtn(state.likes.isLiked(false));

    // Remove like from UI
    likesView.deleteLike(currentID);
  }

  // Show "like" heart icon in top right corner
  likesView.toggleLikeMenu(state.likes.getNumLikes());

} 


// Restore 'Liked' recipes from localStorage into state.likes[]
window.addEventListener('load', () => {
  // Initiate empty Likes array
  state.likes = new Likes();
  
  // Restore likes into likes array
  state.likes.readStorage();
  
  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // Render 'liked' items
  state.likes.likes.forEach(el => likesView.renderLike(el))

});



// Handling recipe button clicks (+ & -) - recipe section
elements.recipe.addEventListener("click", e => {
  
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 0) {
      state.recipe.updateServings("dec");
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings("inc")
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    //add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // 'Like' controller
    controlLike(); 
  } 

  recipeView.updateServingsIngredients(state.recipe)

})


