//Trae los inputs del formulario
let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion")
let calificacion = document.getElementById("calificacion")
let costo = document.getElementById("costo")
let imagen = document.getElementById("imagen")
let fileImage = document.getElementById('fileImage');
let btnFake = document.getElementById('btnFake');
let imageFile = document.getElementById('imageFile');


function validarDescripcion() {
    if(descripcion.value.length<11){
        descripcion.style.border = "red thin solid";
        document.getElementById("alertdes").innerHTML = "Texto inválido, tu descripción debe contener más de 10 caracteres";
        document.getElementById("alertdes").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        descripcion.style.border = "green thin solid";
        document.getElementById("alertdes").style.display="none";
        return true;
    }
}//validarDescripcion

let validacionNombre = /^[A-Z]+[a-z]{3,100}/; 
function validarNombre () {
    if( !validacionNombre.test(nombre.value) ){
        nombre.style.border = "red thin solid";
        document.getElementById("alertnombre").innerHTML = "Dato inválido, el nombre debe contener más de 3 caracteres y comenzar con mayúscula";
        document.getElementById("alertnombre").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        nombre.style.border = "green thin solid";
        document.getElementById("alertnombre").style.display="none";
        return true;
    }
} //Validar Nombre

let validacionCosto = /^[1-9]+[0-9]{2,10}$/;  
function validarCosto (){
    if (!validacionCosto.test(costo.value)){
        costo.style.border = "red thin solid";
        document.getElementById("alertcost").innerHTML = "El costo debe ser mayor a 0 y tener más de 2 dígitos";
        document.getElementById("alertcost").style="display: block; margin-bottom: -10px;";
        return false;
    } else { 
        costo.style.border = "green thin solid";
        document.getElementById("alertcost").style.display="none";
        return true;
    }
} //Validar Costo

function validarCategoria (){
let categoria = document.querySelector('input[name="gridRadios"]:checked');
            if(categoria) {
                cate = categoria.value;
                document.getElementById("alertcat").style.display="none";
                return true;
            } else {
                document.getElementById("alertcat").innerHTML = "Selecciona una categoría";
                document.getElementById("alertcat").style="display: block; margin-bottom: -10px;";
                return false;
            }
} //Validar categoria

function validarImagen(){
   if(reader.result==null){
        document.getElementById("alertimg").innerHTML = "Añade una imagen";
        document.getElementById("alertimg").style="display: block; margin-bottom: -10px;";
        return false;
    } else { 
        document.getElementById("alertimg").style.display="none";
        return true;
   }
} // Validar imagen



//Eventos para validar cuando salga de los campos del formulario
nombre.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarNombre();
})

costo.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarCosto();
})

descripcion.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarDescripcion();
})


//Evento se hace click en subir imagen

btnFake.addEventListener('click', function(){
    fileImage.click();
});

// Subir imagen
fileImage.addEventListener('change', function(){
    previewFile('imageFile', 'fileImage', 'inputFile' );
    //previewFile(id imagen, input type file , textArea);
});

let reader  = new FileReader();
function previewFile(img, inputFile, input) {
    var preview = document.getElementById(img);
    var file    = fileImage.files[0];

    reader.addEventListener("load", function () {
        // document.getElementById(input).value = reader.result;
        preview.src = reader.result;
        document.getElementById("alertimg").style.display="none";
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }// file
}// previewFile 


// Donde se guardan los productos
let productos = [];
let contador = 0;

//Evento se hace click en el boton enviar
let enviar = document.getElementById("enviar");
enviar.addEventListener("click", (event)=> {
    event.preventDefault();  
     
    // Se hacen validaciones de los campos
    validarNombre();
    validarDescripcion();
    validarCosto();
    validarCategoria();
    validarImagen();

    //Si falla alguna validacion, se muestra alerta de error 
    if ((!validarNombre()) || (!validarDescripcion()) || (!validarCosto()) || (!validarCategoria() ) || (!validarImagen())) { // validarimagen
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Por favor completa correctamente el formulario',
        })
    return false;
    }

    // Si no falla validaciones, se muestra alerta de que se subió correctamente
    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text:'El producto se subió correctamente',
        showConfirmButton: false,
        timer: 1500
    })

    // JSON de producto
    let prod = `{ 
        "id": ${contador},
        "name": "${nombre.value}",
        "img": "${reader.result}",
        "category" : "${cate}",
        "cost": ${costo.value},
        "description" : "${descripcion.value}",
        "rate": ${Math.round(calificacion.value)}
    }`;


    // Local Storage
    contador++;
    localStorage.setItem("contador", JSON.stringify(contador) ); //stringify convierte a cadena
    productos.push(JSON.parse(prod));  //parse toma una cadena y la convierte a objeto
    localStorage.setItem("productos", JSON.stringify(productos) ); //stringify convierte a cadena
    console.log(productos);
    
    //Limpiar formulario
    document.getElementById('myform').reset();
    document.getElementById('imageFile').src=null;
});


// Función para traer los productos
window.addEventListener("load", function() {
    if (localStorage.getItem("contador") != null) {
        contador = JSON.parse(localStorage.getItem("contador"));
    } // if
    if (localStorage.getItem("productos") != null) {
        productos = JSON.parse(localStorage.getItem("productos"));
    } // if
});