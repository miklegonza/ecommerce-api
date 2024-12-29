const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('DB Conectada');
    } catch (error) {
        console.log('Hubo un error', error);
    }
};

module.exports = conectarDB;
