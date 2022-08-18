import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "./routes";
import Helmet from "helmet";
import dbConfig from "./database/data-source";

dotenv.config();

const app = express();
app.use(express.json());
app.use(Helmet());
app.use(cors());

app.use(bodyParser.json());

const { PORT } = process.env;
dbConfig().initialize().then(()=> app.use("/", routes));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});