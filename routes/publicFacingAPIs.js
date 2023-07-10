const router = require('express').Router();
const {db, User, Recipe} = require('../db/associations');
const { QueryTypes } = require('sequelize');
const basicAuth = require('express-basic-auth');
const auth = require('../routes/auth')

//Returns top 5 most favorited recipes (spoonacular id, recipe name, favorited count)
router.get('/topRecipies/:apiKey', async (req, res) => {
  const apiKey = req.params.apiKey;
  try {
    //Do we want to hash the apiKeys?
    const user = await User.findOne({where: {apiKey: apiKey}});
    //Could potentially save the api call to keep track of how many requests the user made and implement a cap
    if (user) {
      const query = `SELECT Recipes.recipeId, Recipes.name, COUNT(Favorites.RecipeRecipeId) as Favorite_Count
                      FROM Favorites
                      JOIN Recipes on Recipes.recipeId = Favorites.RecipeRecipeId 
                      GROUP BY Favorites.RecipeRecipeId 
                      ORDER BY COUNT(Favorites.RecipeRecipeId ) 
                      DESC 
                      LIMIT 5`;
      const topRecipes = await db.query(query, {type: QueryTypes.SELECT});
      res.status(200).json(topRecipes);
    } else {
      res.status(401).send(`Unauthorized request, Api Key: ${apiKey} is NOT Valid.`);
    }
  } catch (error) {
    res.status(500).send(`Server error: ${error}, could not access the server to return the top recipes.`);
  }
});

//Returns recipes favorited in the last week
router.get('/latestFavorited/:apiKey', async (req, res) => {
  const apiKey = req.params.apiKey;
  try {
    const user = await User.findOne({where: {apiKey: apiKey}});
    if (user) {
      const rawDate = new Date();
      const daysBack = 7;
      const month = rawDate.getMonth() + 1 > 9 ? rawDate.getMonth() + 1 : `0${rawDate.getMonth() + 1}`;
      const date = `${rawDate.getFullYear()}-${month}-${rawDate.getDate() - daysBack}`;
      const query = `SELECT Recipes.recipeId, Recipes.name, Favorites.createdAt
                      FROM Favorites
                      JOIN Recipes on Recipes.recipeId = Favorites.RecipeRecipeId 
                      WHERE Favorites.createdAt >= ${date}
                      ORDER BY Favorites.createdAt
                      DESC`;
      const latestAndGreatest = await db.query(query, {type: QueryTypes.SELECT});
      res.status(200).json(latestAndGreatest);
    } else {
      res.status(401).send(`Unauthorized request, Api Key: ${apiKey} is NOT Valid.`);
    }
  } catch (error) {
    res.status(500).send(`Server error: ${error}, could not access the server to return the latest favorites.`);
  }
});

//Returns the last 10 most recently favorited 
router.get('/lastTenFavorites/:apiKey', async (req, res) => {
  const apiKey = req.params.apiKey;
  try {
    const user = await User.findOne({where: {apiKey: apiKey}});
    if (user) {
      const query = `SELECT Recipes.recipeId, Recipes.name, Favorites.createdAt
                      FROM Favorites
                      JOIN Recipes on Recipes.recipeId = Favorites.RecipeRecipeId 
                      ORDER BY Favorites.createdAt
                      DESC
                      LIMIT 10`;
      const lastTenFavorites = await db.query(query, {type: QueryTypes.SELECT});
      res.status(200).json(lastTenFavorites);
    } else {
      res.status(401).send(`Unauthorized request, Api Key: ${apiKey} is NOT Valid.`);
    }
  } catch (error) {
    res.status(500).send(`Server error: ${error}, could not access the server to return the last 10 favorites.`);
  }
});

module.exports = router;
