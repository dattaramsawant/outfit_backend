
const UUID=require('uuid')

const validateUserID = (id) =>{
    const validId=[]
    const inValidId =[]

    id?.map(data=>{
        if(UUID.validate(data)){
            validId.push(data)
        }else{
            inValidId.push(data)
        }
    })

    return {validId,inValidId}
}

const validateUUID = (id) =>{
    return UUID.validate(id)
}

module.exports={
    validateUserID,
    validateUUID
}