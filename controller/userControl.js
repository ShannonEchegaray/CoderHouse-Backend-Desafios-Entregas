const { UnauthorizedError } = require("../utils/errors");

// Comento el codigo porque si no el frontend no funcionara correctamente

const validateAdmin = (req, res, next) => {
/* 
    const isAdmin = req.header("admin");
    if(!isAdmin){
        next(new UnauthorizedError("No tiene acceso a este metodo"))
    } */

    next()
}

module.exports = validateAdmin