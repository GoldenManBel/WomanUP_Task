import { PORT, URL_DB } from './common/config.js';
import { app as server } from './app.js';
import mongoose from 'mongoose';

/**
 * Run the server!
 * Listening on a port and displaying a message in the log.
 * If error then exit process and displaying a message about error in the log.
 * @returns {void} void
 */
const startServer = async () => {
  try {
    await mongoose.connect(URL_DB);
    server.listen(PORT, () =>
      console.info(`App is running on ${PORT}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
