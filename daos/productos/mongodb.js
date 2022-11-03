import ContMongoDB from "../../contenedores/contMongo.js"
import {NotFoundError} from "../../utils/errors.js";

class Producto extends ContMongoDB{
     constructor(schema){
        super(schema);
        super.read().then(data => {
            data.sort((a,b) => a - b);
            this.idCount = data[data.length - 1]?.id + 1 || 1;
        })
    }

    async listarProductos(){
        const data = await super.read()
        return data;
    }

    async listarProductosId(id){
        const data = await super.read()
        const search = data.find(el => el.id === +id);
        if(!search) throw new NotFoundError("El id solicitado no se encuentra");
        return search;
    }

    async agregarProducto(product){
        product = {id: this.idCount++, ...product}

        await super.saveItem(product);

        return product.id;
    }

    async actualizarProducto(id, properties){
        const data = await super.read();
        const productToUpdate = data.findIndex(el => el.id === +id);
        
        if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        Object.keys(properties).forEach(key => {
            data[productToUpdate][key] = properties[key]
        })

        await super.updateItem(data[productToUpdate]._id, data[productToUpdate]);
        return data[productToUpdate]
    }

    async eliminarProducto(id){
        const data = await super.read(this.filename);
        const productToDelete = data.findIndex(el => el.id === +id);
        
        if(productToDelete === -1) throw new NotFoundError("El id solicitado no se encuentra")

        await super.deleteItem(data[productToDelete]._id);

    }
}

export default Producto;