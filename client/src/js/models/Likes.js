export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike (id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }

        this.likes.push(like)

        //persist data in localstorage
        this.persistData()
        return like
    }

    deleteLike (id) {
        const newArr = this.likes.filter((el) => el.id !== id)
        this.likes = newArr;

        //persist data in localstorage
        this.persistData()
    }

    isLiked (id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes () {
        return this.likes.length;
    }

    persistData () {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage () {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        //restore likes from localstorage
        if(storage) this.likes = storage;
    }
}