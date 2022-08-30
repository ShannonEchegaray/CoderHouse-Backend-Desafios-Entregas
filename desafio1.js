class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros || [];
        this.mascotas = mascotas || [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(string){
        this.mascotas.push(string);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    }

    getBookNames(){
        return this.libros.map(({nombre}) => nombre);
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

const usuario2 = new Usuario("Carlos", "Lopez", [{nombre: "El señor de los anillos", autor: "J. R. R. Tolkien"}], ["Rio", "Grisbie"])
console.log(`Hola mi nombre es ${usuario2.getFullName()}`);
console.log("Mascotas: " + usuario2.countMascotas());
console.log("Mis libros son: " + usuario2.getBookNames());
