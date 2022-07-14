// Trae los elementos del formulario para agregar productos
let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion")
let costo = document.getElementById("costo")
let calificacion = document.getElementById("calificacion")
let imagen = document.getElementById("imagen")
let fileImage = document.getElementById('fileImage');
let btnFake = document.getElementById('btnFake');
let imageFile = document.getElementById('imageFile');
let stringtoken;
let token;

// Trae los elementos del formulario para editar productos
let nombreEd = document.getElementById("nombreEd");
let descripcionEd = document.getElementById("descripcionEd");
let costoEd = document.getElementById("costoEd");
let imageFileEd = document.getElementById('imageFileEd');

// Se establecen las excepciones de validación
let validacionNombre = /^[A-z]{3,100}/;
let validacionCosto = /^[1-9]+[0-9]{2,10}$/;
const URL_MAIN = 'http://localhost:8080/api/products/'; // Url del api del backend para el metodo post de user (path="/api/products/")

let alert;

//------------------------> F U N C I O N E S    D E   V A L I D A C I O N E S <--------------------------------

function validarNombre(elemento) {
    if (elemento.getAttribute("id") == "nombre") {
        alert = "alertnombre";
    } else if (elemento.getAttribute("id") == "nombreEd") {
        alert = "alertnombreEd";
    }
    if (!validacionNombre.test(elemento.value)) {
        elemento.style.border = "red thin solid";
        document.getElementById(alert).innerHTML = "Dato inválido, el nombre debe contener más de 3 caracteres";
        document.getElementById(alert).style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        elemento.style.border = "green thin solid";
        document.getElementById(alert).style.display = "none";
        return true;
    }
} //Validar Nombre

function validarDescripcion(elemento) {
    if (elemento.getAttribute("id") == "descripcion") {
        alert = "alertdes";
    } else if (elemento.getAttribute("id") == "descripcionEd") {
        alert = "alertdesEd";
    }
    if (elemento.value.length < 11) {
        elemento.style.border = "red thin solid";
        document.getElementById(alert).innerHTML = "Texto inválido, tu descripción debe contener más de 10 caracteres";
        document.getElementById(alert).style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        elemento.style.border = "green thin solid";
        document.getElementById(alert).style.display = "none";
        return true;
    }
} //validarDescripcion

function validarCosto(elemento) {
    if (elemento.getAttribute("id") == "costo") {
        alert = "alertcost";
    } else if (elemento.getAttribute("id") == "costoEd") {
        alert = "alertcostEd";
    }
    if (!validacionCosto.test(elemento.value)) {
        elemento.style.border = "red thin solid";
        document.getElementById(alert).innerHTML = "El costo debe ser mayor a 0 y tener más de 2 dígitos";
        document.getElementById(alert).style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        elemento.style.border = "green thin solid";
        document.getElementById(alert).style.display = "none";
        return true;
    }
} //Validar Costo

function validarImagen(elemento) {
    if (elemento.getAttribute("id") == "imageFile") {
        alert = "alertimg";
    } else if (elemento.getAttribute("id") == "imageFileEd") {
        alert = "alertimgEd";
    }
    if (elemento.getAttribute("src") == "") {
        document.getElementById(alert).innerHTML = "Añade una imagen";
        document.getElementById(alert).style = "display: block; margin-bottom: -10px;";
        return false;
    } else {
        document.getElementById(alert).style.display = "none";
        return true;
    }
} // Validar imagen

let categoria;
function validarCategoria(elemento) {
    if (elemento == 1) {
        categoria = document.querySelector('input[name="gridRadios"]:checked');
        alert = "alertcat";
    } else if (elemento == 2) {
        categoria = document.querySelector('input[name="gridRadiosEd"]:checked');
        alert = "alertcatEd";
    }
    if (categoria == null) { 
        document.getElementById(alert).innerHTML = "Selecciona una categoría";
        document.getElementById(alert).style = "display: block; margin-bottom: -10px;";
        return false;
    } else if (categoria != null) {
        document.getElementById(alert).style.display = "none";
        return true;
    }
} //Validar categoria

let statuss;
function validaStatus(elemento) {
    if (elemento == 1) {
        statuss = document.querySelector('input[name="gridRadiosS"]:checked');
        alert = "alertcat1";
    } else if (elemento == 2) {
        statuss = document.querySelector('input[name="gridRadiosSEd"]:checked');
        alert = "alertcat1Ed";
    }
    if (statuss == null) { 
        document.getElementById(alert).innerHTML = "Selecciona un estado";
        document.getElementById(alert).style = "display: block; margin-bottom: -10px;";
        return false;
    } else if (statuss != null) {
        document.getElementById(alert).style.display = "none";
        return true;
    }
} //Validar status

//--------------------------> E V E N T O S   I N P U T S   Y   C H E C K B O X <--------------------------------

[nombre, nombreEd].forEach(element => {
    element.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarNombre(e.target);
    });
});

[descripcion, descripcionEd].forEach(element => {
    descripcion.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarDescripcion(e.target);
    })    
});

[costo, costoEd].forEach(element => {
    costo.addEventListener("blur", (e) => {
        e.target.value = e.target.value.trim();
        validarCosto(e.target);
    })
});

//Evento se hace click en subir imagen
let btnFakeEd = document.getElementById("btnFakeEd");
[btnFake, btnFakeEd].forEach(element => {
    element.addEventListener('click', function() {
        if (element.getAttribute("id") == "btnFake") {
            fileImage.click();
        } else if (element.getAttribute("id") == "btnFakeEd") {
            fileImageEd.click();
        }
    });
})

