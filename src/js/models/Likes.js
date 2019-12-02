export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img }
        this.likes.push(like);
        
        // Persist data in localStorage
        this.persistData();
        
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // persist Data in local storage
        
    }

    isLiked(id) { // WOOW! Testing return to TRUE or FALSE!!!!!!!
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() { // locStorage accepts ONLY STRINGS ===> JSON.stringify()
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    // Retrieve data to put items back into "liked" list after reloading the page
    readStorage() { // JSON.parse() parses string back to an object
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restore likes from the local storage
        if (storage) this.likes = storage;
        
    }

}