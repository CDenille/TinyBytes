const express = require('express');
const { User, Recipe } = require('../db/associations');
const basicAuth = require('express-basic-auth');
const dbAuthorizer = require ('../routes/auth')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite');

// Middleware

const sendResponse = (req, res) => {
    const status = 200
    const response = {
        message: `Success`,
        status, 
    }

    if (req.data) {
        response.data = req.data 
    }

    res
    .status(status)
    .json(response)
}

const handleError = (error, req, res, next) => {
    console.error(error)
    const status = 500
    const response = {
        message: 'Oops, something went wrong',
        error,
        status
    }

    res
    .status(status)
    .json(response)
}

const findAllFavorites = async (req, res, next)=> {
  const userId = req.params.userId;
  const query = `SELECT Recipes.recipeId, Recipes.name 
                  FROM Favorites 
                  JOIN Recipes on Recipes.recipeId = Favorites.RecipeRecipeId
                  WHERE userId=(?);`
  
  db.all(query, [userId], (error, rows) => {
      if (error) next(error)
      req.data = rows;
      next()
  })
}

const addFavorites = async (req, res, next) => {
    const userId = req.params.userId;
    const spoonacularId = req.query.recipeId;
    const recipe = await Recipe.findOrCreate({where:{name: req.body.name, recipeId: spoonacularId}})
    const user = await User.findByPk(userId)
    if(Array.isArray(recipe)){
      await user.addRecipe(recipe[0])
    } else {
      await user.addRecipe(recipe)
    }
}

const deleteFavoriteById = (req, res, next) => {
    const userId = req.params.userId;
    const recipeId = req.query.recipeId;
    const query = 'DELETE FROM Favorites WHERE userId=(?) AND RecipeRecipeId=(?)'

    db.run(query,[userId, recipeId], (error) => {
        if (error) next(error)
        next()
    })
}

// Route - /favorites

const router = express.Router();

router.get('/:userId/favorites', findAllFavorites, sendResponse)
router.post('/:userId/favorites', addFavorites, sendResponse)
router.delete('/:userId/favorites', deleteFavoriteById, sendResponse)
router.use(handleError)

module.exports = router