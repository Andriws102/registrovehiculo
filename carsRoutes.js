const express = require('express');
const router = express.Router();
const carsController = require('./carsController');

router.post('/registrar', carsController.registrarVehiculo);
router.get('/vehiculos', carsController.obtenerVehiculos);
router.get('/vehiculos/:placa', carsController.obtenerVehiculoPorPlaca);

module.exports = router;
