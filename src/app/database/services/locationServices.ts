import { Location } from "../entity/Location";
import dataSourceInstance from "../data-source";
import {User} from "../entity/User";

class LocationServices {
    findAllLocations = async (): Promise<any | null> => {
        const locationRepository = dataSourceInstance.getRepository(Location)
        const result = await locationRepository.findAndCount({relations: {user: true}});
        if (!result) {
            return "no location found";
        }
        return result;
    }
    findAllLocationsFromOneUser = async (user_id): Promise<any | null> => {
        const locationRepository = dataSourceInstance.getRepository(Location)
        const result = await locationRepository.findAndCount({where: {user: user_id}});
        if (!result) {
            return "no location found";
        }
        return result;
    };

    findOneLocation = async (user_id, location_id): Promise<any | null> => {
        const locationRepository = dataSourceInstance.getRepository(Location)
        const result = await locationRepository.findOne({where: {id: location_id, user: user_id}})
        if (!result) {
            return "no location found";
        }
        return result;
    };
    createLocation = async (user_id, data): Promise<any | null> => {
        const userRepository = dataSourceInstance.getRepository(User);
        const locationRepository = dataSourceInstance.getRepository(Location);

        let user;
        try {
            user = await userRepository.findOneOrFail({where: {id: user_id}});
        } catch (error) {
            return "Corresponding user not found";
        }

        const location = new Location();
        location.latitude = data.latitude
        location.longitude = data.longitude
        location.adresse = data.adresse
        location.user = user
        const result = await locationRepository.save(location);

        if (!result) {
            return;
        }
        return result;
    }
    updateLocation = async (location_id, data): Promise<any | null> => {
        const locationRepository = dataSourceInstance.getRepository(Location)
        const result = await locationRepository.update(location_id, data);

        if (!result) {
            return null;
        }
        return result;
    };

    deleteLocation = async (location_id): Promise<any | null> => {
        const locationRepository = dataSourceInstance.getRepository(Location)
        const result = await locationRepository.delete(location_id);
        if (!result) {
            return null;
        }
        return result;
    };
}

export default LocationServices;