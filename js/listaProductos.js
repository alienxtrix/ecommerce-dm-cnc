// Arreglo en dodne se almacenan todos los productos
let productos = [];

// Función para mostrar el producto con su card
function addItem(item) {
    let rate = "";
    for (let i = 1; i <= item.rate; i++) {
        rate += `<i class="fa fa-star" aria-hidden="true"></i>`
    } // for
    const itemHTML = `
    <div class="col" id="producto${item.id}">
        <div class="card">
            <img class = "ImgProdCat" src="${item.img}" alt="..." >
            <div id="puntuacion">
                <p class="card-text-description">
                    ${rate}
                </p>
            </div>

            <div class="btnsCard">
                <button type="button" class="btn btn-dark btnAgregarClass" onclick="">Agregar</button>
                <button type="button" class="btn btn-light btnDetallesClass" data-toggle=modal data-target="#staticBackdrop" id="${item.id}">Ver detalles</button>
            </div>

            <div class="card-body">
                <h5 class="card-title" id="nameProduct${item.id}">${item.name}</h5>
                <p class="card-text-cost">${item.cost}</p>
            </div>
        </div>
    </div>`;
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
} // function addItem(item)

// Muestra los productos de acuerdo a la categoría seleccionada
let categorias = document.getElementsByClassName("btnCategoria");
for (let i = 0; i < categorias.length; i++) {
    categorias[i].addEventListener("click", (event) => {
        event.preventDefault();
        removeStyle(categorias);
        addStyle(categorias[i]);
        document.getElementById("list-items").innerHTML = "";
        let categoria = categorias[i].innerHTML;
        if (categorias[i].innerHTML == "Todos") {
            document.getElementById("list-items").innerHTML = "";
            for (let i = 0; i < productos.length; i++) {
                addItem(productos[i]);
            } // for
        } // if
        for (let j = 0; j < productos.length; j++) {
            let item = "" + productos[j].category + ""; 
            if (item == categoria) {
                // console.log(productos[j]);
                addItem(productos[j]);
            } // if
        } // for
        modals();
    });
} // for

// Muestra el modal de acuerdo al producto seleccionado
let detalles = document.getElementsByClassName("btn btn-light btnDetallesClass");
let modals = () => {
    for (let i = 0; i < detalles.length; i++) {
        detalles[i].addEventListener("click", (event) => {
            document.getElementById("nombreProducto").innerHTML =  productos[detalles[i].id].name;
            document.getElementById("descripcionProducto").innerHTML =  productos[detalles[i].id].description;
        });
    } // for
} // función modals()

// Función para agregar la clase "active" a la categoría seleccionada (botón)
let addStyle = (element) => {
    element.setAttribute("id", "active");
} // function remove()

// Función para eliminar la clase "active" de todas las categorías categoría (botones)
let removeStyle = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("id");
    } // for
} // function remove()

// Función para traer los productos
window.addEventListener("load", function() {
    if (localStorage.getItem("productos") != null) {
        productos = JSON.parse(localStorage.getItem("productos"));
        productos.forEach(element => {
            addItem(element);
        }); // for-each
        modals();
    } // if
});