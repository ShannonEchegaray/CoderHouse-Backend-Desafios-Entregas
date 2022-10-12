(() => {
    const divMessage = document.getElementById("output")
    const formMessage = document.getElementById("form-message");
    const inputMessage = document.getElementById("input-message");
    const inputFullname = document.getElementById("input-fullname");


    formMessage.onsubmit = (e) => {
        e.preventDefault()
        const data = {
            message: inputMessage.value,
            fullname: inputFullname.value
        };
        socket.emit("new-message", data)
        inputMessage.value = "";
    }

    const socket = io();
    socket.on("connect", () => {
        console.log("Conectados al servidor");
    })

    socket.on("notification", (messages) => {
        divMessage.innerHTML = "";
        for(let message of messages){
            const element = document.createElement("p");
            element.innerText= `${message.fullname}: ${message.message}`
            divMessage.appendChild(element)
        }
    })
})()