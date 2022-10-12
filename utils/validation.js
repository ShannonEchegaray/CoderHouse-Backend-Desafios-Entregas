const {BadRequestError} = require("./errors");

const productStructureKeys = ["nombre","descripcion","codigo","foto","precio","stock"];

const validateNumber = (number, message) => {
    if(isNaN(number) || number === "") throw new BadRequestError(message);
}

const validateParams = (params, objectToValidate) => {
    params.forEach(key => {
        if(!objectToValidate[key]) throw new BadRequestError("Un parametro no ha sido ingresado")
    });

    if(params.length !== Object.keys(objectToValidate).length) throw new BadRequestError("La cantidad de parametros es distinta")
}

module.exports = {
    validateNumber,
    validateParams,
    productStructureKeys
}