import { Location } from "../entity/Location";

class LocationServices {
    findAllLocations = async (): Promise<any | null> => {
        const result = await Location.findAndCount({relations: {user: true}});
        if (!result) {
            return "no location found";
        }
        return result;
    }
    findAllLocationsFromOneUser = async (user_id): Promise<any | null> => {
        const result = await Location.findAndCount({where: {user: user_id}});
        if (!result) {
            return "no location found";
        }
        return result;
    };

    findOneLocation = async (user_id, location_id): Promise<any | null> => {
        const result = await Location.findOne({where: {id: location_id, user: user_id}})
        if (!result) {
            return "no location found";
        }
        return result;
    };

    createLocation = async (data: object): Promise<any | null> => {
        const result = await Location.insert(data);

        if (!result) {
            return null;
        }
        return result;
    };

    updateLocation = async (location_id, data: object): Promise<any | null> => {
        const result = await Location.update(location_id, data);

        if (!result) {
            return null;
        }
        return result;
    };

    deleteLocation = async (location_id): Promise<any | null> => {
        const result = await Location.delete(location_id);
        if (!result) {
            return null;
        }
        return result;
    };
}

export default LocationServices;