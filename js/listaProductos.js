// Arreglo en donne se almacenan todos los productos y contador
let productos = [];
let carrito = [];
let contador = 0;
let productoscat = [];
let pos = 0;
let categoriasactive = 0;
let productoscart = [];
const URL_MAIN = 'http://localhost:8080/api/products/'; // Url del api del backend para el metodo post de user (path="/api/products/")


// Función para mostrar el producto con su card
function addItem(item) {
    if (item.product_status == "activo") {
        let rate = "";
        for (let i = 1; i <= item.product_rate; i++) {
            rate += `<i class="fa fa-star" aria-hidden="true"></i>`
        } // for
        const itemHTML = `
        <div class="col" id="producto${item.product_id}">
            <div class="card">
                <img class = "ImgProdCat" src="${item.product_img}" alt="..." >
                <div id="puntuacion">
                    <p class="card-text-description star">
                        ${rate}
                    </p>
                </div>
                <div class="btnsCard">
                    <button type="button" class="btn btn-dark btnAgregarClass" onclick="">Agregar</button>
                    <button type="button" class="btn btn-light btnDetallesClass" data-toggle=modal data-target="#staticBackdrop" id="${item.product_id}">Ver detalles</button>
                </div>

                <div class="card-body">
                    <h5 class="card-title" id="nameProduct${item.product_id}">${item.product_name}</h5>
                    <p class="card-text-cost">$ ${item.product_cost} mxn</p>
                </div>
            </div>
        </div>`;
        const itemsContainer = document.getElementById("list-items");
        itemsContainer.innerHTML += itemHTML;   
    }
} // function addItem(item)

// Muestra los productos de acuerdo a la categoría seleccionada
let categorias = document.getElementsByClassName("btnCategoria");
for (let i = 0; i < categorias.length; i++) {
    categorias[i].addEventListener("click", (event) => {
        productoscat = [];
        pos = 0;
        categoriasactive =1;
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
            productoscat = productos;
        } // if

        for (let j = 0; j < productos.length; j++) {
            if (productos[j].product_category==1){ item = "Almacenamiento"}
            if (productos[j].product_category==2){ item = "Cocina"}
            if (productos[j].product_category==3){ item = "Decoración"}
            
            if (item == categoria) {
                console.log("ya")
                addItem(productos[j]);
                productoscat [pos]= productos[j]; 
                pos++;
            } // if
        } // for
        compras();
        modals();
    });
} // for

// Muestra el modal de acuerdo al producto seleccionado
let detalles = document.getElementsByClassName("btn btn-light btnDetallesClass");
let modals = () => {
    for (let i = 0; i < detalles.length; i++) {
        detalles[i].addEventListener("click", (event) => {
            
            document.getElementById("nombreProducto").innerHTML = productoscat[i].product_name;
            document.getElementById("descripcionProducto").innerHTML = productoscat[i].product_description;
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

// C A R R I T O
let comprar = document.getElementsByClassName("btnAgregarClass");
let piezas = 1;
let repetido = 1;
let compras = () => {
        for (let i = 0; i < comprar.length; i++) {
            comprar[i].addEventListener("click", (event) => {

                if (categoriasactive == 1){
                   productoscart = productoscat;
                } else{productoscart = productos;}; 
                
                if(carrito.length!=0){
                    let IDC;
                    for (let j =0; j<carrito.length;j++){
                        repetido = 1;
                        IDC = carrito[j].name;
                        if (IDC == productoscart[i].product_name) {
                            repetido = 2;
                            let data = JSON.parse(localStorage.getItem("carrito"));
                            data[j].piezas = data[j].piezas + 1;
                            //SOBREESCRIBIMOS LA VARIABLE de localStorage
                            localStorage.setItem("carrito", JSON.stringify(data));
                            break;
                        } 
                    } //for
                } //if carrito>0
                
                if(repetido==1){
                        let producto = `{ 
                            "id": ${productoscart[i].product_id},
                            "name": "${productoscart[i].product_name}",
                            "img": "${productoscart[i].product_img}",
                            "cost": ${productoscart[i].product_cost},
                            "piezas":${piezas}
                        }`;
                        
                        // Local Storage
                        carrito.push(JSON.parse(producto));
                        localStorage.setItem("carrito", JSON.stringify(carrito)); 
                } //if no se repite

                Swal.fire({
                    icon: 'success',
                    width: '20%',
                    text: 'Se ha añadido al carrito',
                    showConfirmButton: false,
                    timer: 1000
                })
             } ) //addEventListener 
            } //for compras
};//funcion compras
        
// Función para traer los productos
window.addEventListener("load", function() {
    fetch(URL_MAIN, {
        // Agregar el tipo de método
        method: "GET",
        // agrega los encabezados a la solicitud
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function(response) {
            response.json().then(function (json) {
            productos=json;     
            productoscat = productos;
            productos.forEach(element => {
                addItem(element);
            }); // for-each
            if (localStorage.getItem("carrito") != null) {
                carrito = JSON.parse(localStorage.getItem("carrito"));
            }
            modals();
            compras();
           })
        });
});