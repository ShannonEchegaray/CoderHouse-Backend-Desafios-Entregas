const {Router} = require("express");

const router = Router();

router.post("/", crearCarrito);
router.delete("/:id", borrarCarrito);
router.get("/:id/productos", listarCarrito);
router.post("/:id/productos", agregarProductoCarrito);
router.delete("/:id/productos/:id_prod", eliminarProductoCarrito);

module.exports = {
    router
}
