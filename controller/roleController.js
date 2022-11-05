const DB = require('../models')

DB.roles.belongsTo(DB.users,{foreignKey:'user_id'})

const addRole=async(req,res)=>{
    const {role}=req.body

    const roleObject={
        role,
        user_id: req.id
    }
    
    await DB.roles.create(roleObject)
        .then(role=>{
            return res.status(201).json({
                status:"Success",
                message:"Role created successfully"
            })
        })
        .catch(error=>{
            console.log('error', error)
            return res.status(500).json({
                status:"Error"
            })
        })
}

const getRole=async(req,res)=>{
    await DB.roles.findAndCountAll({
        include:[{
            model: DB.users,
            attributes: ["id","firstName","lastName"]
        }]
    })
    .then(role=>{
        return res.status(200).json({...role,status:"Success"})
    })
    .catch(error=>{
        console.log('error', error)
        return res.status(400).json({status: "Error"})
    })
}

module.exports={
    addRole,
    getRole
}