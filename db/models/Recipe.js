const db = require('../db');
const {Model, DataTypes} = require('sequelize');

class Recipe extends Model {}

Recipe.init(
  {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    allowNull: false
  },
  {
    sequelize: db,
    modelName: 'Recipe',
    timestamps: false,
  }
);

module.exports = Recipe;
