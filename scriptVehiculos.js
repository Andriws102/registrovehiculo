document.addEventListener('DOMContentLoaded', () => {
    const vehiculosLista = document.getElementById("vehiculosLista");

    fetch("http://localhost:4000/vehiculos").
    then(response => response.json())
    .then(vehiculos => {
        console.log(vehiculos);
        vehiculos.forEach(vehiculo => {
            const li = document.createElement("li");
            li.textContent = `${vehiculo.placa} - ${vehiculo.marca}`;
            vehiculosLista.appendChild(li);
        });
    })
});