// Arreglo en dodne se almacenan todos los productos
let productosGrid = [];
let imgT = 0;

// Función para agregar la lista de los productos agregados
function addItem(item) {
    let rate = "";
    for (let i = 1; i <= item.rate; i++) {
        rate += `<i class="fa fa-star" aria-hidden="true"></i>`
    } // for
    const itemHTML = `
    <tr class="activeT">
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.rate}</td>
        <td>$ ${item.cost}</td>
        <td>${item.status}</td>
        <td>
            <i class="fa fa-pencil-square-o btnEditarClass" aria-hidden="true" data-toggle=modal data-target="#staticBackdrop" id="${item.id}"></i>
        </td>
        <td>
            <i class="fa fa-picture-o btnImagenesClass" id="${item.id}"></i>
        </td>
    </tr>
    <tr class="tablaImagenesClass" id="tablaImagen${item.id}">
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
            btn_id = "tablaImagen" + detalles[i].getAttribute("id");
            document.getElementById(btn_id).innerHTML = "";
            imgT = 0;
            localStorage.setItem("imgT", JSON.stringify(imgT));

            btn_id = detalles[i].getAttribute("id")-1;
            document.getElementById("nombreEd").value = productosGrid[detalles[i].getAttribute("id")-1].name;
            document.getElementById("descripcionEd").value = productosGrid[detalles[i].getAttribute("id")-1].description;
            clasB = productosGrid[detalles[i].getAttribute("id")-1].category;
            if (clasB == "Almacenamiento") {
                document.getElementById("gridRadios1Ed").checked = true;
            } else if (clasB == "Cocina") {
                document.getElementById("gridRadios2Ed").checked = true;
            } else if (clasB == "Decoración") {
                document.getElementById("gridRadios3Ed").checked = true;
            } else if (clasB == "Varios") {
                document.getElementById("gridRadios4Ed").checked = true;
            }
            statussB = productosGrid[detalles[i].getAttribute("id")-1].status;
            if (statussB == "activo") {
                document.getElementById("gridRadiosSAEd").checked = true;
            } else if (statussB == "inactivo") {
                document.getElementById("gridRadiosSIEd").checked = true;
            }
            document.getElementById("calificacionEd").value = productosGrid[detalles[i].getAttribute("id")-1].rate;
            document.getElementById("costoEd").value = productosGrid[detalles[i].getAttribute("id")-1].cost;
            document.getElementById("imageFileEd").setAttribute("src", productosGrid[detalles[i].getAttribute("id")-1].img);
            for (let  i = 1; i <= contador; i++) {
                btn_id = "tablaImagen" + i;
                document.getElementById(btn_id).innerHTML = "";
            }
            imgT = 0;
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
                                </td> 
                                <td colspan="1" style="text-align: center;">
                                <button type="button" id="${imagenesT[i].getAttribute("id")}" class="btn btn-outline-secondary btnImgCerrar">Cerrar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>`;
            if (imgT == 0) {
                btn_id = "tablaImagen" + imagenesT[i].getAttribute("id");
                document.getElementById(btn_id).innerHTML = tablaImagen;
                imgCerrar();
                imgT = 1;
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
        // console.log(btnImgAgregar[index]);
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'La imágen se subió correctamente',
            showConfirmButton: false,
            timer: 1500
        })
    });
} // función imgView()

// Función para ocultar la tabla de las imágenes del producto
let imgCerrar = () => {
    let btnImgCerrar = document.getElementsByClassName("btn btn-outline-secondary btnImgCerrar");
    btnImgCerrar[0].addEventListener("click", (event) => {
        btn_id = "tablaImagen" + btnImgCerrar[0].getAttribute("id");
        document.getElementById(btn_id).innerHTML = "";
        imgT = 0;
    });
} // función imgView()

// Función para traer los productos
window.addEventListener('load', function() {
    if (localStorage.getItem("contador") != null) {
        contador = JSON.parse(localStorage.getItem("contador"));
    } // if
    if (localStorage.getItem("productos") != null) {
        productosGrid = JSON.parse(localStorage.getItem("productos"));
        productosGrid.forEach(element => {
            addItem(element);
        }); // for-each
        // modals();
    } // if
});