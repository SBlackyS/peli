const btnModal = document.querySelector("#newMovie");
const modalContainer = document.querySelector("#modalContainer");
const btnCLoseModal = document.querySelector("#close-modal");
const btnGuardar = document.querySelector("#btnGuardar");


//Para el formulario
btnGuardar.addEventListener('click', () => {
    const   nombre = document.querySelector("#nombreRegistro").value;
    const   prota = document.querySelector("#protaRegistro").value;
    const   anio = document.querySelector("#anioRegistro").value;
    const   sinopsis = document.querySelector("#sinopsisRegistro").value;

    const valores = {
        id:0,
        nombre,
        prota,
        anio, 
        sinopsis
    }

    socket.emit('valores-nuevo', valores, (callback) =>  {
        this.window.pelis = callback;
        console.log(callback);  
    });
})



btnModal.addEventListener('click', () => {
    modalContainer.style="display:flex";
})
btnCLoseModal.addEventListener('click', () => {
    modalContainer.style="display:none";
    modalContainerEdite.style="display:none";
})