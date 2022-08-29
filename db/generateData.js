const db = require('./db');
const fs = require('fs').promises;
const path = require('path');
const User = require('./models/User')
const Recipe = require('./models/Recipe');
const Review = require('./models/Review')
require('./associations');

const seedUser = async () => {
  const seedPath = path.join(__dirname, './seedData/users.json');
  const buffer = await fs.readFile(seedPath);
  const users = JSON.parse(String(buffer));

  // const usersPromise = users.map(user => User.create(user))
  // await Promise.all(usersPromise)
  users.forEach(async (user) => await User.create(user));
};

const seedRecipe = async () => {
  const seedPath = path.join(__dirname, './seedData/recipes.json');
  const buffer = await fs.readFile(seedPath);
  const recipes = JSON.parse(String(buffer));

  // const recipePromise = recipes.map(recipe => Recipe.create(recipe))
  // await Promise.all(recipePromise)

  recipes.forEach(async (recipe) => await Recipe.create(recipe));
};

const seedReview = async () => {
  const seedPath = path.join(__dirname, './seedData/reviews.json');
  const buffer = await fs.readFile(seedPath);
  const reviews = JSON.parse(String(buffer));
  
  // const reviewPromise = reviews.map(review => Review.create(review))
  // await Promise.all(reviewPromise)

  reviews.forEach(async (review) => await Review.create(review));
};

const randNum = () => {
  const recipiesLength = 8;
  return Math.round(Math.random() * (recipiesLength - 1));
};

const matchUserWithRecipes = async () => {
  const userInstances = await User.findAll();
  const recipeInstances = await Recipe.findAll();
  userInstances.forEach(async (user) => {
    let recipeIds = [];
    for (let i = 0; i < randNum() + 1; i += 1) {
      let recipeId = randNum();
      do {
        recipeId = randNum();
      } while (recipeIds.includes(recipeId));
      recipeIds.push(recipeId);
      await user.addRecipe(recipeInstances[recipeId]);
    }
  });
};

const matchRecipesWithReviews = async () => {
  const reviewInstances = await Review.findAll();
  const recipeInstances = await Recipe.findAll();
  recipeInstances.forEach(async (review) => {
    let recipeIds = [];
    for (let i = 0; i < randNum() + 1; i += 1) {
      let recipeId = randNum();
      do {
        recipeId = randNum();
      } while (recipeIds.includes(recipeId));
      recipeIds.push(recipeId);
      await review.addReview(reviewInstances[recipeId]);
    }
  });
};

const generateData = async () => {
  //Seed individual model data

  await db.sync({force: true})
  await seedUser();
  await seedRecipe();
  await seedReview();

  // //Create relationships between individual model data
  await matchUserWithRecipes();
  await matchRecipesWithReviews();

  console.log('Database seeded!');
};

generateData();