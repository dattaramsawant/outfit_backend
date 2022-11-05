const { body } = require('express-validator');
const { roles } = require('../models');
const { Op } = require("sequelize");


const roleValidator=()=>{
    return[
        body('role')
            .trim()
            .not()
            .isEmpty()
            .withMessage("Role is required.")
            .custom(value =>{
                return roles.findOne({
                    where:{
                        role: value
                    }
                })
                .then(res=>{
                    if(res){
                        return Promise.reject('Role already exists.')
                    }
                })
            })
    ]
}

module.exports={
    roleValidator
}