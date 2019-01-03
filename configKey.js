const key = require("./key.js")

const apikey = process.env.API_KEY || key

module.exports = apikey;

