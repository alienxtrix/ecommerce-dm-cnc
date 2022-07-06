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

                Swal.fire({
                    icon: 'success',
                    width: '20%',
                    height: '20%',
                    text: 'Se ha añadido al carrito',
                    showConfirmButton: false,
                    timer: 1000
                })
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
        agregar(`{ "id": ${1}, "name": "Base para audífonos", "img": "http://drive.google.com/uc?export=view&id=1fv7KLW4Yi1rYmQ5MzFR8-CP6el-pBpUJ", "category" : "Decoración", "cost": ${500}, "status": "activo", "description" : "Base para audífonos y/o auriculares hecho 100% de madera de resistente de alta calidad con textura natural, estilo único y duradero. Puede organizar tus auriculares en la oficina o en casa, y hacer que tu escritorio sea claro de un vistazo. Cuenta con una medidas 25 cm de alto x 15 cm de ancho. Es muy adecuado para auriculares, cables colgantes, adífonos y otros dispositivos. Ordena tu espacio en casa y en la oficina. El diseño hiperboloide en forma de U es hermoso y se adapta perfectamente a la correa de auriculares.", "rate": ${4} }`);
        agregar(`{ "id": ${2}, "name": "Bandeja para despicar hierbas", "img": "http://drive.google.com/uc?export=view&id=1BKNTj5hICy-YmiveV4_7TTALPwlvCB70", "category" : "Cocina", "cost": ${350}, "status": "activo", "description" : "Bandeja con varios compartimientos, hecho 100% de madera conocido por ser duradero y resistente mientras que ligero. Práctico y perfecto para tus necesidades de rolar liar forjar para mantener tu casa o escritorio limpio y de muy fácil mantenimiento. Estas bandejas sirven con su propósito perfectamente. Contiene todos tus artículos de fumar y residuos dentro. La gran bandeja rodante es agradable y grande y puede adaptarse a todos tus suministros de humo personalizados. Tiene unas medidas 30 cm de ancho x 20 cm largo.", "rate": ${5} }`);
        agregar(`{ "id": ${3}, "name": "Base para cuchillos", "img": "http://drive.google.com/uc?export=view&id=1DKn4Q-CbJ2CV0Csu8L2qpaQxTcwJoXx2", "category" : "Cocina", "cost": ${250}, "status": "activo", "description" : "Porta Cuchillos hecho de madera de pino de primera calidad. SOLO ES EL PORTA CUCHILLOS, NO INCLUYE CUCHILLOS.Madera tratada con aceites orgánicos que evitan la aparición de hongos y bacterias sobre la madera ( aceite mineral, aceite de linaza, cera de abeja, aceite de coco). Cuenta con varios compartimientos, con una medida total de 20 cm de altura x 15 cm de ancho. Cuenta con 6 ranuras de 5.5 cm de largo en la parte superior ideal para cuchillos de hojas largas y posee una abertura accesoria de 5cm de largo y 1.2 cm de ancho en la parte mas amplia, útil para reposar tijeras.", "rate": ${3} }`);
        agregar(`{ "id": ${4}, "name": "Porta vasos en forma de rompezabezas", "img": "http://drive.google.com/uc?export=view&id=1CliBjKmk-4CX2NuiRlD3zMqMBUY3T-Xa", "category" : "Cocina", "cost": ${200}, "status": "activo", "description" : "Viste tu mesa y tus bebidas con este paquete de 4 portavasos. Con diseño de rompecabezas. Cada uno cuenta con unas medidas 10 cm de largo x 10 cm de ancho. Materiales ecológicos, nuestros portavasos están hechos 100% de madera real.Con nuestros portavasos, ya no tendrá que preocuparse por los círculos de agua y las manchas en el mostrador de la cocina o la mesa de madera. Estos materiales ecológicos le permiten disfrutar del té y contribuir al medio ambiente del mundo.", "rate": ${4} }`);
        agregar(`{ "id": ${5}, "name": "Tabla para picar alimentos", "img": "http://drive.google.com/uc?export=view&id=1A5Ff2TJLhYytAc7SlGdl1TUDbNN2jJfG", "category" : "Cocina", "cost": ${190}, "status": "activo", "description" : "Diseño rectangular 100% de madera con unas medidas 30 cm de ancho x 35 cm ancho. Puedes picar, corta y rebana cualquier alimento como todo un Chef con facilidad. Ya sean especias, frutas, carnes, o vegetales, además gracias a su diseño de madera podrás distinguir fácilmente los pequeños pedazos que vayas cortando. Cuenta con el tamaño ideal para guardarla junto a tus accesorios de cocina. En tus cajones, alacena donde desees. Además, para ahorrar espacio de almacenamiento, puedes colgarla en la pared de tu cocina. Facilita la limpieza, favorece la higiene y no acumula bacterias.", "rate": ${4} }`);
        agregar(`{ "id": ${6}, "name": "Bandeja para alimentos diseño de conejo", "img": "http://drive.google.com/uc?export=view&id=1Y5nuoEMiiXcckaGGSDAfFoVn63e2IuCt", "category" : "Cocina", "cost": ${200}, "status": "activo", "description" : "Bandeja con diseño de conejo elaborada 100% madera y barnizada, sus medidas son 30 cm x 30 cm, puedes pedirla de color natural o color chocolate. ", "rate": ${5} }`);
        agregar(`{ "id": ${7}, "name": "Lampara LED de Dragonite", "img": "http://drive.google.com/uc?export=view&id=1mAwFjbZPH_qQHgeesrSkz3cAHYVDdtgs", "category" : "Decoración", "cost": ${350}, "status": "activo", "description" : "Lampara LED Modelo Pokémon Dragonite, hecho 100% de madera personalizada a color negro, medidas 50cm x 50xm,puedes personalizar la iluminación LED desde una app y elegir un color de una paleta de colores de más de 16 millones de colores y diferentes tonos de luz blanca, controles de atenuación y brillo. Funciona con adaptador de usb 5v ya incluido.", "rate": ${5} }`);
        agregar(`{ "id": ${8}, "name": "Lampara LED de Gengar", "img": "http://drive.google.com/uc?export=view&id=1r15yWNVW5ZiHnZofQJlgeS-5hMcOLTfk", "category" : "Decoración", "cost": ${350}, "status": "activo", "description" : "Lampara LED Modelo Gengar, hecho 100% de madera personalizada a color negro, puedes personalizar la iluminación LED desde una app y elegir un color de una paleta de colores de más de 16 millones de colores y diferentes tonos de luz blanca, controles de atenuación y brillo. Funciona con adaptador de usb 5v ya incluido.", "rate": ${5} }`);
        agregar(`{ "id": ${9}, "name": "Bandeja para alimentos diseño de pato", "img": "http://drive.google.com/uc?export=view&id=1XLofip9EX_6CgefYTK-q4ba9tLl5O3z9", "category" : "Cocina", "cost": ${200}, "status": "activo", "description" : "Bandeja con diseño de pato elaborada 100% madera y barnizada, sus medidas son 30 cm x 30 cm, puedes pedirla de color natural o color chocolate. ", "rate": ${4} }`);
        agregar(`{ "id": ${10}, "name": "Porta-cervezas", "img": "http://drive.google.com/uc?export=view&id=1CLr3ydKpRndh1AEL38007UnVQ4UYRCHP", "category" : "Almacenamiento", "cost": ${200}, "status": "activo", "description" : "Lleva tus cervezas a todos lados con este porta cervezas muy funcional, cuenta con 6 espacios y agarradera, tiene como medidas 30 cm x 25 cm, la puedes pedir personalizada con el color de tu elección, no incluye envases mostrados en la imagen.", "rate": ${4} }`);
        agregar(`{ "id": ${11}, "name": "Frutero", "img": "http://drive.google.com/uc?export=view&id=1CyJtI2UZpuX1wzVen_ntCA4Pa_Tm5k7w", "category" : "Cocina", "cost": ${250}, "status": "activo", "description" : "Coloca tus alimentos en este frutero minimalista, elaborada 100% de MDF por lo que es muy ligera, tiene como medidas 30 cm de diametro, la puedes pedir personalizada con el color de tu elección.", "rate": ${4} }`);
    }
});