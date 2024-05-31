// asyncHandler is a Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
/**
 * Your asyncHandler function is a utility to handle asynchronous route handlers in Express.js. This function 
 * simplifies error handling by catching errors in asynchronous functions and passing them to the next middleware, 
 * which is usually an error handler.
 */

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }