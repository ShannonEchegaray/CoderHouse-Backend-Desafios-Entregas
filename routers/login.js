import { Router } from "express"
import passport from "passport";
import { auth, getLogin, getRegister, logout, unauthorized } from "../controller/userControl.js";

const router = Router();

router.get("/", auth ,(req, res) => {
    res.status(200).send("home")
})
router.get("/register", getRegister)
router.post("/register", passport.authenticate("register", {failureRedirect: "/api/unauthorized", failureMessage: true}), 
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