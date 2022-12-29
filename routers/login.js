import { Router } from "express"
import passport from "passport";
import { auth, getLogin, getRegister, logout, unauthorized } from "../controller/userControl.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.get("/", auth ,(req, res) => {
    res.status(200).render("index")
})
router.get("/register", getRegister)
router.post("/register", (req, res, next) => {
    console.log("Estoy en register");
    console.log(req.body);
    next();
}, upload.single("avatar"),
passport.authenticate("register",{failureRedirect: "/api/unauthorized", failureMessage: true}), 
    (req, res) => {
        res.redirect("/api/")
    })
router.get("/login", getLogin)
router.post("/login", passport.authenticate("login", {failureRedirect: "/api/unauthorized", failureMessage: true}), 
    (req, res) => {
        res.redirect("/api/")
    })
router.get("/unauthorized", unauthorized)
router.get("/logout", logout)

export default router;