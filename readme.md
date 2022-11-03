# Proyecto API Restful

![Imagen de express.js](https://i.imgur.com/ksVYRtt.png)

Este es un proyecto en donde se va a hacer una API Restful interactiva para probar los metodos **GET, POST, PUT, DELETE**

## Configuracion

- Para poder iniciar el proyecto se debe clonar o descargar el repositorio

```
git clone https://github.com/ShannonEchegaray/Desarollo-Backend---Shannon-Echegaray
```

- A continuacion, ya descargado ejecutar los siguiente comando desde la carpeta "Desarrollo-Backend---Shannon-Echegaray"

```
git checkout entrega-1
npm install
```

- Ya ejecutado, crear un archivo llamado ".env" y dentro escribir lo siguiente

```
PORT=8080
NODE_ENV=local
NODE_BASE= //Tipo de persistencia de datos que quieras utilizar: "memory|file|mongodb|firestore"

//Estos datos son los datos de configuracion para conectarse a mongodb
MONGO_URL=mongodb://localhost:27017/ecommerce

//Estos datos son los datos de configuracion para conectarse a firebase
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
```

- Por ultimo ejecutar el comando

```
npm start
```

En el caso de usar el mongodb, usar la base que deje ya con sus colections

*Se dejara en el repositorio un export de los metodos utilizados para poder hacer llamadas a la API, El archivo es "Collection Desafio 4.postman-collection.json"*
