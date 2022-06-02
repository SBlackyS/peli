// const { dbConnect } = require('../db/connectDB');
const { Schema, model } = require('mongoose');

const PeliculasSchema = Schema({
     id: {
         type: String,
         required: [true, "El ID es obligatiorio"],
         unique: false
     },
     nombre: {
         type: String,
         required: [true, "El nombre de la película es obligatorio"],
     },
     prota: {
         type: String,
         required: [true, "El protagonista es obligatorio"]
     },
     anio:{
        type: Number,
        required: [true, "El año es obligatorio"]
     },
     sinopsis: {
         type: String,
         required: [true, "La sinopsis es obligatoria"]
     }
});
const Peliculas = model( 'peli', PeliculasSchema );


module.exports = {
    // model('Pelicula', PeliculasSchema );
    Peliculas
}