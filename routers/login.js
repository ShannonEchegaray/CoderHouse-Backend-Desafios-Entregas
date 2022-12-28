import { Router } from "express"
import passport from "passport";
import { getLogin, getRegister, logout, unauthorized } from "../controller/userControl";

const router = Router();
router.get("/register", getRegister)
router.post("/register", passport.authenticate("register", {failureRedirect: "/error", failureMessage: true}))
router.get("/login", getLogin)
router.post("/login", passport.authenticate("login", {failureRedirect: "/error", failureMessage: true}))
router.get("/unauthorized", unauthorized)
router.get("/logout", logout)