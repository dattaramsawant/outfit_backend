module.exports=(sequelize,DataTypes)=>{
    const user = sequelize.define('users',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING
        },
        mobileNumber:{
            type: DataTypes.INTEGER
        }
    },{
        timestamps: true,
        paranoid: true
    })

    return user;
}