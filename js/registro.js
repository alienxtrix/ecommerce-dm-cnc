//Trae los inputs del formulario
let nameContact = document.getElementById("nameContact");
let ApellidoPContact = document.getElementById("ApellidoPContact");
let ApellidoMContact = document.getElementById("ApellidoMContact");
let fechaNac = document.getElementById("birthDate");
let numberContact = document.getElementById("numberContact")
let mailContact = document.getElementById("mailContact")
let passwordContact = document.getElementById("passwordContact")
let confirPassContact = document.getElementById("confirPassContact")
let usuarios = [];
const URL_MAIN = 'http://localhost:8080/api/users/'; // Url del api del backend para el metodo post de user (path="/api/users/")

//------------------------> F U N C I O N E S    D E   V A L I D A C I O N E S <--------------------------------
function validarNombre() {
    if (nameContact.value.length < 3) {
        nameContact.style.border = "red thin solid";
        document.getElementById("alertnombre").innerHTML = "Dato inválido, tu nombre debe contener más de 3 caracteres";
        document.getElementById("alertnombre").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        nameContact.style.border = "green thin solid";
        document.getElementById("alertnombre").style.display = "none";
        return true;
    }
} //Validación nombre

function validarApellidoP() {
    if (ApellidoPContact.value.length < 3) {
        ApellidoPContact.style.border = "red thin solid";
        document.getElementById("alertnombreP").innerHTML = "Dato inválido, tu apellido debe contener más de 3 caracteres";
        document.getElementById("alertnombreP").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        ApellidoPContact.style.border = "green thin solid";
        document.getElementById("alertnombreP").style.display = "none";
        return true;
    }
} // Validación apellido paterno

function validarApellidoM() {
    if (ApellidoMContact.value.length < 3) {
        ApellidoMContact.style.border = "red thin solid";
        document.getElementById("alertnombreM").innerHTML = "Dato inválido, tu apellido debe contener más de 3 caracteres";
        document.getElementById("alertnombreM").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        ApellidoMContact.style.border = "green thin solid";
        document.getElementById("alertnombreM").style.display = "none";
        return true;
    }
} // Validación apellido materno

let validacionBD = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

function validarfechaNac() {
    // console.log(birthDate.value);
    // console.log(validacionBD);
    if (!validacionBD.test(fechaNac.value)) {
        fechaNac.style.border = "red thin solid";
        document.getElementById("alertBD").innerHTML = "Debes ingresar una fecha de nacimiento válida";
        document.getElementById("alertBD").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        birthDate.style.border = "green thin solid";
        document.getElementById("alertBD").style.display = "none";
        return true;
    }
} // Validación Fecha de Nacimiento

function validarContraseña() {
    if (passwordContact.value.length < 5) {
        passwordContact.style.border = "red thin solid";
        document.getElementById("alertPassword").innerHTML = "Inválido, tu contraseña debe contener más de 5 caracteres";
        document.getElementById("alertPassword").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        passwordContact.style.border = "green thin solid";
        document.getElementById("alertPassword").style.display = "none";
        return true;
    }
} // Validación contraseña

function validarConfirContraseña() {
    if ((confirPassContact.value != passwordContact.value || confirPassContact.value.length == 0)) {
        confirPassContact.style.border = "red thin solid";
        document.getElementById("alertConfirPassword").innerHTML = "Dato inválido, la contraseña no coincide";
        document.getElementById("alertConfirPassword").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        confirPassContact.style.border = "green thin solid";
        document.getElementById("alertConfirPassword").style.display = "none";
        return true;
    }
} //Validación confirmación de contraseña


let validacionCel = /^[0-9]{10}$/;

function validarNumero() {
    if (!validacionCel.test(numberContact.value)) {
        numberContact.style.border = "red thin solid";
        document.getElementById("alertnum").innerHTML = "Tu número debe tener 10 dígitos";
        document.getElementById("alertnum").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        numberContact.style.border = "green thin solid";
        document.getElementById("alertnum").style.display = "none";
        return true;
    }
} // Validación de celular

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
} // Validación de email


function validarPoliticas() {
    let politicas = document.getElementById("politicas");
    if (!politicas.checked) {
        document.getElementById("alertpoliticas").innerHTML = "Por favor, acepta las políticas de privacidad";
        document.getElementById("alertpoliticas").style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        document.getElementById("alertpoliticas").style.display = "none";
        return true;
    }
} // Validación de aceptar politicas de privacidad


//--------------------------> E V E N T O S   I N P U T S   Y   C H E C K B O X <--------------------------------

const checkbox = document.querySelector("input[name=checkbox]");
checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.getElementById("alertpoliticas").style.display = "none";
    } else {
        document.getElementById("alertpoliticas").innerHTML = "Por favor, acepta las políticas de privacidad";
        document.getElementById("alertpoliticas").style = "display: block; margin-bottom: -10px;";
    }
}); //Politicas

nameContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarNombre();
    }) //Nombre

ApellidoPContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarApellidoP();
    }) //Apellido P

ApellidoMContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarApellidoM();
    }) //Apellido M

fechaNac.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarfechaNac();
    }) //Fecha Nacimiento

numberContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarNumero();
    }) //Número

mailContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarEmail()
    }) // Email

passwordContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarContraseña();
    }) // Contraseña

confirPassContact.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarConfirContraseña();
    }) // Confirmar contraseña




// -------------------------------> E N V I A R   F O R M U L A R I O <----------------------------------------
let enviar = document.getElementById("enviar");
enviar.addEventListener("click", (event) => {
    event.preventDefault();

    // Se hacen validaciones
    validarNombre();
    validarApellidoP();
    validarApellidoM();
    validarfechaNac();
    validarContraseña();
    validarConfirContraseña();
    validarNumero();
    validarEmail();
    validarPoliticas();
    123
    //Si falla alguna validacion, se muestra alerta de error 
    if ((!validarNombre()) || (!validarContraseña()) || (!validarApellidoM()) || (!validarNumero()) || (!validarConfirContraseña()) || (!validarApellidoP()) || (!validarEmail()) || (!validarPoliticas()) || (!validarfechaNac())) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor completa correctamente el formulario',
        })
        return false;
    }


    let newUsuario = {
        user_name: document.querySelector(`#nameContact`).value,
        user_lastNF: document.querySelector(`#ApellidoPContact`).value,
        user_lastNM: document.querySelector(`#ApellidoMContact`).value,
        user_date: document.querySelector(`#birthDate`).value,
        user_pass: document.querySelector(`#passwordContact`).value,
        user_phone: document.querySelector(`#numberContact`).value,
        user_email: document.querySelector(`#mailContact`).value,
        user_type_id: 1
    };

    // POST solicitud con fetch()
    fetch(URL_MAIN, {
            // Agregar el tipo de método
            method: "POST",
            // Agregar cuerpo a enviar
            body: JSON.stringify(newUsuario),
            // agrega los encabezados a la solicitud
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        // Convierte a JSON
        .then(response => response.json()
        .then(data => ({status: response.status, body: data})))
        .then(obj=> {                                                // Hacemos validaciones del status del objeto
            if (obj.status == 500) {                                   // Error internal server (usuario y/o contraseña incorrecto)
                    Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Este correo ya está registrado',
                })
                mailContact.style.border = "red thin solid";
            } 
            else if ( obj.status == 200) {                            // Se inicia sesión correctamente
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Se ha registrado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Se limpia formulario
                document.getElementById('formRe').reset();

            }
        });
    
});

window.addEventListener("load", function() {
    if (localStorage.getItem("Usuario") != null) {
        usuarios = JSON.parse(localStorage.getItem("Usuario"));
    } // if
});