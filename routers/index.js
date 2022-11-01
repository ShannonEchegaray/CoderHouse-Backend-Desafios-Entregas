import {Router} from "express";
import routerProductos from "./products/products.js";
import routerCarrito from "./cart/cart.js";

const router = Router();

router.use("/productos", routerProductos);
router.use("/carrito", routerCarrito);

export default router
