const ListaProductos = require("../db/data")
const {Router} = require("express")
const router = Router()

let id = 5



router.get("/", (req, res) => {
    res.render("formProductos", {baseURL: process.env.NODE_URL})
})

router.get("/productos", (req, res) => {
    const productos = ListaProductos.obtenerProductos()
    const data = {
        productos,
        isEmpty: productos.length,
        baseURL: process.env.NODE_URL
    }
    res.render("productos", data)
})


router.post("/productos", (req, res, next) => {
    try {
        console.log({...req.body})
        const producto = ListaProductos.validarProducto({...req.body})
        ListaProductos.agregarProducto({id: id++, ...producto})

        const productos = ListaProductos.obtenerProductos()
        const data = {
            productos,
            isEmpty: productos.length,
            baseURL: process.env.NODE_URL
        }
        res.status(200).render("productos", data)
    } catch (error) {
        next(error)
    }
    
})

/*
    TODO Hacer un get del id del producto
router.get("/productos/:id", (req, res, next) => {
    try {
        const prod = ListaProductos.buscarProducto(req.params.id, "devolver")
        res.status(200).json(prod)
    } catch (error) {
        next(error)
    }
}) */

module.exports = router