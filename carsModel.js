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

module.exports = {
    registrarVehiculo
}