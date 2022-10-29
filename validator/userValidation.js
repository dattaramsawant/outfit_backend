const { body } = require('express-validator');
const { users } = require('../models');
const { Op } = require("sequelize");

const userValidator=()=>{
    return[
        body('username')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Username is Required.')
            .custom(value=>{
                return users.findOne({
                    where:{
                        username:value
                    }
                })
                .then(res=>{
                    if(res){
                        return Promise.reject('Username already exists.')
                    }
                })
            }),
        
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage("Password is required.")
            .isStrongPassword({
                minLength:8,
                minLowercase:1,
                minUppercase:1,
                minNumbers:1,
                minSymbols:1
            })
            .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    
        body('firstName')
            .trim()
            .not()
            .isEmpty()
            .withMessage("First Name is required."),

        body('lastName')
            .trim()
            .not()
            .isEmpty()
            .withMessage("Last Name is required."),
        
        body('email')
            .trim()
            .optional()
            .isEmail()
            .withMessage("Please enter valid Email")
            .custom((value)=>{
                return users.findOne({
                    where:{
                        email:value
                    }
                })
                .then(res=>{
                    if(res){
                        return Promise.reject('Email already exists.')
                    }
                })
            }),
        
        body('mobileNumber')
            .optional()
            .isNumeric()
            .isMobilePhone()
            .withMessage("Please enter valid mobileNumber")
            .custom((value)=>{
                return users.findOne({
                    where:{
                        mobileNumber:value
                    }
                })
                .then(res=>{
                    if(res){
                        return Promise.reject('Mobile Number already exists.')
                    }
                })
            })   
    ]
}

module.exports={
    userValidator
}