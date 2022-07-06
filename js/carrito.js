window.addEventListener("load", function() {
    if (localStorage.getItem("carrito") != null) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        mostrarlista(carrito);
        costo();
        piezas();
        cantidadpiezas();
        compras();
    } // if
});

// F U N C I O N   P A R A   M O S T R A R   P R O D U C T O S 
function mostrarlista(carrito) {
  let cont = 0;
    carrito.forEach(element => {
      if(element!=null){
        const itemHTML = `
        <div class="card mb-3" style="max-width: 520px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img class ="Imgprod" src="${element.img}" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 id = "nombreprod" class="card-title">${element.name}</h5>
                  <p id = "costoprod" class="art-costo">$${element.cost} mxn</p>
                  <div> <button type="button" id ="btn+" class="btn+ btn-info btn-sm">+</button>
                    <i id="piezas${cont}" class="art-piezas">${element.piezas}</i>
                  <button type="button" id ="btn-" class="btn- btn-info btn-sm">-</button>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
        const itemsContainer = document.getElementById("listaProductos");
        itemsContainer.innerHTML += itemHTML;
        cont++;
      }
    });
   
} // function mostrar lista

// P R O C E D E R   C O N  E L  E N V I O
function compras(){
  let compra = document.getElementById("btnCompra");
  compra.addEventListener("click", (event) => {
    event.preventDefault();
    if (!localStorage.getItem("statusSesion")) {
        Swal.fire({
          icon: 'error',
          title: 'Inicia sesión',
          text: 'Antes de continuar, por favor inicia sesión',
          showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cerrar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = "./login.html";
        }
      });
    } //if
    else{location.href = "./carrito-envio.html"};
  });//click
};//funcion compras

// A G R E G A R   O   Q U I T A R   P I E Z A S
let agregar = document.getElementsByClassName("btn+ btn-info btn-sm");
let quitar = document.getElementsByClassName("btn-");
let sub_total = 0;
let numarticulos = 0;
   
let cantidadpiezas = () => {
        for (let i = 0; i < agregar.length; i++) {
          console.log(i);
            agregar[i].addEventListener("click", (event) => {
                let numpiezas = document.getElementById(`piezas${i}`).textContent;
                numpiezas ++;
                document.getElementById(`piezas${i}`).textContent = numpiezas;

                //localStorage
                carrito[i].piezas = numpiezas;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                costo();
                piezas();
              
            });
        } // for agregar
       
        for (let i = 0; i < quitar.length; i++) {
          quitar[i].addEventListener("click", (event) => {
            let numpiezas = document.getElementById(`piezas${i}`).textContent;
            numpiezas --;
            document.getElementById(`piezas${i}`).textContent = numpiezas;
            if(numpiezas==0){
              alertborrar(i);
            }
                //localStorage
                carrito[i].piezas = numpiezas;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                costo();
                piezas();
          });
      } // for quitar

} // Function cantidadpiezas()



// F U N C I O N E S    C A L C U L A R   S U B T O T A L   Y P I E Z A S

  function costo(){
    sub_total = 0;
        carrito.forEach(element => {
          if(element!=null){
          sub_total += element.cost*element.piezas;
          }
        });
          let subtotal = document.getElementById("subtotal");
          subtotal.innerHTML = `$ ${sub_total} mxn`;
 }; // funcion costo
   
      
  function piezas(){
          numarticulos=0;
          carrito.forEach(element => {
         if(element!=null){
            numarticulos += element.piezas;
         }
          });
          let articulos = document.getElementById("articulos");
          articulos.innerHTML = numarticulos;
  }; // funcion piezas
          
// F U N C I O N   B O R R A R   P R O D U C T O
function alertborrar(i){
  Swal.fire({
    text: "¿Deseas eliminar este producto?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '¡Eliminado!',
        'El producto ha sido eliminado de tu compra',
        'success'
      )
      console.log(carrito[i]);
      delete (carrito[i]);
      let newcarrito = [];
      let j=0;
      for (let i=0;i<carrito.length;i++) {
        if(carrito[i]!=null){
          newcarrito[j] = carrito[i];
          j++;
        }
      };
      localStorage.setItem("carrito", JSON.stringify(newcarrito));
      setTimeout(() => {
        location.reload();
      }, 1500);
     
     
    }; // if es confirmado
  });
} // funcio borrar