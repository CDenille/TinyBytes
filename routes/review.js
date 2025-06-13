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

const findAllReviews = async (req, res, next) => {
    try {
        const recipeId = req.params.recipeId;
        const reviews = await Review.findAll({
            where: { recipe_id: recipeId },
            attributes: ['userName', 'review', 'image'],
        });

        req.data = reviews;
        next();
    } catch (error) {
        next(error);
    }
};

router.get('/:recipeId/reviews', findAllReviews, sendResponse)

router.post('/reviews', async (req, res) => {
    try {
        let newRecipe = await Recipe.findOrCreate({ where: { name: req.body.recipeName, recipeId: req.body.recipe_id } })
        let newReview = await Review.create({ recipe_id: req.body.recipe_id, userName: req.body.userName, review: req.body.review, image: req.body.image });
        res.status(200).send({ newReview });

    } catch (error) {
        res.status(500).send(`Could not add the review. This is due to the following server error: ${error}`);
    }
});
module.exports = router