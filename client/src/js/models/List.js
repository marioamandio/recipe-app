import uniqId from 'uniqid';

export default class List {
    
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqId(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item
    }

    deleteItem (id) {
        const newArr = this.items.filter(el => el.id !== id)
        this.items = newArr
    }

    updateCount (id, newCount) {
        console.log(this.items.find((el) => {
            return el.id === id
        }).count)
        this.items.find((el) => {
            return el.id === id
        }).count = newCount;
    }

}