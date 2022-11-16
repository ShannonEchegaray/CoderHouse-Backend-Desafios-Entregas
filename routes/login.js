import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    if(!req.session.username)
        return res.redirect("/login");
    let {username} = req.session;
    const data = {username};
    res.render("index", data);
});

router.get("/login", (req, res) => {
    if(req.session.username)
        return res.redirect("/");
    res.render("login");
})

router.post("/login", (req, res) => {
    const {username} = req.body;
    req.session.username = username;
    res.redirect("/");
});

router.get("/logout", (req, res) => {
    const {username} = req.session;
    console.log(username);
    req.session.destroy((error) => {
        console.log("Estoy dentro del callback")
        console.log(username);
        if(!error && username){
            let data = {username};
            res.render("logout", data);
        } else {
            let message = error?.message || "El usuario no esta definido, volver al home";
            let data = {message};
            res.render("error", data);
        }
    })
});

export default router;