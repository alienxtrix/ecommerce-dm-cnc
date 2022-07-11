//Trae los inputs del formulario
let statusSesion = 0;
let mailContact = document.getElementById("mailContact")
let passwordContact = document.getElementById("passwordContact")
let usuarios = [];

//------------------------> F U N C I O N E S    D E   V A L I D A C I O N E S <--------------------------------


function validarContraseña() {
    console.log(confirm);
    if (passwordContact.value.length == 0 || passwordContact.value.length <= 4) {
        passwordContact.style.border = "red thin solid";
        document.getElementById("alertPassword").innerHTML = "Inválido, tu contraseña debe contener más de 5 caracteres";
        document.getElementById("alertPassword").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        passwordContact.style.border = "green thin solid";
        document.getElementById("alertPassword").style.display = "none";
        return true;
    }
} // Validacion contraseña


let validacionEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function validarEmail() {
    if (!validacionEmail.test(mailContact.value)) {
        mailContact.style.border = "red thin solid";
        document.getElementById("alertmail").innerHTML = "Escribe un email válido";
        document.getElementById("alertmail").style = "display: block; margin-bottom: -10px;";
        return false;

    } else {
        mailContact.style.border = "green thin solid";
        document.getElementById("alertmail").style.display = "none";
        return true;
    }
} // Validacion de email


//--------------------------> E V E N T O S   I N P U T S   Y   C H E C K B O X <--------------------------------



mailContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarEmail();
    }) // Email

passwordContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarContraseña();
    }) // Contraseña


// -------------------------------> E N V I A R   F O R M U L A R I O <----------------------------------------
let enviar = document.getElementById("IniciarSesion");
enviar.addEventListener("click", (event) => {
    event.preventDefault();

    // Se hacen validaciones
    validarContraseña();
    validarEmail();

    //Si falla alguna validacion, se muestra alerta de error 
    if ((!validarContraseña()) || (!validarEmail())) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor completa correctamente el formulario',
        })
        return false;
    }

    // Si se accede a correctamente a la cuenta, se cambia login por Mi sesion y redirecciona a index
    let correo;
    let password;
    for (let i = 0; i < usuarios.length; i++) {
        correo = usuarios[i].Email;
        password = usuarios[i].Contrasena;
        if (correo == mailContact.value && password == passwordContact.value) {
            console.log("igual");
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se ha iniciado sesión',
                showConfirmButton: false,
                timer: 1500
            });
            localStorage.setItem("statusSesion", correo);
            setTimeout(() => {
                location.href = "./index.html";
            }, 1500);
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario y/o contraseña incorrecto',
            })
        }
    }




    // Se limpia formulario
    document.getElementById('formIn').reset();
    mailContact.style.border = "grey thin solid";
    passwordContact.style.border = "grey thin solid";

});

// Función para traer nombre de usuario y email
window.addEventListener('load', function() {
    if (localStorage.getItem("contador") != null) {
        contador = JSON.parse(localStorage.getItem("contador"));
    } // if
    if (localStorage.getItem("Usuario") != null) {
        usuarios = JSON.parse(localStorage.getItem("Usuario"));
    } // if
});