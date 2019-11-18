
 // b4929c353928106d1a4311c9bf8b0daa
 // https://www.food2fork.com/api/search

import axios from 'axios';
import {elements} from '../views/base';
import * as searchView from '../views/searchView';
import { proxy, key } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }


  // Method for class SEARCH
  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = `b4929c353928106d1a4311c9bf8b0daa`
    
    // console.log('class Search from Search.js!!!')

    try {

      // CHANGED API !!!!!!!!!
      // const res = await axios(`https:www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
      console.log(this.result)
    } catch (error) {
      alert(error)
    }
  }
}
