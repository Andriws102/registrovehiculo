const mysql = require('mysql2');
const express = require('express');

//Se define la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transporte'
});

/**
 * Función que almacena un vehiculo nuevo en la base de datos.
 * @param {*} vehiculo datos del vehiculo
 * @param {*} callback función que procesa el resultado
 */
const registrarVehiculo = (vehiculo, callback) => {
    //Extraemos los datos del vehiculo.
    const { placa, marca, modelo, color, anio, precio } = vehiculo;
    //Consultamos la placa del vehiculo para validar su existencia.
    connection.query(`SELECT * FROM vehiculo WHERE placa = '${placa}'`, (err, results) => {
        //Si hay un error
        if(err){
            //se devuelve error generico de la consulta.
            callback("Error Consulta", null);
        } else if (results && results.length > 0){
            //Si no hay error pero se encontro algún vehiculo, se devuelve error de vehiculo existente
            callback("Vehiculo Existente", null);
        }else {
            //Si no hay error ni existe el vehiculo se inserta en la base de datos.
            connection.query(
                `INSERT INTO vehiculo (placa, marca, modelo, color, year, precio) VALUES ('${placa}', '${marca}', '${modelo}', '${color}', '${anio}','${precio}')`,
                (err, results) => {
                    //Si hay error
                    if (err) {
                        console.log(err);
                        //Se devuelve información del error
                        callback(err, null);
                    } else {
                        console.log(results);
                        //Si no hay error se devuelve el resultado
                        callback(null, results);
                    }
                }
            )
        }
    });
}

/**
 * Funcion que obtiene todos los vehiculos almacenados en la base de datos.
 * @param {*} callback Función que proceso el resultado
 */
const obtenerVehiculos = (callback) => {
    //Se consulta todos los vehiculos en la base de datos
    connection.query('SELECT * FROM vehiculo', (err, results) => {
        //Si hay error
        if(err){
            //Se devuelve información del error
            callback(err, null);
        }else{
            //Si no hay error se devuelve el resultado
            callback(null, results);
        }
    });
};

/**
 * Función que obtiene un vehiculo por placa que se encuentra almacenado en la base de datos.
 * @param {*} placa Placa del vehiculo a consultar.
 * @param {*} callback Función que procesa el resultado.
 */
const obtenerVehiculoPorPlaca = (placa, callback) => {
    //Se consulta el vehiculo por la placa dada
    connection.query(`SELECT * FROM vehiculo WHERE placa = '${placa}'`, (err, results) => {
        //Si hay error
        if(err){
            //Se devuelve información del error
            callback(err,null);
        }else {
            //Si no hay error se devuelve el resultado
            callback(null, results[0]);
        }
    });
}

/**
 * Función que actualiza los datos del vehiculo, dado una placa.
 * @param {*} vehiculo Datos del vehiculo.
 * @param {*} callback Función que procesa el resultado
 */
const actualizarVehiculo = (vehiculo, callback) => {
    //Extraemos los datos del vehiculo.
    const { placa, marca, modelo, color, anio, precio } = vehiculo;
    //Se ejecuta el update en la base de datos
    connection.query(
        `UPDATE vehiculo SET marca = '${marca}', modelo = '${modelo}', color = '${color}', year = '${anio}', precio = '${precio}' WHERE placa = '${placa}'`,
        (err, results) => {
            //Si hay error
            if (err) {
                console.log(err);
                //Se devuelve información del error
                callback(err, null);
            } else {
                console.log(results);
                //Si no hay error se devuelve el resultado
                callback(null, results);
            }
        }
    );
}

module.exports = {
    registrarVehiculo,
    obtenerVehiculos,
    obtenerVehiculoPorPlaca,
    actualizarVehiculo
}