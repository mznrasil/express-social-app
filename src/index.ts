import { AppDataSource } from "./data-source";
import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerDocs from "./utils/swagger";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.listen(3000, () => {
  swaggerDocs(app, 3000);
  console.log("Server is running on port 3000");
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to database");
  })
  .catch((error: unknown) => {
    console.log(error);
  });
