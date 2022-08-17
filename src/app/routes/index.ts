import { Request, Response, Application } from "express";
import UserControllers from "../controllers/userControllers";
import LocationControllers from "../controllers/locationControllers";

import { middlewares } from "../middlewares/index";

const { responses, messages, codes } = middlewares;

const User = new UserControllers();
const Location = new LocationControllers();

class Routes {
    public router = (app: Application): any => {
        app.get("/", (req: Request, res: Response) => {
            responses.ok(codes.ok(), messages.welcomeMessage(), res);
        });

        app.get("/users", User.findUsers);
        app.get("/users/:user_id", User.findOneUser);
        app.post("/create", User.createUser);
        app.put("/update/:user_id", User.updateUser);
        app.delete("/delete/:user_id", User.deleteUser);

        app.get("/locations", Location.findAllLocations)
        app.get("/users/:user_id/locations", Location.findAllLocationsFromOneUser);
        //app.get("/users/:user_id/locations/:location_id", Location.findOneLocation);
        app.post("/users/:user_id/create", Location.createLocation);
        //app.put("/users/:user_id/update/:location_id", Location.updateLocation);
        //app.delete("/users/:user_id/delete/:location_id", Location.deleteLocation)

        app.all("*", (req: Request, res: Response) => {
            responses.ok(codes.notFound(), messages.pageNotFound(), res);
        });
    };
}

export const route = new Routes().router;