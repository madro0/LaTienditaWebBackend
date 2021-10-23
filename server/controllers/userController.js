const express = require('express');
const app = express();
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { parseMessageError } = require('../helpers/errorsHelper');
const _ = require('underscore');
const createUser = async(req, res) => {
    let body = req.body;

    const user = {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    }
    try {
        let userDb =await UserModel.create(user);

        if(userDb){
            delete userDb.dataValues.password
            res.json({
                ok:true,
                user: userDb
            });
        }
        
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || err ||'Some error occurred while creating the user'
        })
    }
};

const getAllUser = async (req, res)=>{
    try {
        const usersDb = await UserModel.findAll();
        if(usersDb){
            res.json({
                ok:true,
                users: usersDb
            });
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || 'Some error occurred while creating the user'
        })
    }
}

module.exports = {
    createUser,
    getAllUser
}