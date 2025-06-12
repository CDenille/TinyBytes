const db = require('../db');
const { Model, DataTypes } = require('sequelize');

class Review extends Model {}

Review.init(
  {
    userName: DataTypes.STRING,
    review: DataTypes.TEXT,
    image: DataTypes.STRING
  },
  {
    sequelize: db,
    modelName: 'Review',
    timestamps: false,
  }
);

module.exports = Review;