import {Router} from "express";
import {router as routerLogin} from "login.js";
import {router as routerProducts} from "products.js";

const router = Router();

router.use("/", routerLogin);
router.use("/api", routerProducts);

export default router;