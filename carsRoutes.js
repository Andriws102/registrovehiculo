const express = require('express');
const router = express.Router();
const carsController = require('./carsController');

router.post('/registrar', carsController.registrarVehiculo);


module.exports = router;
