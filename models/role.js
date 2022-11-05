module.exports=(sequelize,DataTypes)=>{
    const role = sequelize.define('roles',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_id:{
            type: DataTypes.UUID
        }
    },{
        timestamps: true,
        paranoid: true
    })

    return role;
}