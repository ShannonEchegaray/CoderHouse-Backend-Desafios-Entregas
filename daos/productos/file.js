import contFile from "../../contenedores/contFile.js"
import {NotFoundError} from "../../utils/errors.js";

class Producto extends contFile{
     constructor(filename){
        super(filename);
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

        const data = await super.read()
        data.push(product);
        await super.save(data)

        return product.id
    }

    async actualizarProducto(id, properties){
        const data = await super.read();
        const productToUpdate = data.findIndex(el => el.id === +id);
        
        if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        Object.keys(properties).forEach(key => {
            data[productToUpdate][key] = properties[key]
        })

        await super.save(data);
        return data[productToUpdate]
    }

    async eliminarProducto(id){
        const data = await super.read(this.filename);
        const dataFiltered = data.filter(el => el.id !== +id);

        if(data.length === dataFiltered.length) throw new NotFoundError("El id solicitado no se encuentra");

        await super.save(dataFiltered);
    }
}

export default Producto;