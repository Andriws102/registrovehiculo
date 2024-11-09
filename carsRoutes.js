const express = require('express');
const router = express.Router();
const carsController = require('./carsController');

/**
 * Se definen rutas del proyecto, tengamos en cuenta los diferentes verbos a usar
 * Create (osea crear registros) = POST
 * Read o retrive (Consultar información) = GET
 * Update (Actualizar un registro existente) = PUT/PATCH
 * Delete (Eliminar un registro existende) = DELETE
 */

//Crear un vehiculo
router.post('/registrar', carsController.registrarVehiculo);
//Obtiene todos los vehiculos
router.get('/vehiculos', carsController.obtenerVehiculos);
//Obtiene vehiculo por placa
router.get('/vehiculos/:placa', carsController.obtenerVehiculoPorPlaca);
//Actualiza un información de un vehiculo
router.put('/vehiculos', carsController.actualizarVehiculo);

module.exports = router;
