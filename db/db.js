const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Create Sequelize instance with Postgres
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important for Neon
    },
  },
  logging: false, // Turn off SQL query logging
});

const connection = async () => {
  try {
    await db.authenticate();
    console.log('✅ Connected to Postgres database');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

connection();

module.exports =  db;
