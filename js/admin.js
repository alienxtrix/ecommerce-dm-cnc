// Arreglo en dodne se almacenan todos los productos
let productosGrid = [];
let imgProd = [];
let imgT = 0;
localStorage.setItem("imgT", JSON.stringify(imgT));

// Función para agregar la lista de los productos agregados
function addItem(item) {
    let rate = "";
    for (let i = 1; i <= item.product_rate; i++) {
        rate += `<i class="fa fa-star" aria-hidden="true"></i>`
    } // for
    const itemHTML = `
    <tr class="activeT">
        <td>${item.product_id}</td>
        <td>${item.product_name}</td>
        <td>${item.product_rate}</td>
        <td>$ ${item.product_cost}</td>
        <td>${item.product_status}</td>
        <td>
            <i class="fa fa-pencil-square-o btnEditarClass" aria-hidden="true" data-toggle=modal data-target="#staticBackdrop" id="${item.product_id}"></i>
        </td>
        <td>
            <i class="fa fa-picture-o btnImagenesClass" id="${item.product_id}"></i>
        </td>
    </tr>
    <tr class="tablaImagenesClass" id="tablaImagen${item.product_id}">
        <!-- Aquí va la nueva tabla de imágenes -->
    </tr>`;  
    const itemsGrid = document.getElementById("listItemsAdmin");
    itemsGrid.innerHTML += itemHTML;
    modals();
    imgView();
} // function addItem(item)

