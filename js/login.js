//Trae los inputs del formulario
let mailContact = document.getElementById("mailContact")
let passwordContact = document.getElementById("passwordContact")


//------------------------> F U N C I O N E S    D E   V A L I D A C I O N E S <--------------------------------


function validarContraseña () {
    if(passwordContact.value.length<5){
        passwordContact.style.border = "red thin solid";
        document.getElementById("alertPassword").innerHTML = "Tu contraseña debe contener más de 5 caracteres";
        document.getElementById("alertPassword").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        passwordContact.style.border = "green thin solid";
        document.getElementById("alertPassword").style.display="none";
        return true;
    }
} // Validacion contraseña


let validacionEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function validarEmail (){
    if (!validacionEmail.test(mailContact.value)){
        mailContact.style.border = "red thin solid";
        document.getElementById("alertmail").innerHTML = "Escribe un email válido";
        document.getElementById("alertmail").style="display: block; margin-bottom: -10px;";
        return false;

    } else{mailContact.style.border = "green thin solid";
       document.getElementById("alertmail").style.display="none";
       return true;
    }
} // Validacion de email


//--------------------------> E V E N T O S   I N P U T S   Y   C H E C K B O X <--------------------------------



mailContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarEmail();
}) // Email

passwordContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarContraseña();
}) // Contraseña


// -------------------------------> E N V I A R   F O R M U L A R I O <----------------------------------------
let enviar = document.getElementById("IniciarSesion");
enviar.addEventListener("click", (event)=> {
    event.preventDefault();  

    // Se hacen validaciones
    validarContraseña();
    validarEmail();

    //Si falla alguna validacion, se muestra alerta de error 
    if ( (!validarContraseña())|| (!validarEmail()) ){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Por favor completa correctamente el formulario',
          })
     return false;
    }
    


    // Si no falla validaciones, se muestra alerta de que se registró correctamente
    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Se ha iniciado sesión',
        showConfirmButton: false,
        timer: 1500
    })

// Se limpia formulario
document.getElementById('formIn').reset();
mailContact.style.border = "grey thin solid";
passwordContact.style.border = "grey thin solid";

});
