import {Router} from "express";
import {auth} from "../../controller/userControl.js";
import { listarProductos, listarProductosId, agregarProducto, actualizarProducto, eliminarProducto } from "../../controller/controllerProductos.js";

const router = Router();

router.get("/", listarProductos);
router.get("/:id", listarProductosId);
router.post("/",auth, agregarProducto);
router.put("/:id",auth, actualizarProducto);
router.delete("/:id",auth, eliminarProducto);

export default router
