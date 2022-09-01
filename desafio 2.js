const fs = require("fs")

class Contenedor{
    constructor(nombreArchivo){
        this.ruta = nombreArchivo
    }

    async save(producto){
        try {
            const contenido = await this.getAll()
            let id
            if(!producto.id || contenido.some(el => el.id === id)){
                switch(contenido.length){
                    case 0:
                        id = 1
                        break;
                    case 1:
                        id = 2
                        break;
                    default:
                        id = [...contenido].sort((a,b) => b.id - a.id)[0].id + 1
                }
            }
            producto.id = id
            contenido.push(producto)
            fs.promises.writeFile(`${this.ruta}`, JSON.stringify(contenido), "utf-8")
        } catch (error) {
            console.log("💥 Hubo un error leer el archivo: " + error)
        }
    }

    async getById(id){
        try {
            return (await this.getAll()).filter(el => el.id === id)
        } catch (error) {
            console.log("💥 Hubo un error leer el archivo: " + error)
        }
    }

    async getAll(){
        try {
            console.log("leyendo archivo...")
            const contenido = await fs.promises.readFile(`./${this.ruta}`, "utf-8")
            console.log(contenido)
            return JSON.parse(contenido)
        } catch (error) {
            console.log("💥 No se pudo leer el archivo: " + error)
        }
    }

    async deleteById(id){
        try {
            await fs.promises.writeFile(`./${this.ruta}`, JSON.stringify((await this.getAll()).filter(el => el.id !== id)))
        } catch (error) {
            console.log("💥 Hubo un error al sobrescribir el archivo: " + error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`./${this.ruta}`, "[]")
        } catch (error) {
            console.log("💥 Hubo un error al sobrescribir el archivo: " + error)
        }
    }
}

const objeto = new Contenedor("productos.txt");
const prueba = async () => {
    let contador = 0;
    while(contador < 50){
        await objeto.save({name: "prueba"})
        contador++
    }
    console.log(await objeto.getById(2))
    console.log(await objeto.getAll())
}
prueba()