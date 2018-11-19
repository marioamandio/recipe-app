import axios from "axios";
import { key } from '../config'

export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {
        // const crossorigin = "https://crossorigin.me/";

        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            const server = await axios("/api/getResults")

            this.recipes = res.data.recipes;
            console.log(server)
        } catch(error) {
            console.log(error)
        }
    }
}