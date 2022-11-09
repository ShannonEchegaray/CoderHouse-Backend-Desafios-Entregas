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
    const nameInput = document.getElementById("nameInput");
    const lastnameInput = document.getElementById("lastnameInput");
    const ageInput = document.getElementById("ageInput");
    const aliasInput = document.getElementById("aliasInput");
    const avatarInput = document.getElementById("avatarInput");
    const messageOutput = document.getElementById("messageOutput")
    const socket = io()

    productForm.onsubmit = (e) => {
        e.preventDefault();
        socket.emit("product", {nombre: productNameInput.value,
                                precio: +productPriceInput.value,
                                url: productUrlInput.value })
    }

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        socket.emit("message", {
                                id: emailInput.value,
                                mensaje: messageInput.value,
                                nombre: nameInput.value,
                                apellido: lastnameInput.value,
                                edad: ageInput.value,
                                alias: aliasInput.value,
                                avatar: avatarInput.value
                               })
    })
    
    socket.on("connect", () => {
        console.log("conectados al servidor")
    })

    socket.on("product", (data) => {
        fetch("/js/templates/productoLayout.hbs")
            .then(template => template.text())
            .then(text => {
                tableBody.innerHTML = ""
                const template = Handlebars.compile(text)
                data.forEach(el => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = template(el)
                    tableBody.appendChild(tr)
                })      
            })
    })

    socket.on("product-history", (products) => {
        fetch("/js/templates/productoLayout.hbs")
            .then(template => template.text())
            .then(text => {
                console.log(products)
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
                console.log(data)
                messageOutput.innerHTML = ""
                const template = Handlebars.compile(text)
                data.forEach(el => {
                    const li = document.createElement("li");
                    li.classList.add("no-dots")
                    li.innerHTML = template(el)
                    messageOutput.appendChild(li)
                })      
            })
    })

    socket.on("message-history", (messages) => {
        fetch("/js/templates/messageLayout.hbs")
            .then(template => template.text())
            .then(text => {
                console.log(messages)
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