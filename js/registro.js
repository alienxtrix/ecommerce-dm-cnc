let nameContact = document.getElementById("nameContact");
let ApellidoPContact = document.getElementById("ApellidoPContact");
let ApellidoMContact = document.getElementById("ApellidoMContact");
let numberContact = document.getElementById("numberContact")
let mailContact = document.getElementById("mailContact")
let passwordContact = document.getElementById("passwordContact")
let confirPassContact = document.getElementById("confirPassContact")


function validarNombre () {
    if(nameContact.value.length<5){
        nameContact.style.border = "red thin solid";
        document.getElementById("alertnombre").innerHTML = "Dato inválido, tu nombre debe contener más de 5 caracteres";
        document.getElementById("alertnombre").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        nameContact.style.border = "green thin solid";
        document.getElementById("alertnombre").style.display="none";
        return true;
    }
}

function validarApellidoP () {
    if(ApellidoPContact.value.length<5){
        ApellidoPContact.style.border = "red thin solid";
        document.getElementById("alertnombreP").innerHTML = "Dato inválido, tu apellido debe contener más de 5 caracteres";
        document.getElementById("alertnombreP").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        ApellidoPContact.style.border = "green thin solid";
        document.getElementById("alertnombreP").style.display="none";
        return true;
    }
}

function validarApellidoM () {
    if(ApellidoMContact.value.length<5){
        ApellidoMContact.style.border = "red thin solid";
        document.getElementById("alertnombreM").innerHTML = "Dato inválido, tu apellido debe contener más de 5 caracteres";
        document.getElementById("alertnombreM").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        ApellidoMContact.style.border = "green thin solid";
        document.getElementById("alertnombreM").style.display="none";
        return true;
    }
}

function validarContraseña () {
    if(passwordContact.value.length<5){
        passwordContact.style.border = "red thin solid";
        document.getElementById("alertPassword").innerHTML = "Dato inválido, tu contraseña debe contener más de 5 caracteres";
        document.getElementById("alertPassword").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        passwordContact.style.border = "green thin solid";
        document.getElementById("alertPassword").style.display="none";
        return true;
    }
}

function validarConfirContraseña () {
    if(confirPassContact.value != passwordContact.value){
        confirPassContact.style.border = "red thin solid";
        document.getElementById("alertConfirPassword").innerHTML = "Dato inválido, la contraseña no coincide";
        document.getElementById("alertConfirPassword").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        confirPassContact.style.border = "green thin solid";
        document.getElementById("alertConfirPassword").style.display="none";
        return true;
    }
}


let validacionCel = /^[0-9]{10}$/;  

function validarNumero (){
    if (!validacionCel.test(numberContact.value)){
        numberContact.style.border = "red thin solid";
        document.getElementById("alertnum").innerHTML = "Tu número debe tener 10 dígitos";
        document.getElementById("alertnum").style="display: block; margin-bottom: -10px;";
        return false;
    } else { 
        numberContact.style.border = "green thin solid";
        document.getElementById("alertnum").style.display="none";
        return true;
    }
}

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
}



nameContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarNombre();
})

ApellidoPContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarApellidoP();
})

ApellidoMContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarApellidoM();
})


numberContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarNumero();
})

mailContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarEmail();
})

passwordContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarContraseña();
})

confirPassContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarConfirContraseña();
})





let enviar = document.getElementById("enviar");
enviar.addEventListener("click", (event)=> {
    event.preventDefault();  

    validarNombre();
    validarApellidoP();
    validarApellidoM();
    validarContraseña();
    validarConfirContraseña();
    validarNumero();
    validarEmail();

    if ((!validarNombre()) || (!validarContraseña()) || (!validarApellidoM()) || (!validarNumero()) || (!validarConfirContraseña()) || (!validarApellidoP()) || (!validarEmail()) ){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Por favor completa correctamente el formulario',
          })
     return false;
    }
    


});