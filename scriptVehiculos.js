document.addEventListener('DOMContentLoaded', () => {
    //Se obtienen componentes desde la página
    const vehiculosLista = document.getElementById("vehiculosLista");

    /**
     * Obtiene todos los vehiculos
     */
    const obtenerVehiculos = () => {
        //Obtenemos elementos li del listado de vehiculos
        let elemento = vehiculosLista.querySelector("li");
        //Mientras exista elementos hijos
        while(elemento !== null){
            //Se elimina el elemento hijo
            vehiculosLista.removeChild(elemento);
            //Se consulta si hay mas elementos hijos li
            elemento = vehiculosLista.querySelector("li");
        }

        //Se consume endpoint para obtener todos los vehiculos
        fetch("http://localhost:4000/vehiculos")
        .then(response => response.json())
        .then(vehiculos => {
            //Por cada vehiculo devuelto
            vehiculos.forEach(vehiculo => {
                //Se crea un elemento li
                const li = document.createElement("li");
                //Se le asigna texto al elemento
                li.textContent = `${vehiculo.placa} - ${vehiculo.marca}`;
                //Se agrega como hijo del listado de vehiculoss
                vehiculosLista.appendChild(li);
            });
        })
    };
    //Se ejecuta la obtención de vehiculos
    obtenerVehiculos();
    //Se configura la ejecución del método de obtener vehiculos cada 5 segundos (5000ms)
    setInterval(obtenerVehiculos, 5000);
});