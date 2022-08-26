import { Request, Response } from "express";
import { middlewares } from "../middlewares";
import Service from "../database/services";
import { User } from "../database/entity/User";

const { responses, messages, codes } = middlewares;

const { locationService } = Service;

class LocationControllers {
    static findAllLocations = async (req: Request, res: Response) => {
        const response = await locationService.findAllLocations()
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
    static findAllLocationsFromOneUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const response = await locationService.findAllLocationsFromOneUser(parseInt(user_id));
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

    static findOneLocation = async (req: Request, res: Response) => {
        const { user_id, location_id } = req.params;

        const response = await locationService.findOneLocation(parseInt(user_id), parseInt(location_id));

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(codes.ok(), messages.ok(), response, res);
    };

    static createLocation = async (req: Request, res: Response) => {
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

        const response = await locationService.createLocation(parseInt(user_id), {latitude, longitude, adresse})

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(codes.ok(), messages.ok(), response, res);
    };

    static updateLocation = async (req: Request, res: Response) => {
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

        const response = await locationService.updateLocation( parseInt(location_id), {
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


    static deleteLocation = async (req: Request, res: Response) => {
        const { location_id } = req.params;

        const response = await locationService.deleteLocation(parseInt(location_id));

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.ok(codes.ok(), messages.ok(), res);
    };
}

export default LocationControllers;