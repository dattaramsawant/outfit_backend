const DB = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { validateUserID, validateUUID } = require('../utility/utility');

DB.users.hasMany(DB.roles,{foreignKey:'user_id',as:"createdRoles"})
DB.users.belongsTo(DB.roles,{foreignKey:'role',as:'userRole'})

const getAllUser=async(req,res)=>{
    await DB.users.findAndCountAll({
        attributes:{
            exclude: ['password','deletedAt','role']
        },
        include:[{
            model: DB.roles,
            as:'userRole',
            attributes: ["id","role"]
        },
        // {
        //     model: DB.roles,
        //     as:'createdRoles',
        //     attributes: ["id","role"]
        // }
        ]
    })
    .then(user=>{
        return res.status(200).json({...user,status:"Success"})
    })
    .catch(error=>{
        console.log('error', error)
        return res.status(400).json({status: "Error"})
    })
}

const createUser=async(req,res)=>{
    const {password,username,firstName,lastName,gender,email,mobileNumber,role} = req.body
    const hashPassword = await bcrypt.hash(password,10)
    if(!validateUUID(role)){
        return res.status(400).json({status:"Error",message:"Role is not valid."})
    }
    const checkRole = await DB.roles.findOne({
        where:{
            id: role
        }
    })
    if(!checkRole) {
        return res.status(400).json({status:"Error",message:"Role is not valid."})
    }
    const userObject={
        username,
        firstName,
        lastName,
        gender,
        email,
        mobileNumber,
        role,
        password: hashPassword
    }
    await DB.users.create(userObject)
        .then(user=>{
            return res.status(201).json({status:'Success',message:'User created successfully.'})
        })
        .catch(error=>{
            console.log('error', error)
            return res.status(400).json({status:'Error'})
        })
}

const deleteUser=async(req,res)=>{
    const {id}=req.body
    
    const {validId,inValidId} = validateUserID(id)
    await DB.users.findAll({
        where:{
            id: validId
        },
        paranoid: false,
        attributes:['id','deletedAt']
    })
    .then(async(data)=>{
        const invalidUser = []
        const validUserId = []
        data.filter(user=>{
            if(user.deletedAt){
                invalidUser.push(user.id)
            }else if(validId.includes(user.id)){
                validUserId.push(user.id)
            }
        })
        const userNotFoundId = validId.filter(id=> ![...invalidUser,...validUserId].includes(id))
        await DB.users.destroy({
            where:{
                id: validUserId
            }
        })
        .then(user=>{
            return res.status(201).json({
                status:'Success',
                message:`${validUserId.length ? "User deleted successfully." : "Invalid User"}`,
                data:{
                    deletedRecords: validUserId,
                    invalidUser: [...invalidUser,...userNotFoundId,...inValidId]
                }
            })
        })
        .catch(error=>{
            console.log('error', error)
            return res.status(400).json({status:'Error'})
        })
    })
    .catch(error=>{
        console.log('error', error)
        return res.status(400).json({status:'Error'})
    })
}

const restoreUser=async(req,res)=>{
    const {id}=req.body
    const {validId,inValidId} = validateUserID(id)
    
    await DB.users.findAll({
        where:{
            id: validId
        },
        paranoid: false,
        attributes:['id','deletedAt']
    })
    .then(async(data)=>{
        const invalidUser = []
        const validUserId = []
        data.filter(user=>{
            if(user.deletedAt){
                validUserId.push(user.id)
            }else if(validId.includes(user.id)){
                invalidUser.push(user.id)
            }
        })
        const userNotFoundId = validId.filter(id=> ![...invalidUser,...validUserId].includes(id))
        await DB.users.restore({
            where:{
                id: validUserId
            }
        })
        .then(user=>{
            return res.status(201).json({
                status:'Success',
                message:`${validUserId.length ? "User restored successfully." : "Invalid User"}`,
                data:{
                    restoredRecords: validUserId,
                    invalidUser: [...invalidUser,...userNotFoundId,...inValidId]
                }
            })
        })
        .catch(error=>{
            console.log('error', error)
            return res.status(400).json({status:'Error'})
        })
    })
    .catch(error=>{
        console.log('error', error)
        return res.status(400).json({status:'Error'})
    })
}

module.exports = {
    getAllUser,
    createUser,
    deleteUser,
    restoreUser
}