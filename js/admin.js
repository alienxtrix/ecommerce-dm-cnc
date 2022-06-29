// Arreglo en dodne se almacenan todos los productos
let productosGrid = [];

// Función para agregar la lista de los productos agregados
function addItem(item) {
    let rate = "";
    for (let i = 1; i <= item.rate; i++) {
        rate += `<i class="fa fa-star" aria-hidden="true"></i>`
    } // for
    const itemHTML = `
    <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.rate}</td>
        <td>$ ${item.cost}</td>
        <td>${item.status}</td>
        <td>
            <i class="fa fa-pencil-square-o btnEditarClass" aria-hidden="true" data-toggle=modal data-target="#staticBackdrop" id="${item.id}"></i>
        </td>
    </tr>`;

    const itemsGrid = document.getElementById("listItemsAdmin");
    itemsGrid.innerHTML += itemHTML;
    modals();
} // function addItem(item)

let clasB;
let statussB;
// Muestra el modal de acuerdo al producto seleccionado
let detalles = document.getElementsByClassName("fa fa-pencil-square-o btnEditarClass");
let btn_id;
let modals = () => {
    for (let i = 0; i < detalles.length; i++) {
        detalles[i].addEventListener("click", (event) => {
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

// Función para traer los productos
window.addEventListener('load', function() {
    if (localStorage.getItem("productos") != null) {
        productosGrid = JSON.parse(localStorage.getItem("productos"));
        productosGrid.forEach(element => {
            addItem(element);
        }); // for-each
        // modals();
    } // if
});