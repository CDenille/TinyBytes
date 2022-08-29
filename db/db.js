const { Sequelize } = require('sequelize');
const path = require('path');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite'),
  logging: false,
});

const connection = async () => {
  try {
    await db.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connection();

module.exports =  db;
