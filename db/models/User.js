//imports here
const bcrypt = require('bcrypt');
const db = require('../db');
const {Model, DataTypes} = require('sequelize');

const SALT_ROUNDS = 2;

class User extends Model {
  // add methods here
  static async findByEmail(email) {
    const user = await User.findOne({where: {email: email}});
    return user;
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true,
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true,

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 0= false 1=true
    developer: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    // maybe set up uuid for api key???
    apiKey: {
      type: DataTypes.STRING,
      unique: true,
    }
  },
  {
    sequelize: db,
    timestamps: false,
  }
);
module.exports = User;


const hashPassword = async (user) => {
  // in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
  users.forEach(hashPassword);
});
