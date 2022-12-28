import {validateNumber, validateParams, productStructureKeys} from "../utils/validation.js";

const Producto = await import("../daos/productos/mongodb.js");
const schema = await import("../contenedores/mongo/productos.js");
const productoApi = new Producto.default(schema.default)


const listarProductos = async (req, res, next) => {
    try {
        const productos = await productoApi.listarProductos();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
}

const listarProductosId = async (req, res, next) => {
    try {
        const id = req.params.id;
        validateNumber(id, "El id no es un numero");
        const producto = await productoApi.listarProductosId(id);
        res.status(200).json(producto);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const agregarProducto = async (req, res, next) => {
    try {
        validateParams(productStructureKeys, req.body);
        const id = await productoApi.agregarProducto({timestamp: new Date().toISOString(),
                                    ...req.body})
        res.status(200).json(id)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const actualizarProducto = async (req, res, next) => {
    try {
        console.log("probando")
        validateNumber(req.params.id, "El id no es un numero");
        console.log("pase la prueba")
        const newProduct = await productoApi.actualizarProducto(req.params.id, req.body)
        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const eliminarProducto = async (req, res, next) => {
    try {
        const id = req.params.id
        validateNumber(id, "El id no es un numero");
        await productoApi.eliminarProducto(id);
        res.status(204).send()
    } catch (error) {
        console.log(error)
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