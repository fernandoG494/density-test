const server = require('./src/server.cjs');
const mongoose = require('mongoose');
require('dotenv').config();

const {
    PORT,
    DB_USER,
    DB_PASSWORD,
    DB_CLUSTER,
    density
} = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${density}`)
    .then(
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    ).catch(err => {
        console.log('DB connection error: ', err);
    });
