

window.addEventListener("load", function() {
    if (localStorage.getItem("carrito") != null) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        mostrarlista(carrito);
        costo();
        piezas();
    } // if
});

// Función para mostrar los productos que se eligieron  
function mostrarlista(carrito) {
    carrito.forEach(element => {
        const itemHTML = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img class ="Imgprod" src="${element.img}" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 id = "nombreprod" class="card-title">${element.name}</h5>
                  <p id = "costoprod" class="art-costo">$${element.cost} mxn</p>
                  <div> <button type="button" id ="btn+" class="btn+ btn-light btn-sm">+</button>
                    <i id="piezas${element.id}" class="art-piezas">${element.piezas}</i>
                  <button type="button" id ="btn-" class="btn- btn-light btn-sm">-</div>
                </div>
              </div>
            </div>
        </div>`;
        const itemsContainer = document.getElementById("listaProductos");
        itemsContainer.innerHTML += itemHTML;
    });
   
} // function mostrar lista




////////////////// AGREGAR O QUITAR PIEZAS
// let agregar = document.getElementById("btn+");
// let quitar = document.getElementById("btn-");

// let numpiezas = document.getElementById("piezas");
// let piezas = 1;

// agregar.addEventListener("click", (event) => { 
//     piezas ++;
//     numpiezas.innerHTML = piezas;
// });


// quitar.addEventListener("click", (event) => { 
//     piezas --;
//     numpiezas.innerHTML = piezas;

//     if (piezas==0){
//         let producto = document.getElementById
//     }
// });



// A G R E G A R   O   Q U I T A R   P I E Z A S
let agregar = document.getElementsByClassName("btn+");
let quitar = document.getElementsByClassName("btn-");

let cantidadpiezas = () => {
        for (let i = 0; i < agregar.length; i++) {
            agregar[i].addEventListener("click", (event) => {
                let numpiezas = document.getElementById("`piezas${i}`");
                console.log("agregar");
                piezas ++;
                numpiezas.innerHTML = piezas;
            });
        }
       
        for (let i = 0; i < quitar.length; i++) {
          quitar[i].addEventListener("click", (event) => {
              let numpiezas = document.getElementById("`piezas${i}`");
              console.log("quitar");
              piezas --;
              numpiezas.innerHTML = piezas;
          });
      }

    }

let sub_total = 0;
let numarticulos = 0;
   
  
  function costo(){
        carrito.forEach(element => {
          sub_total += element.cost*element.piezas;
        });

          let subtotal = document.getElementById("subtotal");
          subtotal.innerHTML = `$ ${sub_total} mxn`;
        }
   
      
  function piezas(){
          carrito.forEach(element => {
            numarticulos += element.piezas;
          });
          let articulos = document.getElementById("articulos");
          articulos.innerHTML = numarticulos;
            };
          
          

 






















// cuando se agregue producto mostrar mensaje de confirmacion y un indice en el icono de carrito
// quitar productos cuando se haga cero y mostrar mensaje de confirmacion
//buena funcionalidad entre menus
// que no avance si no ha iniciado sesion
//menu de como quiere envio
//si quiere foraneo, trato directo con cliente
// mitad deposito, mitad a la entrega















