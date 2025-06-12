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

  return Promise.all(users.map(user => User.create(user)));
};

const seedRecipe = async () => {
  const seedPath = path.join(__dirname, './seedData/recipes.json');
  const buffer = await fs.readFile(seedPath);
  const recipes = JSON.parse(String(buffer));

  return Promise.all(recipes.map(recipe => Recipe.create(recipe)));
};

const seedReview = async () => {
  const seedPath = path.join(__dirname, './seedData/reviews.json');
  const buffer = await fs.readFile(seedPath);
  const reviews = JSON.parse(String(buffer));

  return Promise.all(reviews.map(review => Review.create(review)));
};

const randNum = (max) => Math.floor(Math.random() * max);

const matchUserWithRecipes = async () => {
  const users = await User.findAll();
  const recipes = await Recipe.findAll();
  const recipeCount = recipes.length;

  for (const user of users) {
    const recipeIds = new Set();
    const howMany = randNum(recipeCount) + 1;

    while (recipeIds.size < howMany) {
      recipeIds.add(randNum(recipeCount));
    }

    for (const id of recipeIds) {
      await user.addRecipe(recipes[id]);
    }
  }
};

const matchRecipesWithReviews = async () => {
  const reviews = await Review.findAll();
  const recipes = await Recipe.findAll();
  const reviewCount = reviews.length;

  for (const recipe of recipes) {
    const reviewIds = new Set();
    const howMany = randNum(reviewCount) + 1;

    while (reviewIds.size < howMany) {
      reviewIds.add(randNum(reviewCount));
    }

    for (const id of reviewIds) {
      await recipe.addReview(reviews[id]);
    }
  }
};

const generateData = async () => {
  try {
    await db.sync({ force: true });

    await seedUser();
    await seedRecipe();
    await seedReview();

    await matchUserWithRecipes();
    await matchRecipesWithReviews();

    console.log("✅ Database seeding complete.");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await db.close();
  }
};

generateData();