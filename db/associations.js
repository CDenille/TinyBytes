const User = require("./models/User");
const Recipe = require("./models/Recipe");
const Review = require("./models/Review");
const {Model, DataTypes} = require("sequelize");
const db = require("./db");


User.belongsToMany(Recipe, {through: "Favorites"});
Recipe.belongsToMany(User, {through: "Favorites"});
    
Recipe.hasMany(Review, {
    foreignKey: 'recipe_id',
    targetKey:'id'
});

module.exports = {db, User, Recipe, Review};
