import UserServices from "./userServices";
import LocationServices from "./locationServices";

/**
 * DB configuration init
 */

const User = new UserServices();
const Location = new LocationServices();

const Service = {
    userService: User,
    Location
};

export default Service;