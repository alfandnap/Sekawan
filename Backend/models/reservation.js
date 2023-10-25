'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Reservation.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });
    }
  }
  Reservation.init({
    userId: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    approvedByAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};