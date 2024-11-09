document.addEventListener('DOMContentLoaded', () =>{
    //Se obtienen componentes desde la página
    const formVehiculo = document.getElementById('formVehiculo');
    const mensaje = document.getElementById('mensaje');
    const consultar = document.getElementById('Consultar');
    const actualizar = document.getElementById('actualizar');
    const registrar = document.getElementById('boton');

    //Si existe el formulario se agrega evento submit
    if(formVehiculo){
        formVehiculo.addEventListener('submit', (e) => {
            e.preventDefault();
            //Se obtiene valores del formulario
            const placa = document.getElementById('placa').value;
            const marca = document.getElementById('marca').value;
            const modelo = document.getElementById('modelo').value;
            const color = document.getElementById('color').value;
            const anio = document.getElementById('anio').value;
            const precio = document.getElementById('precio').value;
        
            const data = JSON.stringify({ placa, marca, modelo, color, anio, precio});
            
            //Se consume el endpoint de registrar el vehiculo
            fetch('http://localhost:4000/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(response => {
                console.log(response); 
                //Se obtiene el json de la respuesta
                return response.json();
            })
            .then(resultado => {
                console.log(resultado);
                //Se agrega mensaje del resultado
                mensaje.innerHTML = resultado.mensaje;
                if(resultado.mensaje !== "Vehiculo ya se encuentra registrado")
                    //Se vacia el formulario
                    formVehiculo.reset();
            })
            .catch(error => {
                console.log(error);
                //Se agrega mensaje de error
                mensaje.innerHTML = 'Error al registrar el vehículo';
            })
        });
    }

    const obtenerVehiculo = () => {
        //Se obtiene valores del formulario
        const placa = document.getElementById("placa");
        const marca = document.getElementById('marca');
        const modelo = document.getElementById('modelo');
        const color = document.getElementById('color');
        const anio = document.getElementById('anio');
        const precio = document.getElementById('precio');

        //Se consume el endpoint de registrar el vehiculo
        fetch(`http://localhost:4000/vehiculos/${placa.value}`)
        .then(response => { 
            if(!response.ok){
                mensaje.innerHTML = 'Error al obtener vehiculo';
            }
            //Se obtiene el json de la respuesta
            return response.json();
        })
        .then(vehiculo => {
            if(!vehiculo.mensaje){
                //Si se encuentra vehiculo se asignan los valores al formulario
                console.log(vehiculo);
                marca.value = vehiculo.marca;
                modelo.value = vehiculo.modelo;
                color.value = vehiculo.color;
                anio.value = vehiculo.year;
                precio.value = vehiculo.precio;
                //Se oculta botón registrar y se muestra el actualizar
                registrar.hidden = true;
                actualizar.hidden = false;
            }else {
                //Se ponen en blanco todos los campos ya que no existe el vehiculo
                marca.value = "";
                modelo.value = "";
                color.value = "";
                anio.value = "";
                precio.value = "";
                //Se oculta botón actualizar y se muestra el registrar
                registrar.hidden = false;
                actualizar.hidden = true;
            }        
        });
    };

    const actualizarVehiculo = () => {
        //Se obtiene valores del formulario
        const placa = document.getElementById('placa').value;
        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const color = document.getElementById('color').value;
        const anio = document.getElementById('anio').value;
        const precio = document.getElementById('precio').value;

        //Se consume el endpoint de registrar el vehiculo
        fetch('http://localhost:4000/vehiculos',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    placa,
                    marca,
                    modelo,
                    color,
                    anio,
                    precio
                })
            })
            .then(response => { 
                console.log(response); 
                //Se obtiene el json de la respuesta
                return response.json();
            })
            .then(resultado => {
                //Se agrega mensaje del resultado
                mensaje.innerHTML = resultado.mensaje;
                //Se vacia el formulario
                formVehiculo.reset();
            })
            .catch(error => {
                console.log(error);
                //Se agrega mensaje de error
                mensaje.innerHTML = "Error no controlado";
            });
    };
    //Si existe el boton actualizar se agrega evento al dar click
    if(actualizar){
        actualizar.addEventListener('click', actualizarVehiculo);
    }

    //Si existe el boton consultar se agrega evento al dar click
    if(consultar){
        consultar.addEventListener('click', obtenerVehiculo);
    }

});