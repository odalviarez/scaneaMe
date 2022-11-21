const errorHandler = (err, req, res, next) => {
    const statusCode = res.stattusCode ? res.statusCode : 500;

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.Node_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}