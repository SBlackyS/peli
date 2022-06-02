const { Peliculas } = require('../models/peliculas-nuevo');

const socketController = (socket) =>{
    console.log("Cliente conectado: " , socket.id);
    
    const pelis = async () => {
        const pe = await Peliculas.find();
        // console.log(pe)
        socket.emit('listado-peliculas', pe, (callback) => { console.log(callback) });
        // socket.emit('delete-peliculas', pe, (callback) => { console.log(callback) });
    } 

    pelis();

    socket.on('edite-peliculas', (id, callback) => {
        console.log("Entre 1");
        const pelis2 = async () => {
            const pe = await Peliculas.findById(id);
            return callback (
                pe
            )
        }
        pelis2();
    })
    socket.on('find-pelicula', (valores,callback) => {
        const listaPeli = async () => {
            const usr = await Peliculas.find();
            console.log(usr);
            return callback(
                usr
                )
        } 
        listaPeli();
    })
    socket.on('update-pelicula', (valores,callback) => {
        const { _id, ixombre, prota, anio, sinopsis } = valores;
        Peliculas.findByIdAndUpdate(_id, {nombre: nombre, prota: prota, anio: anio, sinopsis: sinopsis }, function (err, docs){
            if(err){
                console.log(err);
            } else {
                console.log("Actualizado: ", docs);
            }
        });
        const newUser = async () => {
            const usr = await Peliculas.findById(_id);
            return callback(
                usr

                )
        } 
        newUser();
    })
    socket.on('disconnect', () =>{
        console.log( 'Cliente Desconectado', socket.id );
    })

    socket.on('valores-nuevo', (valores, callback) => {
        const { id, nombre, prota, anio, sinopsis } = valores;
        Peliculas.create({
            id,
            nombre,
            prota,
            anio,
            sinopsis
        })
        console.log("Nuevo Registro: ", valores);
        let peliNew;
        const pelis2 = async () => {
            const peliNew  = await Peliculas.find();
            return callback(
                peliNew
            ) 
        }

        pelis2();
    })
   
    socket.on('borrar-peli', (borrar, callback) => {
        console.log(borrar);
        Peliculas.findByIdAndDelete(borrar, function (err, docs) {
            if(err){
                console.log(err);
            } else {
                console.log("Delete: ", docs);
            }
        });
    })

}

module.exports = {
    socketController
}