// Arreglo en dodne se almacenan todos los productos
let productosGrid = [];

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
            imgT--;
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
        });
    } // for
} // función modals()

let imgT = 0;

let imagenesT = document.getElementsByClassName("fa fa-picture-o btnImagenesClass");
let imgView = () => {
    for (let i = 0; i < imagenesT.length; i++) {
        imagenesT[i].addEventListener("click", (event) => {
            let tablaImagen = `
                <td colspan="1"></td>
                <td colspan="6">
                    <table class="table-dark" width="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align: center; cursor: pointer">
                                    <button id="btnImgCerrar" class=${imagenesT[i].getAttribute("id")}>Cerrar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>`;
            if (imgT == 0) {
                btn_id = "tablaImagen" + imagenesT[i].getAttribute("id");
                document.getElementById(btn_id).innerHTML = tablaImagen;
                imgCerrar();
                imgT++;
                localStorage.setItem("imgT", JSON.stringify(imgT));
            }
        });
    } // for
} // función imgView()

let imgCerrar = () => {
    let btnImgCerrar = document.getElementById("btnImgCerrar");
    btnImgCerrar.addEventListener("click", (event) => {
        btn_id = "tablaImagen" + btnImgCerrar.getAttribute("class");
        document.getElementById(btn_id).innerHTML = "";
        imgT--;
        localStorage.setItem("imgT", JSON.stringify(imgT));
    });
} // función imgView()

// Función para traer los productos
window.addEventListener('load', function() {
    if (localStorage.getItem("imgT") != null) {
        imgT = JSON.parse(localStorage.getItem("imgT"));
    } // if
    if (localStorage.getItem("productos") != null) {
        productosGrid = JSON.parse(localStorage.getItem("productos"));
        productosGrid.forEach(element => {
            addItem(element);
        }); // for-each
        // modals();
    } // if
});