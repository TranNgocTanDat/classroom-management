// config axios for Firebase
const axios = require('axios');
require('dotenv').config();

const firebaseRealtime = axios.create({
    baseURL: process.env.FIREBASE_DB_URL,
    timeout: 5000,
    });

module.exports = { firebaseRealtime };