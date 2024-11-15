$(document).ready(function(){

    function mostrarPostBBDD(mensaje){
        $('#contDatosAgenda').empty();
        $('#contDatosAgenda').append(`<div>${mensaje}</div>`);
        setTimeout(function(){
            $('#contDatosAgenda').empty();
            $('#contFormMain').empty();
            $('#contFormMain').css('visibility','hidden');
            cargarDatosAgenda();
        },1500);
    }

    async function verDatos() {
        return new Promise((resolve, reject) => {   // hay que definir que returnee una promesa o se salta el await
            $.ajax({
                type: 'POST',
                url: '../php/verDatos.php',
                data: $(this).serialize(),
                success: function(response) {
                    resolve(JSON.parse(response));  // devuelve la respuesta ya parseada
                },
                error: function(xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    async function cargarDatosAgenda(){
        let datosAgenda= await verDatos();  // cargamos datos
        datosAgenda=datosAgenda.sort((a, b) => parseInt(a.indice) - parseInt(b.indice)); // ordenamos
        for(let dato of datosAgenda){ // metemos en pantalla
            $('#contDatosAgenda').append(`
                <div class="tarjeta">
                    <img src="${dato.foto}"class="fotoUser">
                    <div class="contacto">
                        <h2>${dato.nombre} ${dato.apellido1} ${dato.apellido2}</h2>
                        <p>ID: ${dato.indice}</p>
                        <p>DNI: ${dato.DNI}</p>
                        <p>Direccion: ${dato.direccion}</p>
                        <p>Tlfno: ${dato.telefono}</p>
                    </div>
                </div>
            `);
        }
    }

    async function borrarDatosAgenda(){
        let datosAgenda= await verDatos();
        datosAgenda=datosAgenda.sort((a, b) => parseInt(a.indice) - parseInt(b.indice));
        for(let dato of datosAgenda){   // mostramos solo datos clave y un boton para borrar
            $('#contDatosAgenda').append(`
                <div class="tarjeta">
                    <img src="${dato.foto}"class="fotoUser">
                    <div class="contacto">
                        <p>${dato.indice}</p>
                        <p>DNI: ${dato.DNI}</p>
                    </div>
                    <button class="botonJquery">Borrar</button>
                </div>
            `);
        }
        $('.botonJquery').click(function(){   // funcionalidad para el boton, importante que esté dentro de la misma funcion que crea al selector
            let indice = $(this).parent().find('p:first').text();
            console.log("***: ",indice);
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: '../php/borrarDatos.php',
                    data: {indice},
                    success: function(response) {
                        resolve(mostrarPostBBDD(response));
                    },
                    error: function(xhr, status, error) {
                        reject(error);
                    }
                });
            });
            
        });
    }

    async function nuevoDatoAgenda(){
        let datosAgenda= await verDatos();
        datosAgenda=datosAgenda.sort((a, b) => parseInt(a.indice) - parseInt(b.indice));
        let numDatos=datosAgenda.length;    // para hallar el ultimo indice y sumarle 1
        let nuevoIndice=(datosAgenda[numDatos-1].indice);
        nuevoIndice++;
        $('#contFormMain').append(`<div>
            <form id="nuevoCform">

            <input type="hidden" id="indice" name="indice" required value='${nuevoIndice}'>

            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required value="" autofocus>

            <label for="apellido1">Apellido 1:</label>
            <input type="text" id="apellido1" name="apellido1" required value="">

            <label for="apellido2">Apellido 2:</label>
            <input type="text" id="apellido2" name="apellido2" required value="">

            <label for="DNI">DNI:</label>
            <input type="text" id="DNI" name="DNI" required value="">

            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" required value="">

            <label for="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono" required value="">

            <label for="fotoDirecc">Foto Dirección:</label>
            <select name="fotoDirecc" id="fotoDirecc">
                <option value="../pics/01.png" selected>Foto 1</option>
                <option value="../pics/02.png">Foto 2</option>
                <option value="../pics/03.png">Foto 3</option>
                <option value="../pics/04.png">Foto 4</option>
                <option value="../pics/05.png">Foto 5</option>
                <option value="../pics/06.png">Foto 6</option>
                <option value="../pics/07.png">Foto 7</option>
                <option value="../pics/08.png">Foto 8</option>
                <option value="../pics/09.png">Foto 9</option>
                <option value="../pics/10.png">Foto 10</option>
            </select>
            <input id="envNueDatos" type="submit" value="Enviar">
            </form>
        </div>`);

        $('#nuevoCform').submit(function(e){    // envio del form con los datos paa updatear
            e.preventDefault(); 
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: '../php/nuevoDato.php',
                    data: $(this).serialize(),
                    success: function(response) {
                        resolve(mostrarPostBBDD(response));
                    },
                    error: function(xhr, status, error) {
                        reject(error);
                    }
                });
            });
            
        });
    }

    async function modificarCAgenda(){
        let datosAgenda= await verDatos();
        datosAgenda=datosAgenda.sort((a, b) => parseInt(a.indice) - parseInt(b.indice));
        for(let dato of datosAgenda){   // mostramos datos con boton de modificar
            $('#contDatosAgenda').append(`
                <div class="tarjeta">
                    <img src="${dato.foto}"class="fotoUser">
                    <div class="contacto">
                        <p>${dato.indice}</p>
                        <p>DNI: ${dato.DNI}</p>
                    </div>
                    <button class="botonJquery">Modificar</button>
                </div>
            `);
        }
        $('.botonJquery').click(function(){ // funcionalidad del boton de modificar
            $('#contDatosAgenda').empty();
            $('#contFormMain').empty();
            $('#contFormMain').css('visibility','visible');
            let indice = $(this).parent().find('p:first').text();   // formulario con los datos
            $('#contFormMain').append(`<div>
                <form id="cambioCform">
                <input type="hidden" id="indice" name="indice" required value='${indice}'>

            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required value="" autofocus>

            <label for="apellido1">Apellido 1:</label>
            <input type="text" id="apellido1" name="apellido1" required value="">

            <label for="apellido2">Apellido 2:</label>
            <input type="text" id="apellido2" name="apellido2" required value="">

            <label for="DNI">DNI:</label>
            <input type="text" id="DNI" name="DNI" required value="">

            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" required value="">

            <label for="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono" required value="">

            <label for="fotoDirecc">Foto Dirección:</label>
            <select name="fotoDirecc" id="fotoDirecc">
                <option value="../pics/01.png" selected>Foto 1</option>
                <option value="../pics/02.png">Foto 2</option>
                <option value="../pics/03.png">Foto 3</option>
                <option value="../pics/04.png">Foto 4</option>
                <option value="../pics/05.png">Foto 5</option>
                <option value="../pics/06.png">Foto 6</option>
                <option value="../pics/07.png">Foto 7</option>
                <option value="../pics/08.png">Foto 8</option>
                <option value="../pics/09.png">Foto 9</option>
                <option value="../pics/10.png">Foto 10</option>
            </select>
                <input id="envNueDatos" type="submit" value="Enviar">
                </form>
            </div>`);

            $('#cambioCform').submit(function(e){   // envio de los datos
                e.preventDefault(); 
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: '../php/modificarDato.php',
                        data: $(this).serialize(),
                        success: function(response) {
                            resolve(mostrarPostBBDD(response));
                        },
                        error: function(xhr, status, error) {
                            reject(error);
                        }
                    });
                });
                
            });
            
            
        });
    }
    /* Funcionalidades de botones de navegacion*/
    $('#mostrarC').click(function(){
        $('#contDatosAgenda').empty();
        $('#contFormMain').empty();
        $('#contFormMain').css('visibility','hidden');
        cargarDatosAgenda();
        $('nav').find('p:first').html('Menu: Agenda');
    });
    
    $('#borrarC').click(function(){
        $('#contDatosAgenda').empty();
        $('#contFormMain').empty();
        $('#contFormMain').css('visibility','hidden');
        borrarDatosAgenda();
        $('nav').find('p:first').text('Menu: Borrar contacto');
    });

    $('#nuevoC').click(function(){
        $('#contDatosAgenda').empty();
        $('#contFormMain').empty();
        $('#contFormMain').css('visibility','visible');
        nuevoDatoAgenda();
        $('nav').find('p:first').text('Menu: Nuevo contacto');
    });

    $('#modificarC').click(function(){
        $('#contDatosAgenda').empty();
        $('#contFormMain').empty();
        $('#contFormMain').css('visibility','hidden');
        modificarCAgenda();
        $('nav').find('p:first').text('Menu: Modificar contacto');
    });

    
    
});