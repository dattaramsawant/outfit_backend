const { body } = require('express-validator');

const authValidator =()=> {
    return[
        body('username')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Username is Required.'),
            
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is Required.')
    ]
}

module.exports={
    authValidator
}