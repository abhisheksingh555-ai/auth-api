import app from './app.js';
import env from './config/env.js';
import connectDB from './config/db.js';

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
};

startServer();