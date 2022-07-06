// Arreglo en donne se almacenan todos los productos y contador
let productos = [];
let carrito = [];
let contador = 0;

// PARA REINICIAR LOS PRODUCTOS AL POR DEFECTO PRIMERO HAY QUE BORRAR EL LOCALSTORAGE

// Función para mostrar productos de manera automática
function agregar (elemento) {
    productos.push(JSON.parse(elemento));
    localStorage.setItem("productos", JSON.stringify(productos));
    contador++;
    localStorage.setItem("contador", JSON.stringify(contador));
} // function agregar

// Función para mostrar el producto con su card
function addItem(item) {
    if (item.status == "activo") {
        let rate = "";
        for (let i = 1; i <= item.rate; i++) {
            rate += `<i class="fa fa-star" aria-hidden="true"></i>`
        } // for
        const itemHTML = `
        <div class="col" id="producto${item.id}">
            <div class="card">
                <img class = "ImgProdCat" src="${item.img}" alt="..." >
                <div id="puntuacion">
                    <p class="card-text-description star">
                        ${rate}
                    </p>
                </div>
                <div class="btnsCard">
                    <button type="button" class="btn btn-dark btnAgregarClass" onclick="">Agregar</button>
                    <button type="button" class="btn btn-light btnDetallesClass" data-toggle=modal data-target="#staticBackdrop" id="${item.id}">Ver detalles</button>
                </div>

                <div class="card-body">
                    <h5 class="card-title" id="nameProduct${item.id}">${item.name}</h5>
                    <p class="card-text-cost">$ ${item.cost} mxn</p>
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
            document.getElementById("nombreProducto").innerHTML = productos[detalles[i].id-1].name;
            document.getElementById("descripcionProducto").innerHTML = productos[detalles[i].id-1].description;
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
            if(carrito.length!=0){
                console.log("carrito>0");
                let IDC;
                for (let j =0; j<carrito.length;j++){
                    repetido = 1;
                    IDC = carrito[j].id;
                    if (IDC == productos[i].id) {
                        console.log("repetido");
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
                console.log("agrega no repetido");
                    let producto = `{ 
                        "id": ${productos[i].id},
                        "name": "${productos[i].name}",
                        "img": "${productos[i].img}",
                        "cost": ${productos[i].cost},
                        "piezas":${piezas}
                    }`;
                    // Local Storage
                    carrito.push(JSON.parse(producto));
                    localStorage.setItem("carrito", JSON.stringify(carrito)); 
            } //if no se repite
            } ) //addEventListener 
        } //for compras
};//funcion compras
        
// Función para traer los productos
window.addEventListener("load", function() {
    if (localStorage.getItem("productos") != null) {
        productos = JSON.parse(localStorage.getItem("productos"));
        productos.forEach(element => {
            addItem(element);
        }); // for-each
        if (localStorage.getItem("carrito") != null) {
            carrito = JSON.parse(localStorage.getItem("carrito"));
        }
        modals();
        compras();
    } else {
        // Creación y visualización de los productos
        agregar(`{ "id": ${1}, "name": "Base para audífonos", "img": "http://drive.google.com/uc?export=view&id=1BZtmYypgzRlKiicmtqGg2p97xdT3vuHy", "category" : "Decoración", "cost": ${500}, "status": "activo", "description" : "100% madera, medidas 25 cm x 15 cm", "rate": ${4} }`);
        agregar(`{ "id": ${2}, "name": "Bandeja para despicar hierbas", "img": "http://drive.google.com/uc?export=view&id=1BKNTj5hICy-YmiveV4_7TTALPwlvCB70", "category" : "Cocina", "cost": ${350}, "status": "activo", "description" : "Bandeja con varios compartimientos,100% madera, medidas 30 cm x 20 cm", "rate": ${5} }`);
        agregar(`{ "id": ${3}, "name": "Base para cuchillos", "img": "http://drive.google.com/uc?export=view&id=1DKn4Q-CbJ2CV0Csu8L2qpaQxTcwJoXx2", "category" : "Cocina", "cost": ${250}, "status": "activo", "description" : "Base con varios compartimientos, medidas 20 cm x 15 cm", "rate": ${3} }`);
        agregar(`{ "id": ${4}, "name": "Porta vasos en forma de rompezabezas", "img": "http://drive.google.com/uc?export=view&id=1CliBjKmk-4CX2NuiRlD3zMqMBUY3T-Xa", "category" : "Cocina", "cost": ${200}, "status": "activo", "description" : "Juego de 4 piezas, medidas 10 cm x 10 cm", "rate": ${4} }`);
        agregar(`{ "id": ${5}, "name": "Tabla para picar alimentos", "img": "http://drive.google.com/uc?export=view&id=1A5Ff2TJLhYytAc7SlGdl1TUDbNN2jJfG", "category" : "Cocina", "cost": ${190}, "status": "activo", "description" : "Diseño rectangular, 100% madera, medidas 30 cm x 35 cm", "rate": ${4} }`);
    }
});