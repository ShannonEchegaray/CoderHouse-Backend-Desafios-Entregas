const {Server} = require("socket.io");

let io;

const initServer = (httpServer) => {
    io = new Server(httpServer);
    setEvents(io)
}

const setEvents = (io) => {
    io.on("connection", (socketClient) => {
        console.log("Se ha conectado un nuevo cliente, id: " + socketClient.id);

        socketClient.on("disconnection", () => {
            console.log("Se ha desconectado el cliente con la id " + socketClient.id);
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