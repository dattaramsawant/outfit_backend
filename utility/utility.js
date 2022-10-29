
const UUID=require('uuid')

const validateUUID = (id) =>{
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

module.exports={
    validateUUID
}