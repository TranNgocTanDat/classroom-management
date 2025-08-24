const authService = require('../services/auth.service');

// login
async function loginController(req, res) {
    try {
        const { phone, password } = req.body;
        const result = await authService.login(phone, password);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result.message });
        } 
        
    } catch (error) {
        console.error('Error creating access token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// login student
async function loginStudentController(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService.loginStudent(email, password);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result.message });
        } 
        
    } catch (error) {
        console.error('Error creating access token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function validateAccessCodeController(req, res) {
    try {
        const { phone, code } = req.body;
        const result = await authService.validateAccessCode(phone, code);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result.message });
        }
        
    } catch (error) {
        console.error('Error validating access code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// validate access code student
async function validateAccessCodeStudentController(req, res) {
    try {
        const { email, code } = req.body;
        const result = await authService.validateAccessCodeStudent(email, code);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: result.message });
        }
        
    } catch (error) {
        console.error('Error validating access code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { loginController, validateAccessCodeController, loginStudentController, validateAccessCodeStudentController };