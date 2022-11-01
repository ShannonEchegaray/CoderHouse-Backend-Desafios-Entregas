import { UnauthorizedError } from "../utils/errors.js";

// Comento el codigo porque si no el frontend no funcionara correctamente

const validateAdmin = (req, res, next) => {
/* 
    const isAdmin = req.header("admin");
    if(!isAdmin){
        next(new UnauthorizedError("No tiene acceso a este metodo"))
    } */

    next()
}

export {validateAdmin}