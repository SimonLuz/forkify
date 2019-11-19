import axios from 'axios';

import { proxy, key } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  // method for class Recipe
  async getRecipe() {
    try {
      // CHANGED API !!!!!!!!!
      // const res = await axios(`https:www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

      // changed into Jonas's API:
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.image = res.data.recipe.image_url;
      this.ingredients = res.data.recipe.ingredients;
      this.author = res.data.recipe.publisher;
      this.url = res.data.recipe.source_url;
      // console.log(res);

    } catch(error) {
      // console.log(error);
      alert('Something went wrong')
    }
  }

  calcTime() {
    const numIng = this.ingredients.length
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
  
  parseIngredients() {
    const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

    const newIngredients = this.ingredients.map(el => {
      // console.log('ingredient:', el)
      // Uniform units 
      let ingredient = el.toLowerCase();
      unitLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i])
      })

      // Remove parentheses 
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Parse ingredients into count, unit and ingredient 
      const arrIngr = ingredient.split(' ');
      const unitIndex = arrIngr.findIndex(unit => unitShort.includes(unit))

      let objIngr;
      if (unitIndex > -1) {
        // there is a UNIT
        // eg: '1 1/2 cup flour' = [1, 1/2] ---> eval('1+1/2) = 1.5
        // eg: '4 cup flour' = [4]
        const arrCount = arrIngr.slice(0, unitIndex); 
        
        let count;
        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+')); 
        } else {
          count = eval(arrCount.join('+'));
        }
        objIngr = {
          count, // in ES5: count: count,
          unit: arrIngr[unitIndex],
          ingredient: arrIngr.slice(unitIndex + 1).join() 
        }

      } else if (parseInt(arrIngr[0], 10)) {
        // there's no unit, but 1st position is a number
        objIngr = {
          count: parseInt(arrIngr[0], 10),
          unit: '', 
          ingredient: arrIngr.slice(1).join(' ')
        }
      } else if(unitIndex === -1) {
        // NO UNIT
        objIngr = {
          count: 1,
          unit: '',
          ingredient: ingredient,
        }
      }

      return objIngr;

    });
    this.ingredients = newIngredients;
  }

}