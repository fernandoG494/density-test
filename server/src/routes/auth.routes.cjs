const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();

// login user
router.post('/', async(request, response) => {
    console.log('POST /auth/');
    const userData = request.body;

    try{
        const user = await users.loginWithEmailPassword(userData.email, userData.password);

        if(user.ok){
            response.status(200);
            response.json({
                status: 200,
                user: user.userFound
            });
        }else{
            response.status(404);
            response.json({
                status: 404,
                message: 'User dont\'t found'
            });
        }
    }catch(error){
        response.status(error.status || 500);
        response.json({
            error: error.status,
            message: error.message
        });
    }
});

module.exports = router;
