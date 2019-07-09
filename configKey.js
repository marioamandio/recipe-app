let apiKey;

if (process.env.NODE_ENV === "production") {
  apikey = process.env.KEY;
} else {
  const key = require("./key.js");
  apiKey = key.key;
}

module.exports = apikey;
