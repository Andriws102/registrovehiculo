const mysql = require('mysql2');
const express = require('express');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transporte'
});

const registrarVehiculo = (vehiculo, callback) => {
    const { placa, marca, modelo, color, anio, precio } = vehiculo;
    let carExists = false;
    /*connection.query(`SELECT * FROM vehiculo WHERE placa = '${placa}'`, (err, results) => {
        if(err){
            return callback("Error Consulta", null);
        } else if (results.length > 0){
            carExists = true;
            return callback("Vehiculo Existente", null);
        }
    });*/

    if(!carExists){
        connection.query(
            `INSERT INTO vehiculo (placa, marca, modelo, color, year, precio) VALUES ('${placa}', '${marca}', '${modelo}', '${color}', '${anio}','${precio}')`,
            (err, results) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log(results);
                    callback(null, results);
                }
            }
        );
    }
}

const obtenerVehiculos = (callback) => {
    connection.query('SELECT * FROM vehiculo', (err, results) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, results);
        }
    });
};

const obtenerVehiculoPorPlaca = (placa, callback) => {
    connection.query(`SELECT * FROM vehiculo WHERE placa = '${placa}'`, (err, results) => {
        if(err){
            callback(err,null);
        }else {
            callback(null, results[0]);
        }
    });
}

const actualizarVehiculo = (vehiculo, callback) => {
    const { placa, marca, modelo, color, anio, precio } = vehiculo;
    
    connection.query(
        `UPDATE vehiculo SET marca = '${marca}', modelo = '${modelo}', color = '${color}', year = '${anio}', precio = '${precio}' WHERE placa = '${placa}'`,
        (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(results);
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