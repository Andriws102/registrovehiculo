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

const obtenerVehiculos = (req, res) => {
    carsModel.obtenerVehiculos((error, vehiculos) => {
        if(error){
            return res.status(500).json({ mensaje: "Error obteniendo los vehiculos"});
        }
        return res.status(200).json(vehiculos);
    });
}

module.exports = {
    registrarVehiculo,
    obtenerVehiculos
}