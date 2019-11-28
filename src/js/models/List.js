import uniqid from 'uniqid'

export default class List {

  constructor() {
    this.items = [];
  }

  // method to add items to the list; also needs a UNIQUE ID
  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count: count,
      unit: unit,
      ingredient: ingredient
    }
    this.items.push(item);
    return item // 'good practice' to return an item...
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1) // splice() MUTATES the original array
  }

  updateCount(id, newCount) {
    console.log("HERE", id, newCount)
    this.items.find(el => el.id === id).count = newCount; // find() - finds ELEMENT
  }

}