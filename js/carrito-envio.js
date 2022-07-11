let calle = document.getElementById("calle")
let numeroint = document.getElementById("numeroint")
let numeroext = document.getElementById("numeroext")
let CP = document.getElementById("CP")
let tenvio = 0;
let totalf = 0;

window.addEventListener("load", function() {
    if (localStorage.getItem("carrito") != null) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        costo();
        piezas();
    } // if
});


//------------ O P C I O N   R E C O G E R
let recoger = document.getElementById("gridRadios1");
recoger.addEventListener("change",(event) =>{
    console.log("ya");
if(recoger.checked == true){
    console.log("ya");
    document.getElementById("detallesenvio").style.display="block";
    document.getElementById("optiontienda").style.display="block";
    document.getElementById("optionlocal").style.display="none";
    tenvio = 0;
    envio();
    total();
} 

});


//-----------------O P C I O N   E N V I A R
let enviarupn = document.getElementById("gridRadios2");
enviarupn.addEventListener("change",(event) =>{
if(enviarupn.checked == true){
    document.getElementById("detallesenvio").style.display="block";
    document.getElementById("optionlocal").style.display="block";
    document.getElementById("optiontienda").style.display="none";
    tenvio=50;
    envio();
    total();
}

});

//------------------------------------------------V A L I D A C I O N E S 
let validacionnum = /^[0-9]{1,5}$/;  
function validarNumeroExt (){
    if (!validacionnum.test(numeroext.value)){
        numeroext.style.border = "red thin solid";
        document.getElementById("alertnume").innerHTML = "Escribe solo números";
        document.getElementById("alertnume").style="display: block; margin-bottom: -10px;";
        return false;
    } else { 
        numeroext.style.border = "green thin solid";
        document.getElementById("alertnume").style.display="none";
        return true;
    }
} //Validación Numero exterior


function validarCalle () {
    if(calle.value.length<3){
        calle.style.border = "red thin solid";
        document.getElementById("alertcalle").innerHTML = "La calle debe contener más de 3 caracteres";
        document.getElementById("alertcalle").style="display: block; margin-bottom: -10px;";
        return false;
    }else{
        calle.style.border = "green thin solid";
        document.getElementById("alertcalle").style.display="none";
        return true;
    }
} //Validación Calle


let validacioncp = /^[0-9]{5}$/;  
function validarCP (){
    if (!validacioncp.test(CP.value)){
        CP.style.border = "red thin solid";
        document.getElementById("alertcp").innerHTML = "Escribe 5 dígitos";
        document.getElementById("alertcp").style="display: block; margin-bottom: -10px;";
        return false;
    } else{ 
        CP.style.border = "green thin solid";
        document.getElementById("alertcp").style.display="none";
        return true;
    }
}  // Validacion CP

calle.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarCalle();
}) //Nombre

numeroext.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarNumeroExt();
}) //Apellido P

CP.addEventListener("blur",(e)=>{
    e.target.value = e.target.value.trim();
    validarCP();
}) 


// ----------------------------------- B O T O N   A C E P T A R   E N V I O 
aceptar.addEventListener("click",(event) =>{
    validarCP();
    validarCalle();
    validarNumeroExt();
    
    if(!validarCP() || !validarCalle() || !validarNumeroExt()){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text:'Completa correctamente el formulario',
          })
        return false;
    }
    
    // Si no falla validaciones, se muestra alerta de pedido realizado
    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Tu pedido se realizó exitosamente',
        showConfirmButton: false,
        timer: 1500
    });

    // Se limpia formulario
    document.getElementById('formEnvio').reset();
    CP.style.border = "none";
    numeroext.style.border = "none";
    calle.style.border = "none";
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setTimeout(() => {
        location.href = "./index.html";
    }, 1500);
    
});


//------------------------ B O T O N  A C E P T A R   R E C O G E R
aceptar1.addEventListener("click",(event) =>{

    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Tu pedido se realizó exitosamente',
        showConfirmButton: false,
        timer: 1500
    });
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setTimeout(() => {
        location.href = "./index.html";
    }, 1500);
});

// --------------------------F U N C I O N E S   P A R A   C A L C U L A R   C O N T E N I D O   D E  R E S U M E N
    function costo(){
        let sub_total = 0;
            carrito.forEach(element => {
            if(element!=null){
            sub_total += element.cost*element.piezas;
            }
            });
            let subtotal = document.getElementById("subtotal");
            subtotal.innerHTML = `$ ${sub_total} mxn`;
            return sub_total;
    }; // funcion sub-total
   
      
    function piezas(){
        let numarticulos=0;
            carrito.forEach(element => {
            if(element!=null){
                numarticulos += element.piezas;
            }
            });
            let articulos = document.getElementById("articulos");
            articulos.innerHTML = numarticulos;
    }; // funcion artículos

    function envio(){
        let envio = document.getElementById("costoenvio");
        envio.innerHTML = `$ ${tenvio} mxn`;
        return tenvio;
    } // función envío


    function total (){
        subbtotal = costo();
        tenvio = envio();
        totalf = subbtotal+tenvio;
        let htotal = document.getElementById("total");
        htotal.innerHTML = `$ ${totalf} mxn`;
    } // función total




// ------------------------B O T O N   R E G R E S A R
btnregresar.addEventListener("click",(event) =>{
        location.href = "carrito.html";
});



