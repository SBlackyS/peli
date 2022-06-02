// const e = require("cors");

const socket = io();
const contenedor = document.querySelector('#peliculas');
const contenedor2 = document.querySelector('#peliculas2');
var borrar, edite;
const editar = document.querySelector("#edit");
const modalEdite = document.querySelector("#modalContainerEdit");
const closeModalEdit = document.querySelector("#close-modal-edit");
const btnGuardarEdit = document.querySelector("#btnGuardarEdit");
const modalContainerEdite = document.querySelector("#modalContainerEdit");
this.pelis;

socket.on('listado-peliculas', ( pe, callback) =>{
    console.log(pe)
    this.window.pelis = pe;

for(let i=0;i<pe.length;i++){   
    const div = document.createElement("div");
    const boton = document.createElement("button");
    const edit = document.createElement("button");
    const { _id, id, nombre, prota, anio, sinopsis } = pe[i];

    // console.log(_id);
    let txt = document.createTextNode(nombre);
    let sinop = document.createTextNode(sinopsis);
    let p = document.createElement("p");
    let pSin = document.createElement("p");
    pSin.setAttribute("class", "caja-trasera");
    div.setAttribute("class", "container-peliculas");
    p.appendChild(txt);
    div.appendChild(p);
    if(contenedor2){
        txt=document.createTextNode(sinopsis);
        pSin.appendChild(txt);
        div.appendChild(pSin);
        contenedor2.appendChild(div);
    }
    if(contenedor){
        txt = document.createTextNode("X");
        boton.appendChild(txt);
        txt = document.createTextNode("Editar");
        edit.appendChild(txt);
        
    
        //Agregando las clases
        boton.setAttribute("id", "delete");
        boton.setAttribute("onclick", "myFunction(event)");
        edit.setAttribute("id", "edit");
        edit.setAttribute("onclick", "myEdit(event)");
        div.appendChild(boton).classList.add(_id);
        div.appendChild(edit).classList.add(_id);

        contenedor.appendChild(div);
    }
}
    borrar = document.getElementsByTagName("button");
    return callback(
        "Llegaron los valoresss ",
        true
    ) 
});


function myFunction(event){
    borrar = event.target.className;
    console.log(borrar);
    socket.emit("borrar-peli", borrar)
}
function myEdit(event){
    edite = event.target.className;
    console.log(edite);
    
    socket.emit('edite-peliculas', edite, (callback) => {
        const { _id, id, nombre, prota, anio, sinopsis } = callback;
        document.querySelector("#nombreEdit").value = nombre;
        document.querySelector("#protaEdit").value = prota;
        document.querySelector("#anioEdit").value = anio;
        document.querySelector("#sinopsisEdit").value = sinopsis;
        document.querySelector("#btnGuardarEdit").setAttribute("class", _id);
        modalEdite.style="display: flex";
    })
}
closeModalEdit.addEventListener('click', () =>{
    modalContainerEdite.style="display:none";
} )
btnGuardarEdit.addEventListener('click', () => {
    const nombre = document.querySelector("#nombreEdit").value;
    const prota = document.querySelector("#protaEdit").value;
    const anio = document.querySelector("#anioEdit").value;
    const sinopsis = document.querySelector("#sinopsisEdit").value;
    const _id = document.querySelector("#btnGuardarEdit").className;
    // alert(_id);
    const newValores = ({
        _id,
        id:0,
        nombre,
        prota,
        anio,
        sinopsis
    });

    socket.emit('update-pelicula', newValores, (callback) => {
        console.log(callback);
        modalContainerEdite.style="display:none";
    })
    console.log("Aquí guardas");
})