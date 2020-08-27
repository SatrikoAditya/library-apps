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
    getFullName() {
      return `${this.first_name} ${this.last_name}`
    }
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
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (instance, opt) => {
    const salt = bcrypt.genSaltSync(10);
    instance.password = bcrypt.hashSync(instance.password, salt);
  })
  return User;
};