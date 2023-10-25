const { User, Vehicle, sequelize, Reservation } = require('../models')

class ReservationController {

  static async getReservation(req, res, next) {
    try {
      const fetchReservation = await Reservation.findAll({include: {all:true}})

      res.status(200).json(fetchReservation)
    } catch (error) {
      next(error)
    }
  }

  static async getReservationById(req, res, next) {
    try {
      const { id } = req.params
      const fetchReservation = await Reservation.findByPk(id)

      if (!fetchReservation) throw { name: 'NotFound' }

      res.status(200).json(fetchReservation)
    } catch (error) {
      next(error)
    }
  }

  static async postReservation(req, res, next) {
    try {

      const { vehicleId, status } = req.body
      const {id} = req.user

      const newReservation = await Reservation.create({ userId: id, vehicleId, status, approvedByAdmin: false});

      res.status(201).json(newReservation)

    } catch (error) {
      next(error)
    }
  }

  static async putReservation(req, res, next) {
    try {
      const { id } = req.params
      const { vehicleId, status } = req.body
      const userId = req.user.id

      const findReservation = await Reservation.findByPk(id)
      if (!findReservation) {
        throw { name: 'NotFound' }
      }

      const updatedReservation = await Reservation.update({ vehicleId, status}, {
        where: {
          id
        }
      })

      res.status(200).json(updatedReservation)

    } catch (error) {
      next(error)
    }
  }

  static async patchReservation(req, res, next) {
    try {
      const { id } = req.params
      if (req.user.role !== 'admin') {
        throw {name: 'Unauthorized'}
      }

      const findReservation = await Reservation.findByPk(id)
      if (!findReservation) {
        throw { name: 'NotFound' }
      }

      const updatedReservation = await Reservation.update({ approvedByAdmin: true}, {
        where: {
          id
        }
      })

      res.status(200).json(updatedReservation)

    } catch (error) {
      next(error)
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const { id } = req.params

      const findReservation = await Reservation.findByPk(id)
      if (!findReservation) {
        throw { name: 'NotFound' }
      }

      const deletedReservation = await Reservation.destroy({
        where: {
          id
        }
      })

      res.status(200).json(deletedReservation)
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ReservationController