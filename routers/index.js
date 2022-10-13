const {Router} = require("express");
const routerProductos = require("./products/products");
const routerCarrito = require("./cart/cart");

const router = Router();

router.use("/productos", routerProductos);
router.use("/carrito", routerCarrito);

module.exports = router
