import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

class ContFirestore {
    constructor(collection){
        this.collection = collection;
    }

    async read(){
        try {
            return await getDocs(collection(db, this.collection));  
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async saveItem(item){
        try {
            const result = await addDoc(collection(db, this.collection), item);
            return result.id
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updateItem(id, item){
        try {
            const docRef = doc(db, this.collection, id);
            await updateDoc(docRef, item)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async deleteItem(id){
        try {
            const docRef = doc(db, this.collection, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default ContFirestore;