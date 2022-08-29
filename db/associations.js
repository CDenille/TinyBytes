const User = require("./models/User");
const Recipe = require("./models/Recipe");
const Review = require("./models/Review");
const {Model, DataTypes} = require("sequelize");
const db = require("./db");


User.belongsToMany(Recipe, {through: "Favorites"});
Recipe.belongsToMany(User, {
    through: "Favorites"});

Review.belongsTo(Recipe, {
    sourceKey: 'recipeId'
});
Recipe.hasMany(Review, {
    targetKey:'id'
});

// Review.belongsToMany(Recipe, {
//     through: 'RecipeReview'
// });
// Recipe.belongsToMany(Review, {
//     through: 'RecipeReview',
//     sourceKey:'recipeId'
// });
module.exports = {db, User, Recipe, Review};
