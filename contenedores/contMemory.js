class ContMemory {
    constructor(){
        this.data = [];
    }

    async read(){
        return this.data;
    }

    async save(data){
        this.data = data
    }
}

export default ContMemory;