import * as express from "express";
import * as dotenv from "dotenv";

import { route } from "./routes";
import dbConfig from "./database/data-source";

dotenv.config();



const app = express();
app.use(express.json());

const { PORT } = process.env;
dbConfig().initialize().then(()=> route(app));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});