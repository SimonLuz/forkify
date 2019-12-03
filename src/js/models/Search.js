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
    
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
    } catch (error) {
      alert(error)
    }
  }
}
