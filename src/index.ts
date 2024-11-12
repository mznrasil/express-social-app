import { AppDataSource } from "./data-source";
import express from "express";
import router from "./routes/index.route";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerDocs from "./utils/swagger";
import { config } from "./config/config";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

const PORT = config.APP_PORT || 3000;
app.listen(PORT, () => {
  swaggerDocs(app, PORT);
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorHandler);

(async () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Connected to database");
    })
    .catch((error: unknown) => {
      console.log(error);
    });
  // await runSeeders(AppDataSource);
})();
