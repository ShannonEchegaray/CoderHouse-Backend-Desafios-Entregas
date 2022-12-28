import {Router} from "express";
import routerProductos from "./products/products.js";
import routerCarrito from "./cart/cart.js";
import routerLogin from "./login.js";

const router = Router();

router.use("/productos", routerProductos);
router.use("/carrito", routerCarrito);
router.use("/", routerLogin);

export default router
