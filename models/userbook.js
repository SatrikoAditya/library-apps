'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBook.belongsTo(models.User, { foreignKey : 'user_id' })
      UserBook.belongsTo(models.Book, { foreignKey : 'book_id' })
    }
  };
  UserBook.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    rent_date: DataTypes.DATE,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserBook',
  });
  return UserBook;
};