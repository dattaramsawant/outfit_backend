const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(200).json({
        status: "Error",
        errors: extractedErrors,
    })
}

module.exports = validate