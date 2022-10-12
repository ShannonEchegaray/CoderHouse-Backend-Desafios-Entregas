class BaseError extends Error{
    constructor(message){
        super(message)
    }
}

class NotFoundError extends BaseError{
    constructor(message){
        super(message)
        this.httpStatusCode = 404
    }
}

class BadRequestError extends BaseError {
    constructor(message) {
      super(message)
      this.httpStatusCode = 400
    }
}

class UnauthorizedError extends BaseError {
constructor(message) {
    super(message)
    this.httpStatusCode = 401
    }
}

class InternalServerError extends BaseError {
constructor(message) {
    super(message)
    this.httpStatusCode = 500
    }
}

const errorHandler = (err, req, res, next) => {
    let error = err
    if (!err instanceof BaseError) {
        error = new InternalServerError('Ha ocurrido un error desconocido')
    }
    res.status(404).json({error: error.httpStatusCode, message: error.message})
}

module.exports = {
    errorHandler,
    NotFoundError,
    UnauthorizedError,
    BadRequestError
}