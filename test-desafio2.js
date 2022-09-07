const Contenedor = require("./desafio\ 2.js")

const objeto = new Contenedor("productos.txt");
const prueba = async () => {

    await objeto.save({name: "prueba1", thumbnail: "https://prueba.test/"})
    await objeto.save({name: "prueba2", thumbnail: "https://prueba.test/"})
    await objeto.save({name: "prueba3", thumbnail: "https://prueba.test/"})

    console.log(await objeto.getById(2))
    console.log(await objeto.getAll())
    
    await objeto.deleteById((await objeto.getAll()).length - 1)

    console.log(await objeto.getAll())
}
prueba()