// Muestra el modal de acuerdo al producto seleccionado
let detalles = document.getElementsByClassName("fa fa-pencil-square-o btnEditarClass");
let btn_id;
let clasB;
let statussB;
let modals = () => {
    for (let i = 0; i < detalles.length; i++) {
        detalles[i].addEventListener("click", (event) => {
            fetch(URL_MAIN + (detalles[i].getAttribute("id")), {
                // Agregar el tipo de método
                method: "GET",
                // agrega los encabezados a la solicitud
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function(response) {
                response.json().then(function (json) {

                    let producto = json;

                    btn_id = "tablaImagen" + detalles[i].getAttribute("id");
                    document.getElementById(btn_id).innerHTML = "";
                    btn_id = detalles[i].getAttribute("id");
                    
                    document.getElementById("nombreEd").value = producto.product_name;
                    document.getElementById("descripcionEd").value = producto.product_description;
                    clasB = producto.product_category;
                    if (clasB == 1) {
                        document.getElementById("gridRadios1Ed").checked = true;
                    } else if (clasB == 2) {
                        document.getElementById("gridRadios2Ed").checked = true;
                    } else if (clasB == 3) {
                        document.getElementById("gridRadios3Ed").checked = true;
                    } else if (clasB == 4) {
                        document.getElementById("gridRadios4Ed").checked = true;
                    }
                    statussB = producto.product_status;
                    if (statussB == "activo") {
                        document.getElementById("gridRadiosSAEd").checked = true;
                    } else if (statussB == "inactivo") {
                        document.getElementById("gridRadiosSIEd").checked = true;
                    }
                    document.getElementById("calificacionEd").value = producto.product_rate;
                    document.getElementById("costoEd").value = producto.product_cost;
                    document.getElementById("imageFileEd").setAttribute("src", producto.product_img);
        
                    if (JSON.parse(localStorage.getItem("imgT")) != 0 ) {
                        document.getElementById("tablaImagen" + JSON.parse(localStorage.getItem("imgT"))).innerHTML = "";
                        localStorage.setItem("imgT", JSON.stringify(0));
                    }
            })});
        });
    } // for
} // función modals()

// Función en donde se muestra la tabla de las imágenes del producto resgistrado
let imagenesT = document.getElementsByClassName("fa fa-picture-o btnImagenesClass");
let imgView = () => {
    for (let i = 0; i < imagenesT.length; i++) {
        imagenesT[i].addEventListener("click", (event) => {
            let tablaImagen = `
                <td colspan="1"></td>
                <td colspan="6">
                    <table class="table-dark" width="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="imgT">
                                <th scope="row">1</th>
                                <td>Img ${imagenesT[i].getAttribute("id")}.1</td>
                                <td>Visualizar <i class="fa fa-eye" aria-hidden="true"></i>
                                </td>
                                <td><button type="button" class="btn btn-danger btnEliminar">Eliminar</button>
                                </td>
                            </tr>
                            <tr class="imgT">
                                <th scope="row">2</th>
                                <td>Img ${imagenesT[i].getAttribute("id")}.2</td>
                                <td>Visualizar <i class="fa fa-eye" aria-hidden="true"></i>
                                </td>
                                <td><button type="button" class="btn btn-danger btnEliminar">Eliminar</button>
                                </td>
                            </tr>
                            <tr class="imgT">
                                <th scope="row">3</th>
                                <td>Img ${imagenesT[i].getAttribute("id")}.3</td>
                                <td>Visualizar <i class="fa fa-eye" aria-hidden="true"></i>
                                </td>
                                <td><button type="button" class="btn btn-danger btnEliminar">Eliminar</button>
                                </td>
                            </tr>
                            <tr class="imgO">
                                <td colspan="2"></td>
                                <td colspan="1" style="text-align: center;">
                                    <button type="button" id="${imagenesT[i].getAttribute("id")}" class="btn btn-outline-info btnImgAgregar">Agregar</button>
                                    <input type="file" class="form-control-file" id="fileImageAd" style="display:none" onchange="readFile(this, ${imagenesT[i].getAttribute("id")})">
                                </td> 
                                <td colspan="1" style="text-align: center;">
                                <button type="button" id="${imagenesT[i].getAttribute("id")}" class="btn btn-outline-secondary btnImgCerrar">Cerrar</button>
                                </td>
                                <td> 
                                    <img src="" id="imgdd">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>`;
            if (JSON.parse(localStorage.getItem("imgT")) == 0) {
                btn_id = "tablaImagen" + imagenesT[i].getAttribute("id");
                document.getElementById(btn_id).innerHTML = tablaImagen;
                imgCerrar();
                localStorage.setItem("imgT", JSON.stringify(parseInt(imagenesT[i].getAttribute("id"))));
            } else {
                btn_id = "tablaImagen" + localStorage.getItem("imgT");
                document.getElementById(btn_id).innerHTML = "";
                btn_id = "tablaImagen" + imagenesT[i].getAttribute("id");
                document.getElementById(btn_id).innerHTML = tablaImagen;
                imgCerrar();
                localStorage.setItem("imgT", JSON.stringify(parseInt(imagenesT[i].getAttribute("id"))));
            }
            imgEliminar();
            imgAgregar();
        });
    } // for
} // función imgView()

// Función para eliminar una imágen de un producto ++
let imgEliminar = () => {
    let btnImgAgregar = document.getElementsByClassName("btn btn-danger btnEliminar");
    for (let index = 0; index < btnImgAgregar.length; index++) {
        btnImgAgregar[index].addEventListener("click", (event) => {
            // Función para eliminar ---
            // console.log(btnImgAgregar[index]);
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'La imágen se eliminó correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        });
    } // for
} // función imgEliminar()


// Función para agregar una imágen a un producto ++
let imgAgregar = () => {
    let btnImgAgregar = document.getElementsByClassName("btn btn-outline-info btnImgAgregar");
    btnImgAgregar[0].addEventListener("click", (event) => {

        fileImageAd.click();

        // // console.log(btnImgAgregar[index]);
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Correcto',
        //     text: 'La imágen se subió correctamente',
        //     showConfirmButton: false,
        //     timer: 5500
        // })
    });
} // función imgAgregar()

function readFile (input, id) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        let imgData = `{ 
            "id": ${id},
            "name": "${file.name}",
            "img": "${reader.result}"
        }`;
        imgProd.push(JSON.parse(imgData));
        localStorage.setItem("imgProd", JSON.stringify(imgProd)); 
    };
    reader.onerror = function () {
        console.log(reader.error);
    };
}

// Función para ocultar la tabla de las imágenes del producto
let imgCerrar = () => {
    let btnImgCerrar = document.getElementsByClassName("btn btn-outline-secondary btnImgCerrar");
    btnImgCerrar[0].addEventListener("click", (event) => {
        btn_id = "tablaImagen" + btnImgCerrar[0].getAttribute("id");
        document.getElementById(btn_id).innerHTML = "";
        localStorage.setItem("imgT", JSON.stringify(0));
    });
} // función imgCerrar()

// Función para traer los productos
window.addEventListener('load', function() {
    if (localStorage.getItem("contador") != null) {
        contador = JSON.parse(localStorage.getItem("contador"));
    } // if
    if (localStorage.getItem("imgT") != null) {
        imgT = JSON.parse(localStorage.getItem("imgT"));
    } // if
    if (localStorage.getItem("imgProd") != null) {
        imgProd = JSON.parse(localStorage.getItem("imgProd"));
    } // if

    fetch(URL_MAIN, {
        // Agregar el tipo de método
        method: "GET",
        // agrega los encabezados a la solicitud
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function(response) {
        response.json().then(function (json) {
            productosGrid=json;
            // console.log(productosGrid);
            productosGrid.forEach(element => {
                addItem(element);
            }); // for-each
    })});
    
});

let salir = document.getElementById("btnForm");
salir.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "./index.html";
});