import {readData, saveData} from "../utils/manageData.js";
import {NotFoundError} from "../utils/errors.js";

class Producto{
     constructor(filename){
        this.filename = filename;
        const data = readData(this.filename).sort((a,b) => a - b);
        this.idCount = data[data.length - 1]?.id + 1 || 1;
    }

    listarProductos(){
        const data = readData(this.filename);
        return data;
    }

    listarProductosId(id){
        const data = readData(this.filename);
        const search = data.find(el => el.id === +id);
        if(!search) throw new NotFoundError("El id solicitado no se encuentra");
        return search;
    }

    agregarProducto(product){
        product = {id: this.idCount++, ...product}

        const data = readData(this.filename);
        data.push(product);
        saveData(data, this.filename);

        return product.id
    }

    actualizarProducto(id, properties){
        const data = readData(this.filename);
        const productToUpdate = data.findIndex(el => el.id === +id);
        console.log(productToUpdate)
        
        if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        Object.keys(properties).forEach(key => {
            data[productToUpdate][key] = properties[key]
        })

        saveData(data, this.filename);
        return data[productToUpdate]
    }

    eliminarProducto(id){
        const data = readData(this.filename);
        const dataFiltered = data.filter(el => el.id !== +id);

        if(data.length === dataFiltered.length) throw new NotFoundError("El id solicitado no se encuentra");

        saveData(dataFiltered, this.filename);
    }
}

export default Producto;