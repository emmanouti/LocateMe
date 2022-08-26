import { Request, Response, Router } from "express";
import LocationControllers from "../controllers/locationControllers";
import { middlewares } from "../middlewares";

const { responses, messages, codes } = middlewares;


const router = Router();

    router.get("/", LocationControllers.findAllLocations)
    router.get("/:user_id", LocationControllers.findAllLocationsFromOneUser);
    router.get("/:user_id/:location_id", LocationControllers.findOneLocation);
    router.post("/:user_id/create", LocationControllers.createLocation);
    router.put("/:location_id/update", LocationControllers.updateLocation);
    router.delete("/:location_id/delete", LocationControllers.deleteLocation)

    router.all("*", (req: Request, res: Response) => {
            responses.ok(codes.notFound(), messages.pageNotFound(), res);
        });


export default router;