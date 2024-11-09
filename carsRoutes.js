const express = require('express');
const router = express.Router();
const carsController = require('./carsController');

router.post('/registrar', carsController.registrarVehiculo);
router.get('/vehiculos', carsController.obtenerVehiculos);

module.exports = router;
