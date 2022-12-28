import { errorMonitor } from "events";
import ContMongoDB from "../../contenedores/contMongo.js";
import {NotFoundError} from "../../utils/errors.js";

class Carrito extends ContMongoDB{
    constructor(schema){
        super(schema);
    }

    async listarProductosIdCarrito(id){
        try {
            const data = await super.read({id});
            if(!data) throw new NotFoundError("No se encontro el carrito " + id)
            return data.productos;    
        } catch (error) {
            throw error;            
        }
    }

    async agregarCarrito(cart){
        try {            
            const cartSaved = await super.saveItem(cart)
            return cartSaved._id;
        } catch (error) {
            throw error;
        }
    }

    async AgregarProductoIdCarrito(id, properties){
        try {
            const data = await super.read({id});
            data.productos.push(properties)
            await super.updateItem(data._id, {productos: data.productos});
            return properties;
        } catch (error) {
            throw error;
        }

    }

    async eliminarIdProductoIdCarrito(idCarrito, idProducto){
        try {
            const data = await super.read({id: idCarrito});
            const dataFiltered = data.productos.filter(el => el._id !== idProducto);
            data.productos = dataFiltered;
            await super.updateItem(data._id, data);
        } catch (error) {
            throw error;            
        }
    }

    async eliminarCarrito(id){
        try {
            const data = await super.read({id});
            await super.deleteItem(data._id);    
        } catch (error) {
            throw error;   
        }
    }
}

export default Carrito