import ContFirestore from "../../contenedores/contFirestore.js";
import {NotFoundError} from "../../utils/errors.js";

class Producto extends ContFirestore{
    constructor(collection){
       super(collection);
       super.read().then(data => {
           data.docs.sort((a,b) => a.id - b.id);
           this.idCount = data.docs[data.docs.length - 1]?.id + 1 || 1;
       })
   }

   async listarProductos(){
       const data = await super.read()
       const parsedData = data.docs.map(el => ({...el.data()}))
       return parsedData;
   }

   async listarProductosId(id){
       const data = await super.read()
       const search = data.docs.find(el => el.data().id === +id);
       if(!search) throw new NotFoundError("El id solicitado no se encuentra");
       return {...search.data()};
   }

   async agregarProducto(product){
       product = {id: this.idCount++, ...product}

       await super.saveItem(product);

       return product.id;
   }

   async actualizarProducto(id, properties){
       const data = await super.read();
       const productToUpdate = data.docs.findIndex(el => el.data().id === +id);
       
       if(productToUpdate === -1) throw new NotFoundError("El id solicitado no se encuentra")

        
       const document = data.docs[productToUpdate].data()

       Object.keys(properties).forEach(key => {
           document[key] = properties[key]
       })

       await super.updateItem(data.docs[productToUpdate].id, document);
       return document
   }

   async eliminarProducto(id){
       const data = await super.read();
       const productToDelete = data.docs.findIndex(el => el.data().id === +id);
       
       if(productToDelete === -1) throw new NotFoundError("El id solicitado no se encuentra")

       await super.deleteItem(data.docs[productToDelete].id);

   }
}

export default Producto;