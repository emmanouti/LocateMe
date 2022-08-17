import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Location } from "./entity/Location";


const dbConfig = () => new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "admin",
    password: "admin",
    database: "locatemeDB",
    synchronize: true,
    logging: false,
    entities: [User, Location],
    migrations: [],
    subscribers: [],
})


 export default dbConfig;