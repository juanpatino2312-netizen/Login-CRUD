function mostrarSeccion(){
    document.getElementById("seccion").style.display = "block";
    let boton = document.getElementById("boton");

    boton.style.position = "fixed";
    boton.style.top = "10px";
    boton.style.left = "50%";
    boton.style.transform = "translateX(-50%)";
}

// OBTENER ROL
const rol = sessionStorage.getItem("rol");

console.log(rol);

const formulario = document.getElementById("formulario");
const tablaUsuarios = document.getElementById("tablaUsuarios");

// CARGAR DATOS GUARDADOS
tablaUsuarios.innerHTML = localStorage.getItem("tabla") || "";

// SI ES INVITADO
if(rol === "invitado"){

    // OCULTAR BOTONES EDITAR
    document.querySelectorAll(".editar").forEach(boton => {

        boton.style.display = "none";

    });

    // OCULTAR BOTONES ELIMINAR
    document.querySelectorAll(".eliminar").forEach(boton => {

        boton.style.display = "none";

    });

}

// SI ES INVITADO
if(rol === "invitado"){

    // BLOQUEAR INPUTS
    document.getElementById("nombre").disabled = true;

    document.getElementById("apellido").disabled = true;

    document.getElementById("correo").disabled = true;

    document.getElementById("numero").disabled = true;

    document.getElementById("fecha").disabled = true;

    document.getElementById("grado").disabled = true;

    // BLOQUEAR BOTÓN GUARDAR
    formulario.querySelector("button[type='submit']").disabled = true;

}

let filaEditando = null;

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    // Obtener datos
    const nombre = document.getElementById("nombre").value;

    const apellido = document.getElementById("apellido").value;

    const correo = document.getElementById("correo").value;

    const numero = document.getElementById("numero").value;

    const fecha = document.getElementById("fecha").value
    
    const grado = document.getElementById("grado").value

    // Validar nombre
    if(/\d/.test(nombre)){

        alert("El nombre no puede contener números");

        return;
    }

    // Validar apellido
    if(/\d/.test(apellido)){

        alert("El apellido no puede contener números");

        return;
    }

    // Validar gmail
    if(!correo.endsWith("@gmail.com")){

        alert("El correo debe terminar solo en @gmail.com");

        return;
    }

    // Validar numero
    if(isNaN(numero) || numero.length !== 10){

        alert("El número debe tener exactamente 10 dígitos");

        return;
    }

    // Validar grado
    if(isNaN(grado) || grado.length !== 4){

        alert("El grado solo puede tener máximo 4 dígitos");

        return;
    }

    // SI ESTÁ EDITANDO
    if(filaEditando){

        filaEditando.children[1].textContent = nombre;

        filaEditando.children[2].textContent = apellido;

        filaEditando.children[3].textContent = correo;

        filaEditando.children[4].textContent = numero;

        filaEditando.children[5].textContent = fecha;

        filaEditando.children[6].textContent = grado;

        filaEditando = null;

    }else{

        // Crear fila nueva
        const fila = document.createElement("tr");

     if(rol === "admin"){

         fila.innerHTML = `
    
         <td></td>

         <td>${nombre}</td>

         <td>${apellido}</td>

         <td>${correo}</td>

         <td>${numero}</td>

         <td>${fecha}</td>

         <td>${grado}</td>

        <td>
            <button class="editar">Editar</button>

            <button class="eliminar">Eliminar</button>
        </td>
          `;

         }

     else{

         fila.innerHTML = `
    
         <td></td>

         <td>${nombre}</td>

         <td>${apellido}</td>

         <td>${correo}</td>

         <td>${numero}</td>

         <td>${fecha}</td>

         <td>${grado}</td>

         <td></td>
         `;

         }
         // BOTÓN ELIMINAR
         fila.querySelector(".eliminar").addEventListener("click", function(){

         let confirmar = confirm("¿Está seguro de borrar la información?");

         if(confirmar){
         fila.remove();
         actualizarIDs();
          }

         });

        // BOTÓN EDITAR
        fila.querySelector(".editar").addEventListener("click", function(){

            // Pasar datos a los inputs
            document.getElementById("nombre").value = fila.children[1].textContent;

            document.getElementById("apellido").value = fila.children[2].textContent;

            document.getElementById("correo").value = fila.children[3].textContent;

            document.getElementById("numero").value = fila.children[4].textContent;

            document.getElementById("fecha").value = fila.children[5].textContent;

            document.getElementById("grado").value = fila.children[6].textContent;
            
            // Guardar fila actual
            filaEditando = fila;

        });

        // Agregar fila
        tablaUsuarios.appendChild(fila);
        actualizarIDs();
        localStorage.setItem("tabla", tablaUsuarios.innerHTML);

    }

    // Limpiar inputs
    formulario.reset();
});

function actualizarIDs(){

    let filas = tablaUsuarios.querySelectorAll("tr");

    filas.forEach((fila, index) => {

        fila.children[0].textContent = index + 1;

    });

}