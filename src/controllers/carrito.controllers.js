const carritoModel = require('../models/carrito.model');

const getCarritos = async (req, res) => {
    try {
        const carrito = await carritoModel.find();
        res.status(200).send(carrito);
    } catch (error) {
        console.log('🚀 ~ getCarritos ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al consultar los carrito',
        });
    }
};

const getCarritoById = async (req, res) => {
    try {
        const { id } = req.params;
        let carrito = await carritoModel.findById(id);

        if (!carrito) {
            res.status(401).send({
                message: 'El producto no existe',
            });
        }
        res.status(200).send(carrito);
    } catch (error) {
        console.log('🚀 ~ getCarritoById ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al consultar el carrito',
        });
    }
};

const createCarrito = async (req, res) => {
    try {
        const { producto, marca, precio, cantidad, imagen } = req.body;
        let carrito = new carritoModel({
            producto,
            marca,
            precio,
            cantidad,
            imagen,
        });
        const saved = await carrito.save();
        res.status(200).send(saved);
    } catch (error) {
        console.log('🚀 ~ createCarrito ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al guardar el carrito',
        });
    }
};

const updateCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, marca, precio, cantidad, imagen } = req.body;
        let carritoExist = await carritoModel.findById(id);

        if (!carritoExist) {
            res.status(400).send({ message: 'No se encontró el carrito' });
            return;
        }

        carritoExist.producto = producto;
        carritoExist.marca = marca;
        carritoExist.precio = precio;
        carritoExist.cantidad = cantidad;
        carritoExist.imagen = imagen;

        const updated = await carritoModel.findByIdAndUpdate(id, carritoExist, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log('🚀 ~ updateCarrito ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al actualizar el carrito',
        });
    }
};

const deleteCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const carritoExist = await carritoModel.findById(id);

        if (!carritoExist) {
            res.status(400).send({ message: 'No se encontró el carrito' });
            return;
        }
        const deleted = await carritoModel.deleteOne({ _id: id });
        if (deleted.deletedCount === 0) {
            res.status(400).send({ message: 'No se eliminó' });
            return;
        }
        res.status(200).send(deleted);
    } catch (error) {
        console.log('🚀 ~ deleteCarrito ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al eliminar el carrito',
        });
    }
};

module.exports = {
    getCarritos,
    getCarritoById,
    createCarrito,
    updateCarrito,
    deleteCarrito,
};
