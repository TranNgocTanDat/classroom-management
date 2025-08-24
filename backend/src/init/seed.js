const userService = require("../services/user.service");

//create user instuctor default
async function seedDefaultInstructor() {
    try {
        const phoneDefault = "0911370781";

        //check if user exists
        const users = await userService.getUserByPhone(phoneDefault);
        if (users) {
            console.log("Default instructor already exists.");
            return;
        }
    
        //create default instructor
        const userInstructor = await userService.addUser({
            name: "Default Instructor",
            phone: phoneDefault,
            email: "tranngoctandat12@gmail.com",
            password: "123456",
            role: "instructor",
        });
        console.log("Default instructor created:", userInstructor);
    } catch (error) {
        console.error("Error seeding default instructor:", error);
    }    
}

module.exports = { seedDefaultInstructor };