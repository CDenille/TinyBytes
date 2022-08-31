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
        let newReview = req.body
        await Recipe.findOrCreate({where:{name: req.body.recipeName, recipeId: req.body.recipe_id}})
        await Review.create({ where: { recipe_id:req.body.recipe_id, userName:req.body.userName, review:req.body.review} });
        console.log('New Review Post', newReview)
      res.status(200).send({newReview});
       
    } catch (error) {
      res.status(500).send(`Could not add the review. This is due to the following server error: ${error}`);
    }
});
module.exports = router