import {Router} from "express";
import { agregarCarrito, eliminarCarrito, listarCarritoId, AgregarProductoIdCarrito, eliminarIdProductoIdCarrito } from "../../controller/controllerCarrito.js";

const router = Router();

router.post("/", agregarCarrito);
router.delete("/:id", eliminarCarrito);
router.get("/:id/productos", listarCarritoId);
router.post("/:id/productos", AgregarProductoIdCarrito);
router.delete("/:id/productos/:id_prod", eliminarIdProductoIdCarrito);

export default router
