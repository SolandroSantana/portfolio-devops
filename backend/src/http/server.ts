import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import routes from "../routes/index";

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
routes(app);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});