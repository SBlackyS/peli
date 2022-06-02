const mongoose = require('mongoose');
    
const dbConnect = async() => {
    try {
        
        await mongoose.connect('mongodb://localhost:27017/pelis', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de conectar a la base de datos');
    }
}

module.exports = dbConnect();