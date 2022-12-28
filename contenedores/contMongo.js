import mongoose from "mongoose";

class ContMongoDB {
    constructor(collection){
        this.collection = collection;
        const URI = process.env.MONGO_URL;
        mongoose.connect(URI).then(() => console.log("Conectado a la base de datos"))
    }

    async read(query = {}){
        try {
            const result = await this.collection.find(query, {__v: 0});
            return Object.keys(query).length ? result[0] : result; 
        } catch (error) {
            throw error
        }
    }

    async saveItem(item){
        try {
            const result = await (await this.collection(item)).save();
            return result._id
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updateItem(id, item){
        try {
            await this.collection.updateOne({_id: id}, {$set: item})
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async deleteItem(id){
        try {
            await this.collection.deleteOne({_id: id})
        } catch (error) {
            throw error
        }
    }
}

export default ContMongoDB;