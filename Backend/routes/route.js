const express = require('express')
const UserController = require('../controllers/userController')
const { errorHandler } = require('../helpers/errorHandler')
const VehicleController = require('../controllers/vehicleController')
const ReservationController = require('../controllers/reservationController')
const { authentiaction } = require('../helpers/authentication')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentiaction)

router.post('/vehicles', VehicleController.postVehicle)
router.get('/vehicles', VehicleController.getVehicle)
router.get('/vehicles/:id', VehicleController.getVehicleById)
router.put('/vehicles/:id', VehicleController.putVehicle)
router.delete('/vehicles/:id', VehicleController.deleteVehicle)

router.post('/reservations', ReservationController.postReservation)
router.get('/reservations', ReservationController.getReservation)
router.get('/reservations/:id', ReservationController.getReservationById)
router.put('/reservations/:id', ReservationController.putReservation)
router.patch('/reservations/:id', ReservationController.patchReservation)
router.delete('/reservations/:id', ReservationController.deleteReservation)

router.use(errorHandler)

module.exports = router