const {Router} = require("express");

const router = Router();

router.get("/", listarProductos);
router.get("/:id", listarProductosId);
router.post("/", agregarProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = {
    router
}
