const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();

// create user
router.post('/', async(request, response) => {
    console.log('POST /users/');
    const userData = request.body;

    try{
        const userExist = await users.getUserExist(userData.email);

        if(!userExist.ok){
            const newUser = await users.createUser(userData);
            response.status(201).json({
                status: 201,
                message: 'User created successfully',
                data: newUser
            });
        }else{
            response.status(400).json({
                status: 400,
                message: 'User already exist'
            });
        };
    }catch(error){
        response.status(error.status || 500);
        response.json({
            error: error.status,
            message: error.message
        });
    };
});

module.exports = router;