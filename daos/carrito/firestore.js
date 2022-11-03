import ContFirestore from "../../contenedores/contFirestore.js";
import {NotFoundError} from "../../utils/errors.js";

class Carrito extends ContFirestore{
    constructor(collection){
        super(collection);
       super.read().then(data => {
           data.docs.sort((a,b) => a.id - b.id);
           this.idCount = data.docs[data.docs.length - 1]?.data().id + 1 || 1;
       })
    }

    async listarProductosIdCarrito(id){
        const data = await super.read();
        const search = data.docs.find(el => el.data().id === +id);
        if(!search) throw new NotFoundError("El id solicitado no se encuentra");
        return search.data().productos;
    }

    async agregarCarrito(cart){
        console.log(this.idCount)
        cart = {id: this.idCount++, ...cart}

        await super.saveItem(cart)

        return cart.id
    }

    async AgregarProductoIdCarrito(id, properties){
        const data = await super.read();
        const productToUpdate = data.docs.findIndex(el => el.data().id === +id);
        
        if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        const arrayProductos = data.docs[productToUpdate].data()
        arrayProductos.productos.push(properties)
        await super.updateItem(data.docs[productToUpdate].id, {productos: arrayProductos.productos});

        return properties
    }

    async eliminarIdProductoIdCarrito(idCarrito, idProducto){
        console.log(idProducto, typeof idProducto)
        const data = await super.read();

        const cartToFilter = data.docs.findIndex(el => el.data().id === +idCarrito);
        
        if(cartToFilter === -1) throw new NotFoundError("El id de carrito solicitado no se encuentra")

        const dataFiltered = data.docs[cartToFilter].data().productos.filter(el => el.id !== +idProducto);
        
        if(data.docs[cartToFilter].data().productos.length === dataFiltered.length) throw new NotFoundError("El id de producto solicitado no se encuentra");
        
        const arrayProductos = data.docs[cartToFilter].data()
        arrayProductos.productos = dataFiltered

        await super.updateItem(data.docs[cartToFilter].id, {productos: arrayProductos.productos});
    }

    async eliminarCarrito(id){
        const data = await super.read();
        const cartToFilter = data.docs.findIndex(el => el.data().id === +id);
        
        if(cartToFilter === -1) throw new NotFoundError("El id de carrito solicitado no se encuentra");

        await super.deleteItem(data.docs[cartToFilter].id);
    }
}

export default Carrito