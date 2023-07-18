const db = require('../db');
const {Model, DataTypes} = require('sequelize');

class Recipe extends Model {}

Recipe.init(
  {
    recipeId: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    name: DataTypes.STRING,
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

module.exports = Recipe;
