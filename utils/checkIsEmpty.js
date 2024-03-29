const { isEmpty } = require('validator')

const checkIsEmpty = (req, res, next) => {
    let body = req.body
    const errObj = {}

    for (let key in body) {
        if (isEmpty(body[key])) {
            errObj[key] = `${key} cannot be empty`
        }
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({ success: false, message: "error", error: errObj })
    } else {
        next()
    }

}

module.exports = {
    checkIsEmpty
}