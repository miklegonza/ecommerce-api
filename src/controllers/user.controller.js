const userModel = require('../models/user.model');

const login = async (req, res) => {
    try {
        const { usuario, clave } = req.body;
        const user = await userModel.findOne(
            { usuario },
            { _id: true, usuario: true, clave: true, nombre: true }
        );
        if (!user) {
            res.status(403).send({ message: 'Usuario no encontrado' });
            return;
        }
        if (clave !== user.clave) {
            res.status(401).send({ message: 'La clave es incorrecta' });
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        console.log('🚀 ~ login ~ error:', error);
        res.status(500).send({ message: 'Error al buscar el usuario' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.log('🚀 ~ getUsers ~ error:', error);
        res.status(500).send({ message: 'Error al buscar los usuarios' });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const { usuario } = req.params;
        const user = await userModel.findOne({ usuario });
        if (!user) {
            res.status(401).send({ message: 'El usuario no existe' });
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        console.log('🚀 ~ getUserByUsername ~ error:', error);
        res.status(500).send({ message: 'Error al buscar el usuario' });
    }
};

const createUser = async (req, res) => {
    try {
        const { usuario, nombre, telefono, correo, clave, admin } = req.body;
        const user = new userModel({
            usuario,
            nombre,
            telefono,
            correo,
            clave,
            admin,
        });
        const saved = await user.save();
        res.status(200).send(saved);
    } catch (error) {
        console.log('🚀 ~ createUser ~ error:', error);
        res.status(500).send({ message: 'Error al crear el usuario' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario, nombre, telefono, correo, clave, admin } = req.body;

        const userExists = await userModel.findById(id);

        if (!userExists) {
            res.status(400).send({ message: 'El usuario no existe' });
            return;
        }

        userExists.usuario = usuario;
        userExists.nombre = nombre;
        userExists.telefono = telefono;
        userExists.correo = correo;
        userExists.clave = clave;
        userExists.admin = admin;

        const updated = await userModel.findByIdAndUpdate(id, userExists, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log('🚀 ~ updateUser ~ error:', error);
        res.status(500).send({ message: 'Error al modificar el usuario' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userExists = await userModel.findById(id);
        if (!userExists) {
            res.status(400).send({ message: 'El usuario no existe' });
            return;
        }

        const deleted = await userModel.deleteOne({ _id: id });
        if (deleted.deletedCount === 0) {
            res.status(400).send({ message: 'No se eliminó' });
            return;
        }
        res.status(200).send(deleted);
    } catch (error) {
        console.log('🚀 ~ deleteUser ~ error:', error);
        res.status(500).send({ message: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    login,
    getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
};
