const jwt = require('../lib/jwt.lib.cjs');
const UserModel = require('../models/user.model.cjs');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { json } = require('express');

// create user
async function createUser(userData){
    console.log(userData);
};

// user exist
async function getUserExist(email) {
    const userFound = await UserModel.findOne({email});

    if(!userFound){
        return false;
    }
    return true;
};

module.exports = {
    createUser,
    getUserExist
};
