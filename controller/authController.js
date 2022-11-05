const DB = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login =async(req,res)=>{
    const {username,password}=req.body;

    const validUser = await DB.users.findOne({where:{username: username}})

    if(!validUser){
        return res.status(401).json({
            status:"Error",
            message: " Unauthorized"
        })
    }

    const matchPassword = await bcrypt.compare(password,validUser.password)

    if(!matchPassword){
        return res.status(401).json({
            status:"Error",
            message: " Unauthorized"
        })
    }

    const accessToken = jwt.sign(
        {"UserInfo":{"username": validUser.username, "id": validUser.id}},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
        { "username": validUser.username, "id": validUser.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.status(200).json({
        status:"Success",
        message:"User logged in successfully",
        accessToken,
        user:{
            firstName: validUser.firstName,
            lastName: validUser.lastName,
            mobileNumber: validUser.mobileNumber,
            email: validUser.email,
            username: validUser.username,
            id: validUser.id
        }
    })
}

const refresh=async(req,res)=>{
    const {cookies} = req

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const validUser = await DB.users.findOne({where:{username: decoded.username}})

            if (!validUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": validUser.username,
                        "id": validUser.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.status(200).json({
                status:"Success",
                message:"",
                accessToken,
                user:{
                    firstName: validUser.firstName,
                    lastName: validUser.lastName,
                    mobileNumber: validUser.mobileNumber,
                    email: validUser.email,
                    username: validUser.username,
                    id: validUser.id
                }
            })
        }
    )
}

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, secure: true })
    res.status(200).json({
        status:"Success",
        message:"User logged out"
    })
}

module.exports={
    login,
    refresh,
    logout
}