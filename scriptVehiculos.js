document.addEventListener('DOMContentLoaded', () => {
    const vehiculosLista = document.getElementById("vehiculosLista");

    const obtenerVehiculos = () => {

        let elemento = vehiculosLista.querySelector("li");
        while(elemento !== null){
            vehiculosLista.removeChild(elemento);
            elemento = vehiculosLista.querySelector("li");
        }

        fetch("http://localhost:4000/vehiculos")
        .then(response => response.json())
        .then(vehiculos => {
            vehiculos.forEach(vehiculo => {
                const li = document.createElement("li");
                li.textContent = `${vehiculo.placa} - ${vehiculo.marca}`;
                vehiculosLista.appendChild(li);
            });
        })
    };
    obtenerVehiculos();
    setInterval(obtenerVehiculos, 5000);
});