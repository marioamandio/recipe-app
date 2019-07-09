const key = require("./key.js");

const apikey = process.env.API_KEY || key.key;

module.exports = apikey;
