
let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion")
let calificacion = document.getElementById("calificacion")
let costo = document.getElementById("costo")
let imagen = document.getElementById("imagen")
let fileImage = document.getElementById('fileImage');
let btnFake = document.getElementById('btnFake');
let imageFile = document.getElementById('imageFile');

function validarDescripcion() {
    if(descripcion.value.length<3){
        descripcion.style.border = "red thin solid";
        document.getElementById("alertdes").innerHTML = "Texto inválido, tu descripción debe contener más de 20 caracteres";
        document.getElementById("alertdes").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        descripcion.style.border = "green thin solid";
        document.getElementById("alertdes").style.display="none";
        return true;
    }
}//validateDescription

let validacionNombre = /^[A-Z]+[a-z]{3,100}/; 
function validarNombre () {
    if( !validacionNombre.test(nombre.value) ){
        nombre.style.border = "red thin solid";
        document.getElementById("alertnombre").innerHTML = "Dato inválido, el nombre debe contener más de 20 caracteres y comenzar con mayúscula";
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

// function validarImagen(){
//     document.getElementById(input).value==undefined;
// }

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

btnFake.addEventListener('click', function(){
    fileImage.click();
});

// Subir imagen
fileImage.addEventListener('change', function(){
    previewFile('imageFile', 'fileImage', 'inputFile' );
    //previewFile(id imagen, input type file , textArea);
});

//previewFile(id imagen, input type file , textArea);
let reader  = new FileReader();
function previewFile(img, inputFile, input) {
    var preview = document.getElementById(img);
    var file    = fileImage.files[0];

    reader.addEventListener("load", function () {
        // document.getElementById(input).value = reader.result;
        preview.src = reader.result;
    }, false);
    
    if (file) {
        reader.readAsDataURL(file);
    }// file
}// previewFile 

let productos = [];
let contador = 0;

//Evento se hace click en el boton enviar
let enviar = document.getElementById("enviar");
enviar.addEventListener("click", (event)=> {
    event.preventDefault();  

    validarNombre();
    validarDescripcion();
    validarCosto();
    validarCategoria();
    // validarImagen();

    if ((!validarNombre()) || (!validarDescripcion()) || (!validarCosto()) || (!validarCategoria() )) { // validarimagen
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Por favor completa correctamente el formulario',
        })
    return false;
    }

    let prod = `{ 
        "id": ${contador},
        "name": "${nombre.value}",
        "img": "${reader.result}",
        "category" : "${cate}",
        "cost": ${costo.value},
        "description" : "${descripcion.value}",
        "rate": ${Math.round(calificacion.value)}
    }`;

    contador++;
    localStorage.setItem("contador", JSON.stringify(contador) ); //stringify convierte a cadena
    productos.push(JSON.parse(prod));  //parse toma una cadena y la convierte a objeto
    localStorage.setItem("productos", JSON.stringify(productos) ); //stringify convierte a cadena
    console.log(productos);
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