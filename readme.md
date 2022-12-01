# CHILD_PROCESS

Se utilizara el objeto global process para obtener informacion, y se usaran los child_process

## Configuracion

- Para poder iniciar el proyecto se debe clonar o descargar el repositorio

```
git clone https://github.com/ShannonEchegaray/Desarollo-Backend---Shannon-Echegaray
```

- A continuacion, ya descargado ejecutar los siguiente comando desde la carpeta "Desarrollo-Backend---Shannon-Echegaray"

```
git checkout desafio-12
npm install
```

- Ya ejecutado, crear un archivo llamado ".env" y dentro escribir lo siguiente

```
NODE_ENV=local
NODE_URL="http://localhost"
MONGO_URL="mongodb+srv://backend:Passw0rd@cluster0.rdtbnd0.mongodb.net/?retryWrites=true&w=majority"
```

- Por ultimo ejecutar el comando

```
npm start
```

- Dentro del archivo "package.json" estan los scripts, en donde puedes modificar el parametro "-p", ese parametro maneja el puerto de escucha, modificar dentro del script el puerto que desea escuchar y usar npm start

*Se dejara un archivo llamado "Desafio-12.postman_collection", para las colecciones de postman*

