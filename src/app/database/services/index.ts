import UserServices from "./userServices";


/**
 * DB configuration init
 */

const User = new UserServices();

const Service = {
    User,
};

export default Service;