// Subir imagen
let v;
let fileImageEd = document.getElementById("fileImageEd");
[fileImage, fileImageEd].forEach(element => {
    element.addEventListener('change', function() {
        v = false;
        let img;
        if (element.getAttribute("id") == "fileImage") {
            img = "imageFile"
        } else if (element.getAttribute("id") == "fileImageEd") {
            img = "imageFileEd";
            v = true;
        }
        previewFile(img, element.getAttribute("id"), 'inputFile');
    });
});

let reader = new FileReader();
function previewFile(img, inputFile, input) {
    var preview = document.getElementById(img);
    var file;
    if (inputFile == "fileImage") {
        file = fileImage.files[0];
    } else if (inputFile == "fileImageEd") {
        file = fileImageEd.files[0];
    }
    reader.addEventListener("load", function() {
        preview.src = reader.result;
        document.getElementById("alertimg").style.display = "none";
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    } // file
} // previewFile 

// Donde se guardan los productos
let productos = [];
let contador = 1;

// -------------------------------> E N V I A R   F O R M U L A R I O <----------------------------------------
let enviar = document.getElementById("enviar");
let enviarEd = document.getElementById("enviarEd");
[enviar, enviarEd].forEach(element => {
    element.addEventListener("click", (event) => {
        event.preventDefault();

        // Variables que guardaran las validaciones
        let vNombre;
        let vDescripcion;
        let vCosto;
        let vImagen;
        let vCategoria;
        let vStatus;

        // Se hacen validaciones de los campos
        if (element.getAttribute("id") == "enviar") {
            vNombre = validarNombre(nombre);
            vDescripcion =  validarDescripcion(descripcion);
            vCosto = validarCosto(costo);
            vImagen =  validarImagen(imageFile);
            vCategoria =  validarCategoria(1);
            vStatus = validaStatus(1);
        } else if (element.getAttribute("id") == "enviarEd") {
            vNombre = validarNombre(nombreEd);
            vDescripcion = validarDescripcion(descripcionEd);
            vCosto = validarCosto(costoEd);
            vImagen =  validarImagen(imageFileEd);
            vCategoria =  validarCategoria(2);
            vStatus = validaStatus(2);
        }
    
        //Si falla alguna validacion, se muestra alerta de error 
        if ((!vNombre) || (!vDescripcion) || (!vCosto) || (!vCategoria) || (!vImagen) || (!vStatus)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor completa correctamente el formulario',
            })
            return false;
        }
    
        
        contador++;
        // Se crea o se edita la información dependiendo del form
        if (element.getAttribute("id") == "enviar") {
            nombre.value = nombre.value[0].toUpperCase() + nombre.value.substring(1);
            // JSON de producto
            let prod = { 
                product_name: `${nombre.value}`,
                product_img: `${reader.result}`,
                product_cost: `${costo.value}`,
                product_status: `${statuss.value}`,
                product_description : `${descripcion.value}`,
                product_rate: `${Math.round(calificacion.value)}`,
                product_category: `${categoria.value}`
            };

            fetch(URL_MAIN, {
                // Agregar el tipo de método
                method: "POST",
                // Agregar cuerpo a enviar
                body: JSON.stringify(prod),
                // agrega los encabezados a la solicitud
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization" : token
                }
            })
            // Convierte a JSON
            .then(response => {                            // Se inicia sesión correctamente
                // Si no falla validaciones, se muestra alerta de que se subió correctamente
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'El producto se subió correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById('myForm').reset();
                document.getElementById('imageFile').src = "";
                
                
            }). catch(error => {
                Swal.fire({
                icon: 'error',
                title: 'Error',
                })
            });
        } else if (element.getAttribute("id") == "enviarEd") {

            let name  = document.getElementById("nombreEd").value;
            let img;
            let cost = document.getElementById("costoEd").value;
            let status;
            let description = document.getElementById("descripcionEd").value;
            let rate = Math.round(document.getElementById("calificacionEd").value);
            let category;

            if (document.getElementById("gridRadios1Ed").checked == true) {
                category = 1;
            } else if (document.getElementById("gridRadios2Ed").checked == true) {
                category = 2;
            } else if (document.getElementById("gridRadios3Ed").checked == true) {
                category = 3;
            } else if (document.getElementById("gridRadios4Ed").checked == true) {
                category = 4;
            }
            if (document.getElementById("gridRadiosSAEd").checked == true) {
                status = "activo";
            } else if (document.getElementById("gridRadiosSIEd").checked = true) {
                status = "inactivo";
            }

            if (v == true) {
                img = reader.result;
            }
            
            // img = img.replace(/\+/g, '%2B');
            // img = img.replace(/\//g, '%2F');
            // img = img.replace(/\=/g, '%3D');

            // PUT 
            let prod = { 
                product_name: name,
                product_img: img,
                product_cost: cost,
                product_status: status,
                product_description : description,
                product_rate: rate,
                product_category: category
            };
            
            console.log(btn_id);

            fetch(URL_MAIN + btn_id, {
                // Agregar el tipo de método
                method: "PUT",
                // Agregar cuerpo a enviar
                body: JSON.stringify(prod),
                // agrega los encabezados a la solicitud
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization" : token
                }
            })
            // Convierte a JSON
            .then(response => response.json()
              .then(json => {console.log(json)
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'El producto se actualizó correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
              })
            ).catch(error =>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    })
            });

        }
        
    });
});

// Función para traer los productos
window.addEventListener('load', function() {
     stringtoken = localStorage.getItem("statusSesion");
     token = ("Bearer: "+ stringtoken);
});