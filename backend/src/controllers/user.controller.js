const {addUser, getUserByPhone, getAllUsers, addStudent} = require('../services/user.service');

//add user controller
async function createUser(req, res) {
    try {
        const {name, phone, email, password, role} = req.body;

        // Validate input
        if (!name || !phone || !email || !password || !role) {
            return res.status(400).json({error: 'Missing required fields'});
        }

        const result = await addUser({name, phone, email, password, role});
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

//list users controller
async function getUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// get user by phone controller
async function getUserByPhoneController(req, res) {
    try {
        const {phone} = req.params;

        if (!phone) {
            return res.status(400).json({error: 'Phone number is required'});
        }

        const user = await getUserByPhone(phone);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by phone:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// add student controller
async function addStudentController(req, res) {
    try {
        const {name, phone, email} = req.body;

        // Validate input
        if (!name || !phone || !email) {
            return res.status(400).json({error: 'Missing required fields'});
        }

        // Add user
        const result = await addStudent({name, phone, email});
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = { createUser, getUsers, getUserByPhoneController, addStudentController };
