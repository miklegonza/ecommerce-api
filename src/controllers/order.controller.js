const orderModel = require('../models/order.model');

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).send(orders);
    } catch (error) {
        console.log('🚀,getOrder,error:', error);
        res.status(500).send({ message: 'Error al buscar la orden' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findOne({ _id: id });
        if (!order) {
            res.status(401).send({ message: 'La orden no exite' });
            return;
        }
        res.status(200).send(order);
    } catch (error) {
        console.log('🚀~ getOrderById ~ error', error);
        res.status(500).send({ message: 'Error: la orden no existe' });
    }
};

const createOrder = async (req, res) => {
    try {
        const {
            nombre,
            telefono,
            correo,
            direccion,
            productos,
            medioPago,
            total,
        } = req.body;
        const order = new orderModel({
            nombre,
            telefono,
            correo,
            direccion,
            productos,
            medioPago,
            total,
        });
        const saved = await order.save();
        res.status(200).send(saved);
    } catch (error) {
        console.log('🚀 ~ createOrder ~ error :', error);
        res.status(500).send({ message: 'Error al crear la orden' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            telefono,
            correo,
            direccion,
            productos,
            medioPago,
            total,
        } = req.body;

        const orderExists = await orderModel.findById(id);

        if (!orderExists) {
            res.status(400).send({ message: 'La orden no existe' });
            return;
        }

        orderExists.nombre = nombre;
        orderExists.telefono = telefono;
        orderExists.correo = correo;
        orderExists.direccion = direccion;
        orderExists.productos = productos;
        orderExists.medioPago = medioPago;
        orderExists.total = total;

        const updated = await orderModel.findByIdAndUpdate(id, orderExists, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log('🚀 ~ updateOrder ~ error:', error);
        res.status(500).send({ message: 'Error al actualizar la orden' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const orderExists = await orderModel.findById(id);

        if (!orderExists) {
            res.status(400).send({ message: 'La orden no existe' });
            return;
        }
        const deleted = await orderModel.deleteOne({ _id: id });
        if (deleted.deletedCount === 0) {
            res.status(400).send({ message: 'No se eliminó' });
            return;
        }
        res.status(200).send(deleted);
    } catch (error) {
        console.log('🚀 ~ deleteOrder ~ error:', error);
        res.status(500).send({ message: 'Error al eliminar la orden' });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
