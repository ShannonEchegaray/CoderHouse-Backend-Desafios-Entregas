const e = require("express");
const {Server} = require("socket.io");
const LProductos = require("./db/productos");
const LMensajes = require("./db/mensajes");

let io;

const initServer = (httpServer) => {
    io = new Server(httpServer);
    setEvents(io)
}

const setEvents = (io) => {
        io.on("connection", (socketClient) => {
            console.log("Se ha conectado un nuevo cliente, id: " + socketClient.id);

            if (LProductos.obtenerProductos().length !== 0){
                emit("product-history", LProductos.obtenerProductos())
            }
    
            LMensajes.obtenerMensajes().then(async mensajes => {
                if(mensajes.length !== 0){
                    emit("message-history", mensajes)
                } 
            }) 
    
            socketClient.on("disconnection", () => {
                console.log("Se ha desconectado el cliente con la id " + socketClient.id);
            })
    
            socketClient.on("product", (data) => {
                LProductos.agregarProducto(data)
                emit("product", data)
            })
    
            socketClient.on("message", async (data) => {
                LMensajes.agregarMensaje(data)
                emit("message", data)
            })
        }) 
    
} 

const emit = (action, data) => {
    io.emit(action, data)
}

module.exports = {
    initServer,
    emit
}