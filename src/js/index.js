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
 import { elements } from './views/base';
 import * as searchView from './views/searchView';
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

//1.2 Separate fucntion for ev.Listener0
const controlSearch = async () => {
  // 1) get query from the view 
  const query = searchView.getInput(); 
  // console.log(query)
  if (query) {
    // 2) new search object and add query 
    state.search = new Search(query);

    // 3) Prepare UI for Results

    // 4) Search for recipes 
    //const recipe =  
    await state.search.getResults();


    // 5) Render results on UI;
    console.log(state.search.result);


  }

};

// 1.1 Add eventListener
elements.searchForm.addEventListener("submit", event => {
  event.preventDefault();
  console.log(document.querySelector('.search input').value)
  controlSearch();
})





