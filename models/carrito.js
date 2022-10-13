const {readData, saveData} = require("../utils/manageData");
const {NotFoundError} = require("../utils/errors");

class Carrito{
     constructor(filename){
        this.filename = filename;
        const data = readData(this.filename).sort((a,b) => a - b);
        this.idCount = data[data.length - 1]?.id + 1 || 1;
    }

    listarProductosIdCarrito(id){
        const data = readData(this.filename);
        const search = data.find(el => el.id === +id);
        if(!search) throw new NotFoundError("El id solicitado no se encuentra");
        return search.productos;
    }

    agregarCarrito(cart){
        cart = {id: this.idCount++, ...cart}

        const data = readData(this.filename);
        data.push(cart);
        saveData(data, this.filename);

        return cart.id
    }

    AgregarProductoIdCarrito(id, properties){
        const data = readData(this.filename);
        const productToUpdate = data.findIndex(el => el.id === +id);
        console.log(productToUpdate)
        
        if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        data[productToUpdate].productos.push(properties)

        saveData(data, this.filename);
        return properties
    }

    eliminarIdProductoIdCarrito(idCarrito, idProducto){
        const data = readData(this.filename);

        const cartToFilter = data.findIndex(el => el.id === +idCarrito);
        
        if(cartToFilter === -1) throw new NotFoundError("El id de carrito solicitado no se encuentra")

        const dataFiltered = data[cartToFilter].productos.filter(el => el.id !== +idProducto);

        if(data[cartToFilter].productos.length === dataFiltered.length) throw new NotFoundError("El id de producto solicitado no se encuentra");

        data[cartToFilter].productos = dataFiltered

        saveData(data, this.filename);
    }

    eliminarCarrito(id){
        const data = readData(this.filename);
        const dataFiltered = data.filter(el => el.id !== +id);

        if(data.length === dataFiltered.length) throw new NotFoundError("El id solicitado no se encuentra");

        saveData(dataFiltered, this.filename);
    }
}

module.exports = Carrito