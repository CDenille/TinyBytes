const express = require('express');
const { Review, Recipe } = require('../db/associations');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite');
const router = express.Router();

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

const findAllReviews = async (req, res, next)=> {
    const recipeId = req.params.recipeId;
    const query = `SELECT Reviews.userName, Reviews.review
                    FROM RecipeReview
                    JOIN Reviews on Reviews.id = RecipeReview.ReviewId
                    WHERE RecipeReview.RecipeRecipeId=(?);`
    
    db.all(query, [recipeId], (error, rows) => {
        if (error) next(error)
        req.data = rows;
        next()
    })
}
  
router.get('/:recipeId/reviews', findAllReviews, sendResponse)

router.post('/:recipeId/reviews', async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const user = await User.findByPk(id);
      if (user) {
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        });
        if (req.body.password) {
          user.set({password: req.body.password});
        }
        res.status(200).send(`Profile information was successfully updated for ${req.body.firstName} ${req.body.lastName}.`);
      } else {
        res.status(409).send(`No current user exist by this userId: ${req.params.userId}.`);
      }
    } catch (error) {
      res.status(500).send(`Could not update the profile information for ${req.body.firstName} ${req.body.lastName}. This is due to the following server error: ${error}`);
    }
  });
module.exports = router