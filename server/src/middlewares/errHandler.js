export const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found!`)
    res.status(404)
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        err: 1,
        mes: err?.message
    })
}