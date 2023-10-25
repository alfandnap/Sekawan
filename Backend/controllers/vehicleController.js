const { User, Vehicle, sequelize, Reservation } = require('../models')

class VehicleController {

  static async getVehicle(req, res, next) {
    try {
      const fetchVehicle = await Vehicle.findAll()

      res.status(200).json(fetchVehicle)
    } catch (error) {
      next(error)
    }
  }

  static async getVehicleById(req, res, next) {
    try {
      const { id } = req.params
      const fetchVehicle = await Vehicle.findByPk(id)

      if (!fetchVehicle) throw { name: 'NotFound' }

      res.status(200).json(fetchVehicle)
    } catch (error) {
      next(error)
    }
  }

  static async postVehicle(req, res, next) {
    try {

      const { name, type, status } = req.body

      const newVehicle = await Vehicle.create({ name, type, status });

      res.status(201).json(newVehicle)

    } catch (error) {
      next(error)
    }
  }

  static async putVehicle(req, res, next) {
    try {
      const { id } = req.params
      const { name, type, status } = req.body

      const findVehicle = await Vehicle.findByPk(id)
      if (!findVehicle) {
        throw { name: 'NotFound' }
      }

      const updatedVehicle = await Vehicle.update({ name, type, status }, {
        where: {
          id
        }
      })

      res.status(200).json(updatedVehicle)

    } catch (error) {
      next(error)
    }
  }

  static async deleteVehicle(req, res, next) {
    try {
      const { id } = req.params

      const findVehicle = await Vehicle.findByPk(id)
      if (!findVehicle) {
        throw { name: 'NotFound' }
      }

      const deletedVehicle = await Vehicle.destroy({
        where: {
          id
        }
      })

      res.status(200).json(deletedVehicle)
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = VehicleController