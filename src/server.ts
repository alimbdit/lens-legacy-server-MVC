import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
// import { Server } from 'http';

// let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ts node dev ${config.port}`);
    });
  } catch (error) {
    console.log('Database connection failed SERVER', error);
  }
}

main();

// process.on('unhandledRejection', (err) => {
//   console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
