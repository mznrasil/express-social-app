import { AppDataSource } from "./data-source";
import express from "express";
import router from "./routes/index.route";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerDocs from "./utils/swagger";
import { config } from "./config/config";
import logger from "./logger";
import { httpLogger } from "./middlewares/httpLogger";

const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/api/v1", router);

const PORT = config.APP_PORT || 3000;
app.listen(PORT, () => {
  swaggerDocs(app, PORT);
  logger.info(`Server is running on port ${PORT}`);
});

app.use(errorHandler);

(async () => {
  AppDataSource.initialize()
    .then(async () => {
      logger.info("Connected to database");
    })
    .catch((error: unknown) => {
      logger.error("Database initialization error: ", error);
    });
})();
