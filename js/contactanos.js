let nameContact = document.getElementById("nameContact");
let numberContact = document.getElementById("numberContact")
let mailContact = document.getElementById("mailContact")
let descriptionContact = document.getElementById("descriptionContact")



function validarDescripcion() {
    if(descriptionContact.value.length<20){
        descriptionContact.style.border = "red thin solid";
        document.getElementById("alertdes").innerHTML = "Texto inválido, tu mensaje debe contener mas de 20 caracteres";
        document.getElementById("alertdes").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        descriptionContact.style.border = "green thin solid";
        document.getElementById("alertdes").style.display="none";
        return true;
    }
}//validateDescription


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

numberContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarNumero();
})

mailContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarEmail();
})

descriptionContact.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarDescripcion();
})





let enviar = document.getElementById("enviar");
enviar.addEventListener("click", (event)=> {
    event.preventDefault();  

    validarNombre();
    validarDescripcion();
    validarNumero();
    validarEmail();

    if ((!validarNombre()) || (!validarDescripcion()) || (!validarNumero()) || (!validarEmail()) ){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Por favor completa correctamente el formulario',
          })
     return false;
    }
    


});




