class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = []
        this.mascotas = []
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(string){
        this.mascotas.push(string)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor})
    }

    getBookNames(){
        return this.libros.map(({nombre}) => nombre)
    }
}

const usuario1 = new Usuario("Rodrigo", "Perez")
console.log(`Hola mi nombre es ${usuario1.getFullName()}`);
console.log("Mascotas: " + usuario1.countMascotas());
usuario1.addMascota("Rocky");
console.log("Mascotas: " + usuario1.countMascotas());
console.log("Mis libros son: " + usuario1.getBookNames());
usuario1.addBook("El señor de los anillos", "J. R. R. Tolkien");
usuario1.addBook("Legend", "Marie Lu");
console.log("Mis libros son: " + usuario1.getBookNames());