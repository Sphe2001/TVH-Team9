const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StaffNO: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Role: {
    type: DataTypes.ENUM("PoliceAdmin", "SecurityAdmin", "Municipality", "SystemAdmin"),
    allowNull: false,
  },
});

module.exports = User;
