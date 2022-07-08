window.addEventListener("load", function() {
    if (localStorage.getItem("carrito") != null) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        opcion();
    } // if
});

let recoger = document.getElementById("gridRadios1");

recoger.addEventListener("change",(event) =>{
    console.log("ya");
if(recoger.checked == true){
    console.log("ya");
    document.getElementById("detallesenvio").style.display="block";
    document.getElementById("optiontienda").style.display="block";
    document.getElementById("optionlocal").style.display="none";
} 

});

let enviarupn = document.getElementById("gridRadios2");

enviarupn.addEventListener("change",(event) =>{
if(enviarupn.checked == true){
    document.getElementById("detallesenvio").style.display="block";
    document.getElementById("optionlocal").style.display="block";
    document.getElementById("optiontienda").style.display="none";
}

});