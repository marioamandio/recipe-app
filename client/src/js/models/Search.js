import axios from "axios";
import { key } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const serverRes = await axios.get(`/api/getResults?q=${this.query}`);

      this.recipes = serverRes.data;
    } catch (error) {
      console.log(error);
    }
  }
}
