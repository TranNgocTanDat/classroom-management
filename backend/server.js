require("dotenv").config();
const app = require("./app");
const { seedDefaultInstructor } = require("./src/init/seed");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Seed default instructor
    await seedDefaultInstructor();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
startServer();
