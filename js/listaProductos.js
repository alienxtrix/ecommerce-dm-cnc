// Productos agregados
let producto1 = {'id':'1','name':'Bandeja para alimentos diseño de conejo','img':'http://drive.google.com/uc?export=view&id=1AR8JwB550-WC_rvKv0SH7HPICBcujJ12','category' : 'Cocina','cost' :'$250 mxn','description':'100% de madera, medidas 30 cm x 30 cm','rate':4};
let producto2 = {'id':'2','name':'Bandeja para alimentos diseño de pato','img':'http://drive.google.com/uc?export=view&id=1AnYqbyLJ2Mo9l4ncyEGkpFmHWcZsz5so','category' : 'Cocina','cost' :'$250 mxn','description':'100% de madera, medidas 30 cm x 30 cm','rate':2};
let producto3 = {'id':'3','name':'Bandeja para alimentos diseño de rana','img':'http://drive.google.com/uc?export=view&id=1AjsRsfP7NjgjIF7AfrErk4SqVVr-mWId','category' : 'Cocina','cost' :'$250 mxn','description':'100% de madera, medidas 30 cm x 30 cm','rate':5};
let producto4 = {'id':'4','name':'Porta Cervezas','img':'http://drive.google.com/uc?export=view&id=1CLr3ydKpRndh1AEL38007UnVQ4UYRCHP','category' : 'Varios','cost' :'$200 mxn','description':'100% de madera','rate':5};
let producto5 = {'id':'5','name':'Estante de almacenamiento','img':'http://drive.google.com/uc?export=view&id=1BZtmYypgzRlKiicmtqGg2p97xdT3vuHy','category' : 'Decoración','cost' :'$450 mxn','description':'Estante para artículos varios, medidas 70 cm x 150 cm','rate':2};
let producto6 = {'id':'6','name':'Base para audífonos','img':'http://drive.google.com/uc?export=view&id=19cgOR5I0x26Qxra0f3EbVsvacpdEm9dw','category' : 'Decoración','cost' :'$500 mxn','description':'100% madera, medidas 25 cm x 15 cm','rate':1};
let producto7 = {'id':'7','name':'Bandeja para despicar hierbas','img':'http://drive.google.com/uc?export=view&id=1BKNTj5hICy-YmiveV4_7TTALPwlvCB70','category' : 'Cocina','cost' :'$350 mxn','description':'Bandeja con varios compartimientos,100% madera, medidas 30 cm x 20 cm','rate':3};
let producto8 = {'id':'8','name':'Base para cuchillos','img':'http://drive.google.com/uc?export=view&id=1DKn4Q-CbJ2CV0Csu8L2qpaQxTcwJoXx2','category' : 'Cocina','cost' :'$250 mxn','description':'Base con varios compartimientos, medidas 20 cm x 15 cm','rate':4};
let producto9 = {'id':'9','name':'Porta vasos en forma de rompezabezas','img':'http://drive.google.com/uc?export=view&id=1CliBjKmk-4CX2NuiRlD3zMqMBUY3T-Xa','category' : 'Cocina','cost' :'$200 mxn','description':'Juego de 4 piezas, medidas 10 cm x 10 cm','rate':4};
let producto10 = {'id':'10','name':'Tabla para picar alimentos','img':'http://drive.google.com/uc?export=view&id=1A5Ff2TJLhYytAc7SlGdl1TUDbNN2jJfG','category' : 'Cocina','cost' :'$190 mxn','description':'Diseño rectangular, 100% madera, medidas 30 cm x 35 cm','rate':2};
let producto11 = {'id':'11','name':'Tabla para picar alimentos','img':'http://drive.google.com/uc?export=view&id=19qk_jxSjGv11P78-Ywm4c18H9wmfxPtl','category' : 'Cocina','cost' :'$190 mxn','description':'Diseño circular, 100% madera, medidas 30 cm diametro','rate':5};
let producto12 = {'id' : '12','name':'Frutero','img':'http://drive.google.com/uc?export=view&id=1CyJtI2UZpuX1wzVen_ntCA4Pa_Tm5k7w','category' : 'Cocina','cost' :'$250 mxn','description':'Diseño circular, medidas 30 cm x 30 cm','rate':5};

// Variable global de contador de prodcutos
let contador = 1;
let productos = [];

// Uso de la función addItem()
addItem(producto1);
addItem(producto2);
addItem(producto3);
addItem(producto4);
addItem(producto5);
addItem(producto6);
addItem(producto7);
addItem(producto8);
addItem(producto9);
addItem(producto10);
addItem(producto11);
addItem(producto12);

// Función para mostrar el producto con su card
function addItem(item, verificar) {
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
    if (verificar != 0) {
        contador++;
        productos.push(item);
    } // if
} // function addItem(item)

document.addEventListener('click', (event) => {
    console.log(event.target.className);
    event.preventDefault();
    if (event.target.className == "btnCategoria") {
        // console.log("btnCategoria");
        // Muestra los productos de acuerdo a la categoría seleccionada
        let categorias = document.getElementsByClassName("btnCategoria");
        for (let i = 0; i < categorias.length; i++) {
            categorias[i].addEventListener("click", (event) => {
                // event.preventDefault();
                document.getElementById("list-items").innerHTML = "";
                let categoria = categorias[i].innerHTML;
                for (let j = 0; j < productos.length; j++) {
                    let item = "" + productos[j].category + ""; 
                    if (item == categoria) {
                        // console.log(productos[j]);
                        addItem(productos[j], 0);
                    } // if
                } // for
            });
        } // for
    } else if (event.target.className == "btn btn-light btnDetallesClass") {
        // console.log("btnDesatlles");
        // Muestra el modal de acuerdo al producto seleccionado
        let detalles = document.getElementsByClassName("btn btn-light btnDetallesClass");
        for (let i = 0; i < detalles.length; i++) {
            detalles[i].addEventListener("click", (event) => {
                document.getElementById("nombreProducto").innerHTML =  "";
                document.getElementById("descripcionProducto").innerHTML =  "";
                // Agregar datos
                document.getElementById("nombreProducto").innerHTML =  productos[detalles[i].id-1].name;
                document.getElementById("descripcionProducto").innerHTML =  productos[detalles[i].id-1].description;
            });
        } // for
    } else if (event.target.className == "btnAboutUs")  {
        window.open("./aboutUs.html", "_self");        
    } else if (event.target.className == "nav-link") {
        let nav = document.getElementsByClassName("nav-link");
        for (let i = 0; i < nav.length; i++) {
            nav[i].addEventListener("click", (event) => {
                switch (i) {
                    case 0 :
                        window.open("./index.html", "_self");        
                        break;
                    case 1 :
                        window.open("./login.html", "_self");        
                        break;
                    case 2 :
                        window.open("./catalogo.html", "_self");        
                        break;
                    case 3 :
                        window.open("./aboutUs.html", "_self");        
                        break;
                } // switch
            });
        } // for
    } else if (event.target.className == "float-right img-fluid") {
        window.open("./carrito.html", "_self");        
    } // if
});