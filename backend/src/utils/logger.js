import morgan from "morgan";
import fs from "fs";
import path from "path";
import * as rfs from "rotating-file-stream";
import pino from "pino";
import { LOG_ENV } from "../config/envConfig.js";

const LOG_DIR = path.resolve(LOG_ENV.FOLDER);
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const accessLogStream = rfs.createStream(LOG_ENV.FILE, {
  interval: "1d",
  path: LOG_DIR,
  maxFiles: LOG_ENV.MAX_FILES,
});

const appLogger = morgan(LOG_ENV.LEVEL, {
  skip: (_, res) => res.statusCode < 400,
  stream: accessLogStream,
});

// ------------------------------- Pino Logger Setup ------------------------------ //

const logFilePath = path.join(LOG_DIR, LOG_ENV.ERROR_FILE);

const consoleLogger = pino({
  level: "error",
  base: null, // This removes pid and hostname
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        },
        level: "error",
      },
      {
        target: "pino/file",
        options: {
          destination: logFilePath,
          mkdir: true,
        },
        level: "error",
      },
    ],
  },
});

export { appLogger, consoleLogger };
