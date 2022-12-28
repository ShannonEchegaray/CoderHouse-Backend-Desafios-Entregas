import {validateNumber} from "../utils/validation.js";

const Carrito = await import("../daos/carrito/mongodb.js");
const schema = await import("../contenedores/mongo/carritos.js");
const carritoApi = new Carrito.default(schema.default)

const agregarCarrito = async (req, res, next) => {
    try {
        const id = await carritoApi.agregarCarrito({timestamp: new Date().toISOString(), productos: []});
        res.status(200).json(id);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const eliminarCarrito = async (req, res, next) => {
    try {
        const id = req.params.id
        validateNumber(id, "El id no es un numero");
        await carritoApi.eliminarCarrito(id);
        res.status(204).send()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const listarCarritoId = async (req, res, next) => {
    try {
        const id = req.params.id;
        validateNumber(id, "El id no es un numero");
        const products = await carritoApi.listarProductosIdCarrito(id);
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const AgregarProductoIdCarrito = async (req, res, next) => {
    try {
        validateNumber(req.params.id, "El id no es un numero");
        const newProduct = await carritoApi.AgregarProductoIdCarrito(req.params.id, req.body);
        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const eliminarIdProductoIdCarrito = async (req, res, next) => {
    try {
        validateNumber(req.params.id, "El id no es un numero");
        validateNumber(req.params.id_prod, "El id de producto no es un numero")
        await carritoApi.eliminarIdProductoIdCarrito(req.params.id, req.params.id_prod);
        res.status(204).send()
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export {
    listarCarritoId,
    agregarCarrito,
    eliminarCarrito,
    AgregarProductoIdCarrito,
    eliminarIdProductoIdCarrito
}