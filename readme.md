# PM2, FOREVER AND PROXY

Se utilizara PM2, Forever y NGINX para crear un servidor multi hilos

## Configuracion

- Para poder iniciar el proyecto se debe clonar o descargar el repositorio

```
git clone https://github.com/ShannonEchegaray/Desarollo-Backend---Shannon-Echegaray
```

- A continuacion, ya descargado ejecutar los siguiente comando desde la carpeta "Desarrollo-Backend---Shannon-Echegaray"

```
git checkout desafio-13
npm install
```

- Ya ejecutado, crear un archivo llamado ".env" y dentro escribir lo siguiente

```
NODE_ENV=local
NODE_URL="http://localhost"
MONGO_URL="mongodb+srv://backend:Passw0rd@cluster0.rdtbnd0.mongodb.net/?retryWrites=true&w=majority"
```

- Ejecutar nginx con su respectiva configuracion de proxy, *Se dejó los archivos de configuracion en "/nginx/conf/nginx - consigna x.conf"*


## Consigna Proxy NODEMON

```
FORK= nodemon server.js -p 8081 -m fork
CLUSTER= nodemon server.js -p 8082 -m cluster
```

## Consigna FOREVER

```
FORK= forever -w start server.js -p 8081 -m fork
CLUSTER= forever -w start server.js -p 8082 -m cluster

LISTAR= forever list
```

## Consigna PM2

```
FORK= pm2 start ./server.js --name="i01" --watch -- -p 8081
CLUSTER=  pm2 start ./server.js --name="i02" --watch -i max -- -p 8082

LISTAR= pm2 monit
```

## Consigna Proxy N°1

```
pm2 start ./server.js --name="i01" -- -p 8081 -m cluster
pm2 start ./server.js --name="i02" -- -p 8080
```

## Consigna Proxy N°2

```
pm2 start ./server.js --name="i01"  -- -p 8080
pm2 start ./server.js --name="i02"  -- -p 8082
pm2 start ./server.js --name="i03"  -- -p 8083
pm2 start ./server.js --name="i04"  -- -p 8084
pm2 start ./server.js --name="i05"  -- -p 8085
```

- Dentro del archivo "package.json" estan los scripts, en donde puedes modificar el parametro "-p", ese parametro maneja el puerto de escucha, modificar dentro del script el puerto que desea escuchar y usar npm start


