const carsModel = require('./carsModel');

const registrarVehiculo = (req, res) => {
    const vehiculo = req.body;
    carsModel.registrarVehiculo(vehiculo, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error en la base de datos' });
        }
        return res.json({ mensaje: 'Vehiculo registrado' });
    });
    
}

module.exports = {
    registrarVehiculo
}