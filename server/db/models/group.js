'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
  
    static associate(models) {
     
      this.hasMany(models.User, { foreignKey: "groupId" });
      this.hasMany(models.Horoscope, { foreignKey: "groupId" });
    }
  }
  Group.init({
    team: DataTypes.STRING,
    start: DataTypes.DATE,
    graduation: DataTypes.DATE,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
