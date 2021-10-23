const { response } = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const { generateJWT } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.google_CLIENT_ID);

const loginUser = async (req, res=response) => {
    let body= req.body;
     

    if (!body.email || !body.password) {
        return res.status(400).json({
            message: "Email or (password) aren't correct",
            email: body.email,
            password: body.password
        })
    }
    try {
        const userDb = await UserModel.findOne({where: { email: body.email }});
        let token = await generateJWT({user:userDb});
        if(!bcrypt.compareSync(body.password, userDb.password)){
            return res.status(400).json({
                error: err,
                message: "Email or (password) aren't not correct"
            })
        }else{
            return res.json({
                ok: true,
                user: userDb,
                token
            })
        }

    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "Email or (password) aren't not correct"
        })
    }
};

//google config
const verify = async(token)=>{
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.google_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        return {
            email: payload.email
        }

    } catch (error) {
        console.log(error);
    }
}  

const loginGoogle = async (req, res =response)=>{
    let token = req.body.googleToken;
    let {email} =await verify(token);
    
    try {
        const userDb = await UserModel.findOne({where: { email:email }});
        if(!userDb){
            return res.status(400).json({
                error: err,
                message: "The user is not rigistered yet"
            });
        }
        
        const tokenJWT = await generateJWT({user:userDb});
        return res.json({
            ok:true,
            user: userDb,
            token: tokenJWT
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: err,
            message: "The user is not rigistered yet"||"An error occurred while authenticating the user"
        })
    }

} 

const revalidateToken = async (req, res = response)=>{
    const {user} = req;

    const token = await generateJWT({user});
    
    res.json({
        ok:true,
        user: user,
        token
    })
}
module.exports = {
    loginUser,
    revalidateToken,
    loginGoogle
}