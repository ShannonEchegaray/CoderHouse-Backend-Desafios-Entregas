import Producto from "../models/producto.js";
import {validateNumber, validateParams, productStructureKeys} from "../utils/validation.js";

const productoApi = new Producto("productos.json");

const listarProductos = (req, res, next) => {
    try {
        const productos = productoApi.listarProductos();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
}

const listarProductosId = (req, res, next) => {
    try {
        const id = req.params.id;
        validateNumber(id, "El id no es un numero");
        const producto = productoApi.listarProductosId(id);
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
}

const agregarProducto = (req, res, next) => {
    try {
        validateParams(productStructureKeys, req.body);
        const id = productoApi.agregarProducto({timestamp: Date.now(),
                                    ...req.body})
        res.status(200).json(id)
    } catch (error) {
        next(error);
    }
}

const actualizarProducto = (req, res, next) => {
    try {
        validateParams(productStructureKeys, req.body);
        validateNumber(req.params.id, "El id no es un numero");
        const newProduct = productoApi.actualizarProducto(req.params.id, req.body)
        res.status(200).json(newProduct)
    } catch (error) {
        next(error);
    }
}

const eliminarProducto = (req, res, next) => {
    try {
        const id = req.params.id
        validateNumber(id, "El id no es un numero");
        productoApi.eliminarProducto(id);
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export {
    listarProductos,
    actualizarProducto,
    listarProductosId,
    eliminarProducto,
    agregarProducto
}