function addItem(item){
    const itemHTML = `
    <div class="col" id="categoria1">
        <div class="card">
            <img src="${item.img}" alt="..." >
            <div class="btnCategoriaCard">
                <div>
                    <button type="button" class="btn btn-light" data-toggle=modal data-target="#staticBackdrop">Ver detalles</button>
                </div>
                <div class="botonAgregar">
                    <button type="button" class="btn btn-dark" onclick="">Agregar!</button>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
            </div>
        </div>
    </div>`;
        
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

addItem({
    'id': 1,
    'name':'juice',
    'img':'https://www.gs1india.org/media/Juice_pack.jpg',
    'description':'Orange and Apple juice fresh and delicious'
});

addItem({
    'id': 2,
    'name':'Tayto',
    'img':'https://www.irishtimes.com/polopoly_fs/1.4078148!/image/image.jpg',
    'description':'Cheese & Onion Chips'
});
