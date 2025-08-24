const authService = require('../services/auth.service');

// login
async function loginController(req, res) {
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

module.exports = { loginController, validateAccessCodeController };