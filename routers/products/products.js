import {Router} from "express";
import {validateAdmin} from "../../controller/userControl.js";
import { listarProductos, listarProductosId, agregarProducto, actualizarProducto, eliminarProducto } from "../../controller/controllerProductos.js";

const router = Router();

router.get("/", listarProductos);
router.get("/:id", listarProductosId);
router.post("/",validateAdmin, agregarProducto);
router.put("/:id",validateAdmin, actualizarProducto);
router.delete("/:id",validateAdmin, eliminarProducto);

export default router
