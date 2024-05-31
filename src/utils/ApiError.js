//nodejs gives us class 

class ApiError extends Error {
    /**
     * class ApiError extends Error:
This defines a new class ApiError that extends the built-in Error class in JavaScript. 
Extending Error allows ApiError to inherit all the properties and methods of the Error class.
     */

/**
 * The Error class is used to create error objects, which are instances of the Error type.
 *  These objects can be thrown using the throw statement and caught using try...catch blocks.
 */

    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export { ApiError }