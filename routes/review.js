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
                    FROM Reviews
                    JOIN Recipes on Recipes.recipeId = Reviews.recipe_id
                    WHERE Reviews.recipe_id=(?);`
    
    db.all(query, [recipeId], (error, rows) => {
        if (error) next(error)
        req.data = rows;
        next()
    })
}
  
router.get('/:recipeId/reviews', findAllReviews, sendResponse)

router.post('/reviews', async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        console.log('New Review Post', newReview)
      res.status(200).send(`Profile information was successfully updated for ${req.body.recipe_id} ${req.body.userName}.`);
       
    } catch (error) {
      res.status(500).send(`Could not add the review. This is due to the following server error: ${error}`);
    }
  });
module.exports = router