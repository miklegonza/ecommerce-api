const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        usuario: {
            type: String,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        telefono: {
            type: Number,
            required: true,
        },
        correo: {
            type: String,
            required: true,
        },
        clave: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('User', userSchema);
