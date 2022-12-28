import { UnauthorizedError } from "../utils/errors.js";

const auth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect("/login")
    }
}

const unauthorized = (req, res) => {
    res.status(403).send("Unauthorized")
}

const getRegister= (req, res) => {
    if(req.isAuthenticated())
        return res.redirect("/");
    res.render("register");
}

const getLogin = (req, res) => {
    if(req.isAuthenticated())
        return res.redirect("/");
    res.render("login");
}

const logout = (req, res, next) => {
    const {user} = req;
    req.logout((error) => {
        if(error)
            return next(error);
        let data = {username: user.email};
        res.render("logout", data);

    })
};

export {
    auth,
    getRegister,
    getLogin,
    logout,
    unauthorized
}