const mongoose = require('mongoose');

const orderShema = mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
        },
        telefono: {
            type: Number,
            require: true,
        },
        correo: {
            type: String,
            require: true,
        },
        direccion: {
            type: String,
            require: true,
        },
        productos: {
            type: [],
            require: true,
        },
        medioPago: {
            type: String,
            require: true,
        },
        total: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Order', orderShema);
