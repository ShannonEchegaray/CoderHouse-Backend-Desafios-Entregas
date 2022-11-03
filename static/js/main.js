(() => {
    let admin = false;
    const checkButton = document.querySelector("#switchAdmin");
    const containerProductos = document.querySelector("#containerProductos");
    const containerCarrito = document.querySelector("#containerCarrito");
    const formProducts = document.querySelector("#form");
    
    checkButton.checked = admin;
    checkButton.onchange = (e) => {
        admin = e.target.checked
        renderProductos();
        renderCarrito();
    }

    const renderProductos = async () => {
        const data = (await (await fetch("http://localhost:8080/api/productos/")).json())

        containerProductos.innerHTML = "";
        data.forEach(element => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.classList.add("text-black");
            div.classList.add("m-4");
            div.classList.add("width18");

            div.innerHTML += `
            <img src="${element.foto}" class="card-img-top object-fit" alt="${element.nombre}">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">${element.codigo}</p>
                    <p class="card-text">${element.descripcion}</p>
                <a href="#" id="comprar${element.id}" class="m-1 btn btn-primary">Comprar</a>
                ${admin ? `<a href="#" id="modificar${element.id}" class="m-1 btn btn-primary">Modificar</a>` : ""}
                ${admin ? `<a href="#" id="eliminar${element.id}" class="m-1 btn btn-primary">Eliminar</a>` : ""}
            </div>
            `


            containerProductos.appendChild(div)

            div.querySelector("#comprar" + element.id).onclick = () => {
                fetch("http://localhost:8080/api/carrito/1/productos",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            id: element.id,
                            timestamp: element.timestamp,
                            nombre: element.nombre,
                            descripcion: element.descripcion,
                            codigo: element.codigo,
                            foto: element.foto,
                            precio: element.precio,
                            stock: element.stock
                        }),
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                .then(data => {
                    console.log(data.status)
                    if(data.status !== 200){
                        return fetch("http://localhost:8080/api/carrito",
                        {method: "POST"}).then(fetch("http://localhost:8080/api/carrito/1/productos",
                        {
                            method: "POST",
                            body: JSON.stringify({
                            id: element.id,
                            timestamp: element.timestamp,
                            nombre: element.nombre,
                            descripcion: element.descripcion,
                            codigo: element.codigo,
                            foto: element.foto,
                            precio: element.precio,
                            stock: element.stock
                            }),
                            headers: {"Content-type": "application/json; charset=UTF-8"}
                        }))
                    }
                    renderCarrito()
                })
            }

            if(admin){
                div.querySelector("#modificar" + element.id).onclick = (e) => {
                    div.innerHTML = `
                    <img src="${element.foto}" class="card-img-top object-fit" alt="${element.nombre}">
                    <div class="card-body d-flex flex-column align-items-center">
                        <input placeholder="Nombre..." id="modificarform-nombre${element.id}" value="${element.nombre}" class="card-title">
                            <input placeholder="Codigo..." id="modificarform-codigo${element.id}" value="${element.codigo}" class="card-text">
                            <input placeholder="Descripcion..." id="modificarform-descripcion${element.id}" value="${element.descripcion}" class="card-text">
                        <a href="#" id="modificarform${element.id}" class="m-1 btn btn-primary">Enviar</a>
                    </div>
                    `

                    div.querySelector(`#modificarform${element.id}`).onclick = () => {
                        const nombre = div.querySelector(`#modificarform-nombre${element.id}`).value;
                        const descripcion = div.querySelector(`#modificarform-descripcion${element.id}`).value;
                        const codigo = div.querySelector(`#modificarform-codigo${element.id}`).value;

                        fetch(`http://localhost:8080/api/productos/${element.id}`,
                        {
                            method: "PUT",
                            body: JSON.stringify({
                                id: element.id,
                                nombre,
                                descripcion,
                                codigo,
                                foto: element.foto,
                                precio: element.precio,
                                stock: element.stock
                            }),
                            headers: {"Content-type": "application/json; charset=UTF-8"} 
                        })
                        .then(renderProductos())
                    }
                }
    
                div.querySelector("#eliminar" + element.id).onclick = (e) => {
                    fetch(`http://localhost:8080/api/productos/${element.id}`,
                        {
                            method: "DELETE"
                        })
                        .then(renderProductos())
                }
            }
            
        });
    }

    const renderCarrito = async () => {
        const data = (await (await fetch("http://localhost:8080/api/carrito/1/productos")).json());

        containerCarrito.innerHTML = "";
        data.forEach(element => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.classList.add("text-black");
            div.classList.add("m-4");
            div.classList.add("width18");

            div.innerHTML += `
            <img src="${element.foto}" class="card-img-top object-fit" alt="${element.nombre}">
            <div class="card-body d-flex flex-column align-items-center">
                <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">${element.codigo}</p>
                    <p class="card-text">${element.descripcion}</p>
                ${admin ? `<a href="#eliminarcarrito${element.id}" id="eliminarcarrito${element.id}" class="m-1 btn btn-primary">Eliminar</a>` : ""}
            </div>
            `

            containerCarrito.appendChild(div);

            if(admin){
                div.querySelector("#eliminarcarrito" + element.id).onclick = (e) => {
                    fetch(`http://localhost:8080/api/carrito/1/productos/${element.id}`,
                    {
                        method: "DELETE"
                    }).then(renderCarrito())
                }
            }
            
        })
    }

    formProducts.onsubmit = (e) => {
        e.preventDefault();
        const nombre = formProducts.querySelector("#form_nombre").value;
        const descripcion = formProducts.querySelector("#form_descripcion").value;
        const codigo = formProducts.querySelector("#form_codigo").value;
        const foto = formProducts.querySelector("#form_foto").value;
        const precio = formProducts.querySelector("#form_precio").value;
        const stock = formProducts.querySelector("#form_stock").value;

        fetch("http://localhost:8080/api/productos", {
            method: "POST",
            body: JSON.stringify({
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(data => data.json())
          .then(renderProductos())
    }

    renderProductos();
    renderCarrito();
})()