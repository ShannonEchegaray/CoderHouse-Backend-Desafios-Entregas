const {Router} = require("express");
const validateAdmin = require("../../controller/userControl")
const { listarProductos, listarProductosId, agregarProducto, actualizarProducto, eliminarProducto } = require("../../controller/controllerProductos");

const router = Router();

router.get("/", listarProductos);
router.get("/:id", listarProductosId);
router.post("/",validateAdmin, agregarProducto);
router.put("/:id",validateAdmin, actualizarProducto);
router.delete("/:id",validateAdmin, eliminarProducto);

module.exports = router
