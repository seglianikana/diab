
module.exports = (err, req, res, next) => {
    if (err) console.error(`Caught error inside middlewares:\n ${err}`)
    if (err.message === "Not Permitted") err.statusCode = 401
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
}

