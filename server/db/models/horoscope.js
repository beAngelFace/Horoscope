'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horoscope extends Model {
  
    static associate(models) {
      this.belongsTo(models.Group, {foreignKey: "groupId"})
    }
  }
  Horoscope.init({
    date: DataTypes.DATE,
    prediction: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Horoscope',
  });
  return Horoscope;
};