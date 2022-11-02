import { readData, saveData } from "../utils/manageData.js";

class ContFile {
    constructor(filename){
        this.filename = filename;
    }

    async read(){
        return readData(this.filename);
    }

    async save(data){
        saveData(data, this.filename)
    }
}

export default ContFile;