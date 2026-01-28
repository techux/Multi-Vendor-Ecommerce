import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.route.js";
import { appLogger } from "./utils/logger.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appLogger);

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
