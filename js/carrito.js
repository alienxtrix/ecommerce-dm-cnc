
let agregar = document.getElementById("btn+");
let quitar = document.getElementById("btn-");

let numpiezas = document.getElementById("piezas");
let piezas = 1;

agregar.addEventListener("click", (event) => { 
    piezas ++;
    numpiezas.innerHTML = piezas;
});


quitar.addEventListener("click", (event) => { 
    piezas --;
    numpiezas.innerHTML = piezas;

    if (piezas==0){
        let producto = document.getElementById
    }
});



