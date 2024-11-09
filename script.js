document.addEventListener('DOMContentLoaded', () =>{
const formVehiculo = document.getElementById('formVehiculo');
const mensaje = document.getElementById('mensaje');
const consultar = document.getElementById('Consultar');

if(formVehiculo){
    formVehiculo.addEventListener('submit', (e) => {
        e.preventDefault();
        const placa = document.getElementById('placa').value;
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const color = document.getElementById('color').value;
        const anio = document.getElementById('anio').value;
        const precio = document.getElementById('precio').value;
       
        const data = JSON.stringify({ placa, marca, modelo, color, anio, precio});
        

        console.log(data);

        fetch('http://localhost:4000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => {
            console.log(response); 
            return response.json();
        })
        .then(resultado => {
            console.log(resultado);
            mensaje.innerHTML = resultado.mensaje;
            formVehiculo.reset();
        })
        .catch(error => {
            console.log(error);
            mensaje.innerHTML = 'Error al registrar el vehículo';
        })
    });
}

const obtenerVehiculo = () => {
    const placa = document.getElementById("placa");
    const marca = document.getElementById('marca');
    const modelo = document.getElementById('modelo');
    const color = document.getElementById('color');
    const anio = document.getElementById('anio');
    const precio = document.getElementById('precio');

    fetch(`http://localhost:4000/vehiculos/${placa.value}`)
    .then(response => { 
        if(!response.ok){
            mensaje.innerHTML = 'Error al obtener vehiculo';
        }
        return response.json();
    })
    .then(vehiculo => {
        if(!vehiculo.mensaje){
            console.log(vehiculo);
            marca.value = vehiculo.marca;
            modelo.value = vehiculo.modelo;
            color.value = vehiculo.color;
            anio.value = vehiculo.year;
            precio.value = vehiculo.precio;
        }        
    });
};

if(consultar){
    consultar.addEventListener('click', obtenerVehiculo);
}

});