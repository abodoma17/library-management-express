const {validationResult} = require("express-validator");

function validateInputs(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        errors: errors.array().map(error => {
            return {
                message: error['msg'],
                property: error['path']
            }
        })
    });
}

module.exports = validateInputs;

