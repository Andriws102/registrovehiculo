const carsModel = require('./carsModel');

/**
 * Función que registra un vehiculo
 * @param {*} req Petición con los datos del vehiculo
 * @param {*} res Respuesta al servidor
 */
const registrarVehiculo = (req, res) => {
    //Obtenemos los datos enviados en el body de la petición
    const vehiculo = req.body;
    //Ejecutamos registrarVehiculo definido en el modelo, Creamos una función callback para procesar el resultado
    carsModel.registrarVehiculo(vehiculo, (error, result) => {
        //Si hay error
        if (error) {
            console.log(error);
            //Si el error es vehiculo existente mandamos un mensaje especifico.
            if(error === "Vehiculo Existente"){
                return res.status(500).json({ mensaje: 'Vehiculo ya se encuentra registrado' });
            // Si el error es error consulta lo especificamos (Esto con el fin de identificar donde falla)
            }else if(error === "Error Consulta"){
                return res.status(500).json({ mensaje: 'Error en la consulta' });
            }
            // Si no es ninguno de los errores especificados con anterioridad se envía un mensaje generico
            return res.status(500).json({ mensaje: 'Error en la base de datos' });
        }

        //Si no hay error se devuelve mensaje de exito.
        return res.json({ mensaje: 'Vehiculo registrado' });
    });
    
}

/**
 * Función que devuelve todos los vehiculos registrados
 * @param {*} req Petición con los datos del vehiculo (NO SE USA EN ESTA FUNCIÓN)
 * @param {*} res Respuesta al servidor
 */
const obtenerVehiculos = (req, res) => {
    //Ejecutamos obtenerVehiculos definido en el modelo, Creamos una función callback para procesar el resultado
    carsModel.obtenerVehiculos((error, vehiculos) => {
        //Si hay error
        if(error){
            // Se envía un mensaje generico de error
            return res.status(500).json({ mensaje: "Error obteniendo los vehiculos"});
        }
        //Si no hay error se devuelve los vehiculos encontrados.
        return res.status(200).json(vehiculos);
    });
}

/**
 * Función que consulta un vehiculo por placa
 * @param {*} req Petición con la placa del vehiculo
 * @param {*} res Respuesta al servidor
 */
const obtenerVehiculoPorPlaca = (req, res) => {
    //Obtenemos la placa enviada como parámetro en la petición
    const placa = req.params.placa;
    //Ejecutamos obtenerVehiculoPorPlaca definido en el modelo, Creamos una función callback para procesar el resultado
    carsModel.obtenerVehiculoPorPlaca(placa, (error, vehiculo) => {
        //Si hay error
        if(error) {
            // Se envía un mensaje generico de error
            return res.status(500).json({mensaje: "Error obteniendo el vehiculo"})
        }else{
            //Si no hay error se valida si se encontro algún vehiculo.
            if(vehiculo == undefined){
                //Si no se encontro se devuelve mensaje que no existe
                return res.status(200).json({mensaje:"No existe"});
            }else{
                //Si se encontro vehiculo se devuelve el vehiculo encontrado.
                return res.status(200).json(vehiculo);
            }
        }
    });
}

/**
 * Función que actualiza un vehiculo por placa
 * @param {*} req Petición con los datos del vehiculo
 * @param {*} res Respuesta al servidor
 */
const actualizarVehiculo = (req, res) => {
    //Se obtiene datos del vehiculo.
    const vehiculo = req.body;
    //Ejecutamos actualizarVehiculo definido en el modelo, Creamos una función callback para procesar el resultado
    carsModel.actualizarVehiculo(vehiculo, (error, result) => {
       //Si hay error 
        if (error) {
            console.log(error);
            // Se envía un mensaje generico de error 
            return res.status(500).json({ mensaje: 'Error en la base de datos' });
        }
        //Si no hay error se devuelve mensaje de confirmación
        return res.json({ mensaje: 'Vehiculo actualizado correctamente' });
    });
    
}

module.exports = {
    registrarVehiculo,
    obtenerVehiculos,
    obtenerVehiculoPorPlaca,
    actualizarVehiculo
}