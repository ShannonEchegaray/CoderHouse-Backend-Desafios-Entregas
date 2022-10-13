const {Router} = require("express");
const { agregarCarrito, eliminarCarrito, listarCarritoId, AgregarProductoIdCarrito, eliminarIdProductoIdCarrito } = require("../../controller/controllerCarrito");

const router = Router();

router.post("/", agregarCarrito);
router.delete("/:id", eliminarCarrito);
router.get("/:id/productos", listarCarritoId);
router.post("/:id/productos", AgregarProductoIdCarrito);
router.delete("/:id/productos/:id_prod", eliminarIdProductoIdCarrito);

module.exports = router
