const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

let port = process.env.PORT || 3001;

//Routes
app.get("/api/getResults", async (req, res) => {
  const recipesList = await getRecipesList(req.query.q);
  res.send(recipesList);
});

app.get("/api/getRecipe", async (req, res) => {
  const recipe = await getRecipe(req.query.rId);

  res.send(recipe);
});

//External API CALLS
const getRecipesList = async query => {
  const res = await axios(
    `https://www.food2fork.com/api/search?key=${process.env.KEY}&q=${query}`
  );

  return res.data;
};

const getRecipe = async id => {
  const res = await axios(
    `https://www.food2fork.com/api/get?key=${process.env.KEY}&rId=${id}`
  );

  return res.data.recipe;
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server listening on Port " + port);
});
