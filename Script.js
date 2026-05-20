const email = document.getElementById("email");
const password = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const form = document.getElementById("loginForm");
const ojo = document.getElementById("ojo");

ojo.addEventListener("click", function(){

    if(password.type === "password"){
        password.type = "text";
        ojo.textContent = "👁️";
    }

    else{
        password.type = "password";

        ojo.textContent = "🔒";
    }
});

form.addEventListener("submit", function(e){

    e.preventDefault();

    if(email.value === "" || password.value === ""){
        mensaje.textContent = "Complete todos los campos";
    }

    else if(!email.value.includes("@")){
        mensaje.textContent = "Correo inválido";
    }
    // Admin
    else if(email.value === "juanpatino2312@gmail.com" && password.value === "(Croky2312@0112*)"){
        mensaje.style.color = "green";
        mensaje.textContent = "Bienvenido Administrador";
        email.value = "";
        password.value = "";

        // Guardar usuario
        sessionStorage.setItem("rol","admin");

        // Cambiar de página
        window.location.href = "CRUD-JS/index.html";
    }

    // INVITADOS
    else if(email.value.includes("@")){

        mensaje.style.color = "green";
        mensaje.textContent = "Bienvenido Invitado";

        // Guardar usuario
        sessionStorage.setItem("rol","invitado");

        // Cambiar de página
        window.location.href = "CRUD-JS/index.html";
    }


    else{
        mensaje.style.color = "red";
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
    
});