

function producto1 () {
    Swal.fire({
        title: 'Producto número 1',
        text: 'Producto elaborado y fabricado con .....',
        // html: 
        // confirmButtonText: 'Comprar',
        // confirmButtonColor: '#DCEFC3',
        // confirmButtonAriaLabel: 'Comprar',
        showConfirmButton: false,
        showCloseButton: true,
        closeButtonAriaLabel: 'Cerar',
        width: '90%',
        height: '90%',
        padding: '1%',
        // grow: '90%',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true,
        stopKeydownPropagation: false,
        customClass: {
            confirmButton: 'botonConfirmar',

        },
        
        // input: 'number',

        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: '90%',
        imageHeight: '90%',
        imageAlt: 'Leyenda del buscador del prodcuto 1',
    })
    }