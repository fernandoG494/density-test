const jwt = require('../lib/jwt.lib.cjs');
const UserModel = require('../models/user.model.cjs');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { json } = require('express');

// create user
async function createUser(userData){
    const { displayName, email, password } = userData;
    
    if(!displayName || !email || !password){
        throw new createError('400', 'Missing required fields');
    };

    const hash = await bcrypt.hash(password, 15);
    const date = new Date();

    userData.createdAt = date;
    userData.updatedAt = date;

    const newUser = new UserModel({
        'email': email,
        'password': hash,
        'displayName': displayName,
        'createdAt': userData.createdAt,
        'updatedAt': userData.updatedAt,
        'isAdmin': 'false',
    });

    return UserModel.create(newUser);
};

// user exist
async function getUserExist(email) {
    const userFound = await UserModel.findOne({email});

    if(!userFound){
        return {ok: false};
    }
    return {ok: true, userFound};
};

// login with email and password
async function loginWithEmailPassword(email, password){
    const userFound = await UserModel.findOne({email});

    if(!userFound){
        return {ok: false};
    }

    const isValidPassword = await bcrypt.compare(password, userFound.password);

    if(!isValidPassword){
        return {ok: false}
    }

    return {ok: true, userFound};
};

module.exports = {
    createUser,
    getUserExist,
    loginWithEmailPassword
};
