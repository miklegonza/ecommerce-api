const componentModel = require('../models/component.model');

const getComponents = async (req, res) => {
    try {
        const component = await componentModel.find();
        res.status(200).send(component);
    } catch (error) {
        console.log('🚀 ~ getComponents ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al consultar los componentes',
        });
    }
};

const getComponentById = async (req, res) => {
    try {
        const { id } = req.params;
        let component = await componentModel.findById(id);

        if (!component) {
            res.status(401).send({
                message: 'El producto no existe',
            });
        }
        res.status(200).send(component);
    } catch (error) {
        console.log('🚀 ~ getComponentById ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al consultar el producto',
        });
    }
};

const createComponent = async (req, res) => {
    try {
        const { producto, marca, modelo, caracteristicas, precio, imagen } =
            req.body;
        let component = new componentModel({
            producto,
            marca,
            modelo,
            caracteristicas,
            precio,
            imagen,
        });
        const saved = await component.save();
        res.status(200).send(saved);
    } catch (error) {
        console.log('🚀 ~ createProduct ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al guardar el producto',
        });
    }
};

const updateComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto, marca, modelo, caracteristicas, precio, imagen } =
            req.body;
        let componentExist = await componentModel.findById(id);

        if (!componentExist) {
            res.status(400).send({ message: 'No se encontró el producto' });
            return;
        }

        componentExist.producto = producto;
        componentExist.marca = marca;
        componentExist.modelo = modelo;
        componentExist.caracteristicas = caracteristicas;
        componentExist.precio = precio;
        componentExist.imagen = imagen;

        const updated = await componentModel.findByIdAndUpdate(
            id,
            componentExist,
            { new: true }
        );
        res.status(200).send(updated);
    } catch (error) {
        console.log('🚀 ~ updateComponent ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al actualizar el producto',
        });
    }
};

const deleteComponent = async (req, res) => {
    try {
        const { id } = req.params;
        const componentExist = await componentModel.findById(id);

        if (!componentExist) {
            res.status(400).send({ message: 'No se encontró el producto' });
            return;
        }
        const deleted = await componentModel.deleteOne({ _id: id });
        if (deleted.deleteCount === 0) {
            res.status(400).send({ message: 'No se eliminó' });
            return;
        }
        res.status(200).send(deleted);
    } catch (error) {
        console.log('🚀 ~ deleteComponent ~ error:', error);
        res.status(500).send({
            message: 'Hubo un problema al eliminar el producto',
        });
    }
};

module.exports = {
    getComponents,
    getComponentById,
    createComponent,
    updateComponent,
    deleteComponent,
};
