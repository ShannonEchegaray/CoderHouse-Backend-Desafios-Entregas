(() => {
    // Productos
    const productNameInput = document.getElementById("nombreProducto");
    const productPriceInput = document.getElementById("precioProducto");
    const productUrlInput = document.getElementById("urlProducto");
    const productForm = document.getElementById("enviarProducto");
    const tableBody = document.getElementById("products")

    // Mensajes
    const messageForm = document.getElementById("enviarMensaje")
    const emailInput = document.getElementById("emailInput");
    const messageInput = document.getElementById("messageInput");
    const messageOutput = document.getElementById("messageOutput")
    const socket = io()

    productForm.onsubmit = (e) => {
        e.preventDefault();
        socket.emit("product", {name: productNameInput.value,
                                price: productPriceInput.value,
                                url: productUrlInput.value })
    }

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        socket.emit("message", {email: emailInput.value,
                                message: messageInput.value,
                                time: new Date().toISOString()})
    })
    
    socket.on("connect", () => {
        console.log("conectados al servidor")
    })

    socket.on("product", (data) => {
        fetch("/js/templates/productoLayout.hbs")
            .then(template => template.text())
            .then(text => {
                const tr = document.createElement("tr");
                tr.innerHTML = Handlebars.compile(text)(data)
                tableBody.appendChild(tr)
            })
    })

    socket.on("product-history", (products) => {
        fetch("/js/templates/productoLayout.hbs")
            .then(template => template.text())
            .then(text => {
                const template = Handlebars.compile(text)
                products.forEach(el => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = template(el)
                    tableBody.appendChild(tr)
                })      
            })
    })

    socket.on("message", (data) => {
        fetch("/js/templates/messageLayout.hbs")
            .then(template => template.text())
            .then(text => {
                const li = document.createElement("li");
                li.innerHTML = Handlebars.compile(text)(data)
                messageOutput.appendChild(li)
            })
    })

    socket.on("message-history", (messages) => {
        fetch("/js/templates/messageLayout.hbs")
            .then(template => template.text())
            .then(text => {
                const template = Handlebars.compile(text)
                messages.forEach(el => {
                    const li = document.createElement("li");
                    li.classList.add("no-dots")
                    li.innerHTML = template(el)
                    messageOutput.appendChild(li)
                })      
            })
    })
})()