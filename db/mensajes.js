const fs = require("fs")

class ListaMensajes {
    static async obtenerMensajes() {
        try {
            const data = await fs.promises.readFile("./db/data.json");
            return JSON.parse(data)
        } catch (error) {
            console.log("Ha ocurrido un error: \n" + error)
        }    
    }

    static async agregarMensaje(message) {
        try {
            const data = await ListaMensajes.obtenerMensajes();
            data.push(message);
            await fs.promises.writeFile("./db/data.json", JSON.stringify(data, null, 2))
        } catch (error) {
            console.log("Ha ocurrido un error: \n" + error)
        }
    }
}

module.exports = ListaMensajes;
