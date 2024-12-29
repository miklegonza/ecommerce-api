const mongoose = require('mongoose');

const { Schema } = mongoose;

const ComponentesSchema = new Schema(
    {
        producto: {
            type: String,
            required: true,
        },
        marca: {
            type: String,
            required: true,
        },
        modelo: {
            type: String,
            required: true,
        },
        caracteristicas: {
            type: [String],
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
        imagen: {
            type: String,
            required: true,
            default: 'https://via.placeholder.com/100x100',
        },
        carrito: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Component', ComponentesSchema);
