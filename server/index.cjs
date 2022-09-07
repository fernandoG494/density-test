const server = require('./src/server.cjs');
const mongoose = require('mongoose');
require('dotenv').config();

const {
    PORT,
    DB_USER,
    DB_PASSWORD,
    DB_CLUSTER,
    DB_NAME
} = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`)
    .then(
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    ).catch(err => {
        console.log('DB connection error: ', err);
    });
