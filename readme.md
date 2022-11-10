# WEBSOCKETS Y BASES DE DATOS

Este es un proyecto en donde se va a utilizar websockets, en este caso **socket.io** Y se le va a agregar bases de datos


## Configuracion

- Para poder iniciar el proyecto se debe clonar o descargar el repositorio

```
git clone https://github.com/ShannonEchegaray/Desarollo-Backend---Shannon-Echegaray
```

- A continuacion, ya descargado ejecutar los siguiente comando desde la carpeta "Desarrollo-Backend---Shannon-Echegaray"

```
git checkout desafio-9
npm install
```

- Ya ejecutado, crear un archivo llamado ".env" y dentro escribir lo siguiente

```
PORT=8080
NODE_ENV=local
NODE_URL="http://localhost:8080/"
NODE_USER=*Usuario de la base de datos* //En este caso no es necesario
NODE_PASS=*Contraseña del usuario de la base de datos* //En este caso no es necesario
NODE_DB=*Nombre de la base de datos* //Ecommerce en este caso
```
- Ejecutar en una terminal aparte

```
mongod --dbpath ./mongodb // Utilizar la carpeta que dejo en el repositorio
```

- Por ultimo ejecutar el comando

```
npm start
```

*No se dejara Collection de Postman ya que no se utiliza en todo el desafio*
