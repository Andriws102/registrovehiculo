const carsModel = require('./carsModel');

const registrarVehiculo = (req, res) => {
    const vehiculo = req.body;
    carsModel.registrarVehiculo(vehiculo, (error, result) => {
        if (error) {
            console.log(error);
            if(error === "Vehiculo Existente"){
                return res.status(500).json({ mensaje: 'Vehiculo ya se encuentra registrado' });
            }else if(error === "Error Consulta"){
                return res.status(500).json({ mensaje: 'Error en la consulta' });
            }

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

const obtenerVehiculoPorPlaca = (req, res) => {
    const placa = req.params.placa;
    carsModel.obtenerVehiculoPorPlaca(placa, (error, vehiculo) => {
        if(error) {
            return res.status(500).json({mensaje: "Error obteniendo el vehiculo"})
        }else{
            if(vehiculo == undefined){
                return res.status(201).json({mensaje:"No existe"});
            }else{
                return res.status(200).json(vehiculo);
            }
        }
    });
}

const actualizarVehiculo = (req, res) => {
    const vehiculo = req.body;
    carsModel.actualizarVehiculo(vehiculo, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error en la base de datos' });
        }
        return res.json({ mensaje: 'Vehiculo actualizado correctamente' });
    });
    
}

module.exports = {
    registrarVehiculo,
    obtenerVehiculos,
    obtenerVehiculoPorPlaca,
    actualizarVehiculo
}