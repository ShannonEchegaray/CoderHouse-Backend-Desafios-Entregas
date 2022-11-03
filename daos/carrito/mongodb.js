import ContMongoDB from "../../contenedores/contMongo.js";
import {NotFoundError} from "../../utils/errors.js";

class Carrito extends ContMongoDB{
    constructor(schema){
        super(schema);
        super.read().then(data => {
            data.sort((a,b) => a - b);
            this.idCount = data[data.length - 1]?.id + 1 || 1;
        })
    }

    async listarProductosIdCarrito(id){
        console.log(id)
        const data = await super.read();
        const search = data.find(el => el.id === +id);
        if(!search) throw new NotFoundError("El id solicitado no se encuentra");
        return search.productos;
    }

    async agregarCarrito(cart){
        cart = {id: this.idCount++, ...cart}

        await super.saveItem(cart)

        return cart.id
    }

    async AgregarProductoIdCarrito(id, properties){
        const data = await super.read();
        const productToUpdate = data.findIndex(el => el.id === +id);
        console.log(productToUpdate)
        
        if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        data[productToUpdate].productos.push(properties)

        console.log(data[productToUpdate])

        await super.updateItem(data[productToUpdate]._id, {productos: data[productToUpdate].productos});
        return properties
    }

    async eliminarIdProductoIdCarrito(idCarrito, idProducto){
        const data = await super.read();

        const cartToFilter = data.findIndex(el => el.id === +idCarrito);
        
        if(cartToFilter === -1) throw new NotFoundError("El id de carrito solicitado no se encuentra")

        const dataFiltered = data[cartToFilter].productos.filter(el => el.id !== +idProducto);

        if(data[cartToFilter].productos.length === dataFiltered.length) throw new NotFoundError("El id de producto solicitado no se encuentra");

        data[cartToFilter].productos = dataFiltered

        await super.updateItem(data[cartToFilter]._id, data[cartToFilter]);
    }

    async eliminarCarrito(id){
        const data = await super.read();
        const cartToFilter = data.findIndex(el => el.id === +id);
        
        if(cartToFilter === -1) throw new NotFoundError("El id de carrito solicitado no se encuentra");

        await super.deleteItem(data[cartToFilter]._id);
    }
}

export default Carrito