const db = require('../db');
const { Model, DataTypes } = require('sequelize');

class Review extends Model {
  // add methods here
}

Review.init(
  {
    userName: DataTypes.STRING,
    review: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

module.exports = Review;