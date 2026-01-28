import ENV from "./config/envConfig.js";
import app from "./app.js";

const startServer = () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
