'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'first name is required!'
        }
      }
    },
    last_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'last name is required!'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'email is required!'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'password is required!'
        }
      }
    },
    phone_number: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'phone number is required!'
        }
      }
    },
    address: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty : {
          args : true,
          msg : 'address is required!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate : (instance, options) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.log(err);
          } else {
            bcrypt.hash(instance.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              } else {
                instance.password = hash;
              }
            })
          }
        })
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};