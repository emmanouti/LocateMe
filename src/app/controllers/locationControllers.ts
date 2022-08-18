import { Request, Response } from "express";
import { middlewares } from "../middlewares";
import Service from "../database/services";
import { User } from "../database/entity/User";

const { responses, messages, codes } = middlewares;

const { Location } = Service;

class LocationControllers {
    findAllLocations = async (req, res) => {
        const response = await Location.findAllLocations()
        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            {
                count: response[1],
                data: response[0],
            },
            res
        )
    }
    findAllLocationsFromOneUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const response = await Location.findAllLocationsFromOneUser(parseInt(user_id));
        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            {
                count: response[1],
                data: response[0],
            },
            res
        );
    };

    findOneLocation = async (req: Request, res: Response) => {
        const { user_id, location_id } = req.params;

        const response = await Location.findOneLocation(parseInt(user_id), parseInt(location_id));

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(codes.ok(), messages.ok(), response, res);
    };

    createLocation = async (req: Request, res: Response) => {
        const {user_id} = req.params;

        const {
            latitude,
            longitude,
            adresse,
        }: {
            latitude: number;
            longitude: number;
            adresse: string;
        } = req.body;

        const userId = parseInt(user_id);

        const response = await Location.createLocation({
            latitude,
            longitude,
            adresse,
            userId
        });

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(
            codes.created(),
            messages.created(),
            { latitude, longitude, adresse, userId },
            res
        );
    };

    updateLocation = async (req: Request, res: Response) => {
        const {
            latitude,
            longitude,
            adresse,
            user
        }: {
            latitude: number;
            longitude: number;
            adresse: string;
            user: User
        } = req.body;

        const { location_id } = req.params;

        const response = await Location.updateLocation( parseInt(location_id), {
            latitude,
            longitude,
            adresse,
            user
        });

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            {
                location_id,
                latitude,
                longitude,
                adresse,
                user },
            res
        );
    };


    deleteLocation = async (req: Request, res: Response) => {
        const { location_id } = req.params;

        const response = await Location.deleteLocation(parseInt(location_id));

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.ok(codes.ok(), messages.ok(), res);
    };
}

export default LocationControllers;