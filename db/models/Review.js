const db = require('../db');
const { Model, DataTypes } = require('sequelize');

class Review extends Model {}

Review.init(
  {
    userName: DataTypes.STRING,
    review: DataTypes.TEXT,
    image: DataTypes.STRING,
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'recipeId',
      }
    }
  },
  {
    sequelize: db,
    modelName: 'Review',
    tableName: 'Reviews',
    timestamps: false,
  }
);

module.exports = Review;